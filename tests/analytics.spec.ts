import { expect, test, type Page, type Request } from '@playwright/test';
import { inflateRawSync, unzipSync } from 'node:zlib';

type CollectedEvent = {
  event: string;
  properties: Record<string, unknown>;
};
const endpoint = 'https://api-js.mixpanel.com/**';

function parsePayload(buffer: Buffer): unknown {
  try {
    return JSON.parse(buffer.toString('utf8'));
  } catch {
    try {
      return JSON.parse(unzipSync(buffer).toString('utf8'));
    } catch {
      return JSON.parse(inflateRawSync(buffer).toString('utf8'));
    }
  }
}

function readEvents(request: Request): CollectedEvent[] {
  const url = new URL(request.url());
  const body = request.postData() ?? '';
  const encoded =
    url.searchParams.get('data') ?? new URLSearchParams(body).get('data');
  if (encoded) {
    let payload: unknown;
    try {
      payload = JSON.parse(encoded);
    } catch {
      const normalized = encoded
        .replace(/ /g, '+')
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      payload = parsePayload(Buffer.from(normalized, 'base64'));
    }
    const events = payload as CollectedEvent | CollectedEvent[];
    return Array.isArray(events) ? events : [events];
  }
  const text = body.trim();
  if (!text) return [];
  if (text.startsWith('[')) {
    const payload = JSON.parse(text);
    return Array.isArray(payload) ? payload : [payload];
  }
  return text
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function collect(page: Page) {
  const requests: CollectedEvent[][] = [];
  await page.route(endpoint, async (route) => {
    const events = readEvents(route.request());
    if (events.length) requests.push(events);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ status: 1 }),
    });
  });
  return {
    requests,
    events: () => requests.flat(),
  };
}

async function clickAndStay(page: Page, selector: string) {
  await page.evaluate((target) => {
    const link = document.querySelector<HTMLAnchorElement>(target);
    if (!link) throw new Error(`Missing ${target}`);
    // Run after the analytics click handler, then stop the navigation so the
    // queued event can flush without unloading the page.
    document.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
    link.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
  }, selector);
}

test('production build tracks built-in page views and product views', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/projects/tablow');
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === '$mp_web_page_view')
          .length,
      { timeout: 15_000 },
    )
    .toBe(1);
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === 'product_viewed')
          .length,
      { timeout: 15_000 },
    )
    .toBe(1);

  const pageView = data
    .events()
    .find((event) => event.event === '$mp_web_page_view')!;
  expect(pageView.properties.page_path).toBe('/projects/tablow');
  expect(pageView.properties.page_title).toContain('Tablow');
  expect(pageView.properties).not.toHaveProperty('$current_url');
  expect(pageView.properties).not.toHaveProperty('$referrer');

  const productView = data
    .events()
    .find((event) => event.event === 'product_viewed')!;
  expect(productView.properties.product_slug).toBe('tablow');
});

test('store clicks record product, store and placement', async ({ page }) => {
  const data = await collect(page);
  await page.goto('/projects/tablow');
  await clickAndStay(page, '[data-analytics-store="app_store"]');
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === 'store_clicked').length,
      { timeout: 15_000 },
    )
    .toBe(1);

  const event = data.events().find((item) => item.event === 'store_clicked')!;
  expect(event.properties).toMatchObject({
    product_slug: 'tablow',
    store: 'app_store',
    placement: 'project_link_app_store',
  });
});

test('navigation links record link_clicked without a product', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/');
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === '$mp_web_page_view')
          .length,
      { timeout: 15_000 },
    )
    .toBe(1);
  await clickAndStay(page, '[data-analytics-placement="nav_projects"]');
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === 'link_clicked').length,
      { timeout: 15_000 },
    )
    .toBe(1);

  const event = data.events().find((item) => item.event === 'link_clicked')!;
  expect(event.properties.placement).toBe('nav_projects');
  expect(event.properties).not.toHaveProperty('product_slug');
});

test('UTM parameters are captured while full URLs are blocked', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto(
    '/?utm_source=x&utm_medium=social&utm_campaign=launch&utm_content=card&secret=never-send',
  );
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.event === '$mp_web_page_view')
          .length,
      { timeout: 15_000 },
    )
    .toBe(1);

  const pageView = data
    .events()
    .find((event) => event.event === '$mp_web_page_view')!;
  expect(pageView.properties).toMatchObject({
    utm_source: 'x',
    utm_medium: 'social',
    utm_campaign: 'launch',
    utm_content: 'card',
  });
  expect(pageView.properties).not.toHaveProperty('$current_url');
  expect(pageView.properties).not.toHaveProperty('$referrer');
  expect(pageView.properties).not.toHaveProperty('current_url_search');
  expect(JSON.stringify(data.requests)).not.toContain('never-send');
});
