import { expect, test } from '@playwright/test';

const sites = [
  { locale: 'zh', home: '/zh/' },
  { locale: 'en', home: '/' },
] as const;

for (const site of sites) {
  test(`${site.locale} homepage presents a short untitled welcome`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(site.home);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
    expect(
      await page.locator('.home-essay .prose > p').count(),
    ).toBeGreaterThanOrEqual(2);
    await expect(page.locator('#main img, #main aside, footer')).toHaveCount(0);
    await expect(page.locator('.home-essay .prose p').first()).toHaveCSS(
      'font-weight',
      '400',
    );
    await expect(page.locator('html')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );
    const contact = page.locator('.home-contact a');
    await contact.scrollIntoViewIfNeeded();
    await contact.click();
    await expect(page).toHaveURL(
      `${site.locale === 'zh' ? '/zh/about' : '/about'}#contact`,
    );
    await expect(
      page.getByRole('link', { name: 'hello@willopc.com' }),
    ).toBeVisible();
  });
}

test('night theme follows the system until a manual choice is stored', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.getByRole('button', { name: 'Switch color theme' });
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(html).toHaveCSS('background-color', 'rgb(20, 20, 23)');
  await expect(page.locator('.home-contact a')).toHaveCSS(
    'color',
    'rgb(226, 104, 92)',
  );
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect(html).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.home-contact a')).toHaveCSS(
    'color',
    'rgb(192, 57, 43)',
  );
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(html).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('site header stays on top while scrolling behind frosted glass', async ({
  page,
}) => {
  await page.goto('/zh/notes/why-i-cant-read-your-yipa-notes');
  const header = page.locator('.site-header');
  await expect(header).toHaveCSS('position', 'sticky');
  await expect(header).toHaveCSS(
    'background-color',
    /rgba\(255, 255, 255, 0\.72\)/,
  );
  const backdrop = await header.evaluate((element) => {
    const style = getComputedStyle(element);
    return (
      style.getPropertyValue('backdrop-filter') ||
      style.getPropertyValue('-webkit-backdrop-filter')
    );
  });
  expect(backdrop).toContain('blur');
  await page.evaluate(() => window.scrollTo(0, 800));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(400);
  await expect
    .poll(() =>
      header.evaluate((element) =>
        Math.round(element.getBoundingClientRect().top),
      ),
    )
    .toBe(0);
});

test('typography pairs serif headings with reading-tuned body text', async ({
  page,
}) => {
  await page.goto('/zh/notes/why-i-cant-read-your-yipa-notes');
  await expect(page.locator('article h1')).toHaveCSS(
    'font-family',
    /Newsreader Variable/,
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.fonts.check('500 1em "Newsreader Variable"', 'Notes'),
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.fonts.check('500 1em "Noto Serif SC Variable"', '为什么'),
      ),
    )
    .toBe(true);
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'line-height',
    /^35\.(1|09)/,
  );
  await page.goto('/notes/why-i-cant-read-your-yipa-notes');
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'line-height',
    /^33\.(3|29)/,
  );
  await page.goto('/zh/notes');
  await expect(page.locator('.entry-date').first()).toHaveCSS(
    'font-variant-numeric',
    'tabular-nums',
  );
});

test('language navigation preserves context and all projects remain reachable', async ({
  page,
}) => {
  await page.goto('/zh/');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/');
  await page
    .locator('[data-analytics-placement="nav_projects"]')
    .click();
  await expect(page).toHaveURL('/projects');
  await page.getByRole('link', { name: 'Tablow', exact: true }).click();
  await expect(page).toHaveURL('/projects/tablow');
  await expect(
    page.locator('article header a[href="https://tablow.willopc.com"]'),
  ).toBeVisible();
  await page.getByRole('link', { name: '切换到中文' }).click();
  await expect(page).toHaveURL('/zh/projects/tablow');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('橘小记');
  for (const [route, names] of [
    ['/projects', ['Yipa', 'Huddle', 'Tablow']],
    ['/zh/projects', ['Yipa', '泡泡留言板', '橘小记']],
  ] as const) {
    await page.goto(route);
    await expect(page.locator('.gallery-project')).toHaveCount(3);
    for (const name of names) {
      const card = page.getByRole('link', { name, exact: true });
      await card.scrollIntoViewIfNeeded();
      await expect(card.getByRole('img')).toBeVisible();
      await expect
        .poll(() =>
          card
            .getByRole('img')
            .evaluate((image: HTMLImageElement) => image.naturalWidth),
        )
        .toBeGreaterThan(0);
    }
  }
  await page
    .getByRole('link', { name: 'Yipa', exact: true })
    .getByRole('img')
    .click();
  await expect(page).toHaveURL('/zh/projects/yipa');
  await expect(
    page.locator('article header a[href="https://yipa.willopc.com"]'),
  ).toBeVisible();
});

test('keyboard navigation reaches the contact link from the skip link', async ({
  page,
}) => {
  await page.goto('/zh/');
  const nextLink = test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(nextLink);
  await expect(page.getByRole('link', { name: '跳至正文' })).toBeFocused();
  const contact = page.locator('.home-contact a');
  let reachedContact = false;
  for (let step = 0; step < 16; step += 1) {
    await page.keyboard.press(nextLink);
    if (
      await contact.evaluate((element) => element === document.activeElement)
    ) {
      reachedContact = true;
      break;
    }
  }
  expect(reachedContact).toBe(true);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/zh/about#contact');
});

test('top navigation opens writing and the article language switch preserves the reader', async ({
  page,
}) => {
  await page.goto('/zh/');
  await page.locator('[data-analytics-placement="nav_writing"]').click();
  await expect(page).toHaveURL('/zh/notes');
  await expect(page.locator('[data-writing-item]')).toHaveCount(6);
  await page
    .locator(
      '[data-analytics-placement="note_item"][href="/zh/notes/schools-and-learning-for-ourselves"]',
    )
    .click();
  await expect(page).toHaveURL('/zh/notes/schools-and-learning-for-ourselves');
  await expect(page.locator('article .prose p').first()).toBeVisible();
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'font-weight',
    '400',
  );
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/notes/schools-and-learning-for-ourselves');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('article time').first()).toBeVisible();
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL('/about');
  await expect(
    page.getByRole('link', { name: 'hello@willopc.com' }),
  ).toHaveAttribute('href', 'mailto:hello@willopc.com');
});

test('all page types fit supported widths and retain readable content', async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/zh/',
      '/',
      '/zh/about',
      '/about',
      '/zh/projects',
      '/projects',
      '/zh/notes',
      '/notes',
      '/zh/projects/yipa',
      '/projects/bubbles',
      '/zh/projects/tablow',
      '/zh/notes/why-i-cant-read-your-yipa-notes',
      '/notes/why-i-cant-read-your-yipa-notes',
      '/zh/notes/schools-and-learning-for-ourselves',
      '/notes/schools-and-learning-for-ourselves',
      '/zh/404',
      '/404',
    ]) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(
        route === '/' || route === '/zh/' ? 0 : 1,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} overflows at ${width}px`,
      ).toBe(true);
      const clippedText = await page
        .locator('#main h1, #main h2, #main h3, #main p')
        .evaluateAll(
          (elements) =>
            elements.filter((element) => {
              const box = element.getBoundingClientRect();
              return (
                box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
              );
            }).length,
        );
      expect(clippedText, `${route} clips text at ${width}px`).toBe(0);
    }
  }
});

test('development never initializes analytics', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('mixpanel.com')) requests.push(request.url());
  });
  await page.goto('/zh/projects/tablow?utm_source=development');
  await expect(page.locator('body')).not.toHaveAttribute(
    'data-analytics-token',
  );
  expect(
    await page.evaluate(() => ({
      local: Object.keys(localStorage).filter((key) => key.startsWith('mp_')),
      session: Object.keys(sessionStorage).filter((key) =>
        key.startsWith('mp_'),
      ),
    })),
  ).toEqual({ local: [], session: [] });
  expect(requests).toHaveLength(0);
});
