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
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('h1.site-brand')).toBeVisible();
    await expect
      .poll(() => page.locator('.home-lead p').count())
      .toBeGreaterThanOrEqual(2);
    await expect(page.locator('#main img, #main aside, footer')).toHaveCount(0);
    await expect(page.locator('.home-lead p').first()).toHaveCSS(
      'font-weight',
      '300',
    );
    await expect(page.locator('html')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );
    const contact = page.locator('.home-contact h2 a');
    await expect(contact).toBeVisible();
    await expect(contact).toHaveAttribute('href', 'mailto:hello@willopc.com');
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
  await expect(page.locator('.home-contact h2 a')).toHaveCSS(
    'color',
    'rgb(226, 104, 92)',
  );
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect(html).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.home-contact h2 a')).toHaveCSS(
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

test('typography keeps one 3-step scale; serif only on h1 and wordmark', async ({
  page,
}) => {
  await page.goto('/zh/notes/why-i-cant-read-your-yipa-notes');
  await expect(page.locator('article h1')).toHaveCSS('font-size', '32px');
  await expect(page.locator('article h1')).toHaveCSS('font-family', /Georgia/);
  await expect(page.locator('.site-brand')).toHaveCSS('font-family', /Georgia/);
  await expect(page.locator('.site-brand')).toHaveCSS('font-size', '18px');
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'font-weight',
    '300',
  );
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'line-height',
    '34px',
  );
  await page.goto('/notes/why-i-cant-read-your-yipa-notes');
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'line-height',
    '28px',
  );
  await page.goto('/zh/notes');
  await expect(page.locator('.entry-date').first()).toHaveCSS(
    'font-variant-numeric',
    'tabular-nums',
  );
  // 文章列表单列，与详情页同一阅读测度。
  await expect(page.locator('.entry-list')).toHaveCSS(
    'grid-template-columns',
    /^\d+(\.\d+)?px$/,
  );
});

test('language navigation preserves context and all projects remain reachable', async ({
  page,
}) => {
  await page.goto('/zh/');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/');
  await page.locator('[data-analytics-placement="nav_projects"]').click();
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
  const skip = page.getByRole('link', { name: '跳至正文' });
  const contact = page.locator('.home-contact h2 a');
  if (test.info().project.name === 'webkit') {
    // Playwright 的 WebKit 构建沿用 Safari 默认键盘策略：Tab 只在表单控件
    // 之间循环，链接不进入 Tab 序列，Alt+Tab 在该构建里同样不生效。
    // Safari 真机开启「按 Tab 高亮网页项目」或使用 Option+Tab 时链接可用。
    // 这里改为验证跳转链接是首个可聚焦项、可聚焦且焦点态可见，
    // 以及联系方式链接同样可聚焦。
    const firstFocusable = await page.evaluate(
      () => document.querySelector('a[href], button')?.className ?? '',
    );
    expect(firstFocusable).toBe('skip');
    await skip.focus();
    await expect(skip).toBeFocused();
    await expect(skip).toHaveCSS('top', '16px');
    await contact.focus();
    await expect(contact).toBeFocused();
  } else {
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    let reachedContact = false;
    for (let step = 0; step < 16; step += 1) {
      await page.keyboard.press('Tab');
      if (
        await contact.evaluate((element) => element === document.activeElement)
      ) {
        reachedContact = true;
        break;
      }
    }
    expect(reachedContact).toBe(true);
  }
  await expect(contact).toHaveAttribute('href', 'mailto:hello@willopc.com');
});

test('top navigation opens writing and the article language switch preserves the reader', async ({
  page,
}) => {
  await page.goto('/zh/');
  await page.locator('[data-analytics-placement="nav_writing"]').click();
  await expect(page).toHaveURL('/zh/notes');
  await expect(page.locator('[data-writing-item]')).toHaveCount(7);
  await page
    .locator(
      '[data-analytics-placement="note_item"][href="/zh/notes/schools-and-learning-for-ourselves"]',
    )
    .click();
  await expect(page).toHaveURL('/zh/notes/schools-and-learning-for-ourselves');
  await expect(page.locator('article .prose p').first()).toBeVisible();
  await expect(page.locator('article .prose p').first()).toHaveCSS(
    'font-weight',
    '300',
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
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
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

test('related writing, author and product links preserve the reading language', async ({
  page,
}) => {
  for (const { prefix, privacyTitle, tablow } of [
    {
      prefix: '',
      privacyTitle: 'Why Even I Can’t Read What You Write in Yipa',
      tablow: 'Tablow',
    },
    {
      prefix: '/zh',
      privacyTitle: '为什么连我自己也看不到你在 Yipa 里写了什么',
      tablow: '橘小记',
    },
  ]) {
    await page.goto(`${prefix}/notes/why-i-cant-read-your-yipa-notes`);
    await page
      .locator('main .prose')
      .getByRole('link', { name: 'Yipa', exact: true })
      .click();
    await expect(page).toHaveURL(`${prefix}/projects/yipa`);
    await page
      .locator('main .prose')
      .getByRole('link', { name: privacyTitle, exact: true })
      .click();
    await expect(page).toHaveURL(
      `${prefix}/notes/why-i-cant-read-your-yipa-notes`,
    );
    await page.locator('a[rel="author"]').click();
    await expect(page).toHaveURL(`${prefix}/about`);
    // 关于页已改为独立的 .about-body 版式（不再复用阅读页 .prose），
    // 产品内链仍在正文段落里，因此这里按当前容器定位。
    await page
      .locator('main .about-body')
      .getByRole('link', { name: tablow, exact: true })
      .click();
    await expect(page).toHaveURL(`${prefix}/projects/tablow`);
    await page.goto(`${prefix}/notes`);
    await expect(
      page.locator('[data-writing-item] .entry-description'),
    ).toHaveCount(7);
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
