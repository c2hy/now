import { expect, test, type Page } from '@playwright/test';

type CollectedEvent = {
  schema_version: number;
  id: string;
  name: string;
  session_id: string;
  anonymous_id: string;
  attribution_id?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  referrer_host?: string;
  path: string;
  product?: string;
  destination?: string;
  properties: Record<string, string>;
};
type Envelope = { write_key: string; events: CollectedEvent[] };
const endpoint = 'https://collector.invalid/v1/events';
const uuidV7 =
  /^[\da-f]{8}-[\da-f]{4}-7[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/;

async function collect(page: Page, statuses: number[] = []) {
  const requests: Envelope[] = [];
  await page.route(endpoint, async (route) => {
    const body = route.request().postDataJSON() as Envelope;
    requests.push(body);
    const status = statuses.shift() ?? 202;
    await route.fulfill({
      status,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(
        status === 202
          ? {
              accepted: body.events.length,
              inserted: body.events.length,
              request_id: 'req_test',
            }
          : { error: { code: 'TEST_FAILURE' } },
      ),
    });
  });
  return {
    requests,
    events: () => requests.flatMap((request) => request.events),
  };
}

test('production payloads preserve campaign and identity through navigation to a store', async ({
  page,
}) => {
  const data = await collect(page);
  await page.route('https://apps.apple.com/**', (route) =>
    route.fulfill({ body: 'store' }),
  );
  await page.goto(
    '/zh/projects?utm_source=Twitter&utm_medium=Social&utm_campaign=LaunchA&utm_content=CardB&secret=never-send#private',
  );
  await expect
    .poll(
      () => data.events().filter((event) => event.name === 'page_view').length,
    )
    .toBe(1);
  await page.getByRole('link', { name: '橘小记', exact: true }).click();
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.name === 'product_view').length,
    )
    .toBe(1);
  await page.locator('[data-drip-destination="app_store"]').click();
  await expect
    .poll(
      () =>
        data.events().filter((event) => event.name === 'store_click').length,
    )
    .toBeGreaterThan(0);
  const events = data.events();
  const initial = events[0];
  const store = events.find((event) => event.name === 'store_click')!;
  for (const event of events) {
    expect(event.schema_version).toBe(1);
    for (const id of [
      event.id,
      event.session_id,
      event.anonymous_id,
      event.attribution_id,
    ])
      expect(id).toMatch(uuidV7);
    expect(event.session_id).toBe(initial.session_id);
    expect(event.anonymous_id).toBe(initial.anonymous_id);
    expect(event.attribution_id).toBe(initial.attribution_id);
    expect(event.source).toBe('x');
    expect(event.medium).toBe('social');
    expect(event.campaign).toBe('LaunchA');
    expect(event.content).toBe('CardB');
    expect(event.path).not.toMatch(/[?#]/);
    for (const field of ['platform', 'runtime_environment', 'release_channel'])
      expect(event).not.toHaveProperty(field);
  }
  expect(store).toMatchObject({
    product: 'tablow',
    destination: 'app_store',
    path: '/zh/projects/tablow',
    properties: { placement: 'project_link_app-store' },
  });
  expect(JSON.stringify(data.requests)).not.toContain('never-send');
  expect(
    data.requests.every((request) => request.write_key === 'pk_browser_test'),
  ).toBe(true);
});

test('external referrer falls back to x and is inherited on internal pages', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/zh/', { referer: 'https://t.co/private?token=never-send' });
  await expect.poll(() => data.events().length).toBeGreaterThan(0);
  await page.locator('[data-drip-placement="nav_projects"]').click();
  await expect
    .poll(
      () => data.events().filter((event) => event.name === 'page_view').length,
    )
    .toBe(2);
  for (const event of data.events())
    expect(event).toMatchObject({
      source: 'x',
      medium: 'referral',
      referrer_host: 't.co',
    });
  expect(JSON.stringify(data.requests)).not.toContain('never-send');
});

test('campaign-only UTM is an acquisition signal and overrides referrer inference', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/?utm_campaign=CaseSensitive', {
    referer: 'https://external.example/private',
  });
  await expect.poll(() => data.events().length).toBeGreaterThan(0);
  expect(data.events()[0]).toMatchObject({
    campaign: 'CaseSensitive',
    referrer_host: 'external.example',
  });
  expect(data.events()[0].attribution_id).toMatch(uuidV7);
  expect(data.events()[0].source).toBeUndefined();
  expect(data.events()[0].medium).toBeUndefined();
});

test('30 minutes of inactivity rotates session and attribution while retaining the visitor', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/?utm_source=x');
  await expect.poll(() => data.events().length).toBeGreaterThan(0);
  const initial = data.events()[0];
  await page.evaluate(() => {
    const saved = JSON.parse(sessionStorage.getItem('drip_session_v2')!);
    saved.last_activity = Date.now() - 31 * 60 * 1000;
    sessionStorage.setItem('drip_session_v2', JSON.stringify(saved));
  });
  await page.goto('/about');
  await expect
    .poll(
      () => data.events().filter((event) => event.name === 'page_view').length,
    )
    .toBe(2);
  const next = data.events().filter((event) => event.name === 'page_view')[1];
  expect(next.session_id).not.toBe(initial.session_id);
  expect(next.anonymous_id).toBe(initial.anonymous_id);
  expect(next.attribution_id).toBeUndefined();
  expect(next.source).toBeUndefined();
});

test('a new campaign replaces the previous acquisition within the same session', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/?utm_source=x&utm_campaign=First');
  await expect.poll(() => data.events().length).toBeGreaterThan(0);
  const initial = data.events()[0];
  await page.goto('/about?utm_source=Newsletter&utm_campaign=Second');
  await expect.poll(() => data.events().length).toBe(2);
  expect(data.events()[1]).toMatchObject({
    session_id: initial.session_id,
    source: 'newsletter',
    campaign: 'Second',
  });
  expect(data.events()[1].attribution_id).not.toBe(initial.attribution_id);
});

test('network and transient failures retry the original event IDs', async ({
  page,
}) => {
  const data = await collect(page, [503, 429, 202]);
  await page.goto('/projects/tablow');
  await expect.poll(() => data.requests.length, { timeout: 10_000 }).toBe(3);
  expect(data.requests[0].events.map((event) => event.name)).toEqual([
    'page_view',
    'product_view',
  ]);
  expect(data.requests[1]).toEqual(data.requests[0]);
  expect(data.requests[2]).toEqual(data.requests[0]);
});

test('authentication failure stops retrying and reports no sensitive data', async ({
  page,
}) => {
  const messages: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'warning') messages.push(message.text());
  });
  const data = await collect(page, [401]);
  await page.goto('/');
  await expect
    .poll(() => messages.filter((text) => text.includes('[Drip]')).length)
    .toBe(1);
  // A hide flush should find the rejected batch removed from the queue.
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pagehide')),
  );
  expect(data.requests).toHaveLength(1);
  expect(messages.join(' ')).toContain('401');
  expect(messages.join(' ')).not.toContain('pk_');
});

test('storage restrictions preserve collection and click interaction', async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const name of ['localStorage', 'sessionStorage'])
      Object.defineProperty(window, name, {
        get() {
          throw new DOMException('Denied', 'SecurityError');
        },
      });
  });
  const data = await collect(page);
  await page.goto('/about');
  await expect.poll(() => data.events().length).toBe(1);
  await page
    .locator('[data-drip-placement="about_social_x"]')
    .dispatchEvent('auxclick', { button: 1 });
  await expect.poll(() => data.events().length).toBe(2);
  expect(data.events()[1].properties.placement).toBe('about_social_x');
  expect(data.events()[1].anonymous_id).toBe(data.events()[0].anonymous_id);
});

test('unapproved preview origins create no identity and make no collection requests', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('http://localhost:14322/');
  expect(
    await page.evaluate(() => ({
      local: Object.keys(localStorage).filter((key) => key.startsWith('drip_')),
      session: Object.keys(sessionStorage).filter((key) =>
        key.startsWith('drip_'),
      ),
    })),
  ).toEqual({ local: [], session: [] });
  await page.locator('[data-drip-placement="nav_projects"]').click();
  expect(data.requests).toHaveLength(0);
});

test('pagehide uses Beacon with the original IDs when a fetch is still in flight', async ({
  page,
}) => {
  const requests: Envelope[] = [];
  await page.route(endpoint, async (route) => {
    requests.push(route.request().postDataJSON());
    if (requests.length === 1)
      await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({
        accepted: requests.at(-1)!.events.length,
        inserted: 1,
      }),
    });
  });
  await page.goto('/');
  await expect.poll(() => requests.length).toBe(1);
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pagehide')),
  );
  await expect.poll(() => requests.length).toBe(2);
  expect(requests[1]).toEqual(requests[0]);
});

test('restoring a cached document records another view with the same visitor', async ({
  page,
}) => {
  const data = await collect(page);
  await page.goto('/projects/tablow');
  await expect.poll(() => data.events().length).toBe(2);
  const first = data.events()[0];
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent('pageshow', { persisted: true }),
    ),
  );
  await expect.poll(() => data.events().length).toBe(4);
  expect(data.events().map((event) => event.name)).toEqual([
    'page_view',
    'product_view',
    'page_view',
    'product_view',
  ]);
  expect(data.events()[2].id).not.toBe(first.id);
  expect(data.events()[2].anonymous_id).toBe(first.anonymous_id);
});
