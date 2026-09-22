import { expect, test } from '@playwright/test';

const sites = [
  {
    locale: 'zh',
    home: '/zh/',
    intro:
      '我是 Will。我记录人与自我、数字生活里的真实问题，也把少数想法做成软件。',
    projects: ['Yipa', '泡泡留言板', '橘小记'],
  },
  {
    locale: 'en',
    home: '/',
    intro:
      'I’m Will. I write about questions in how we understand ourselves and live with technology, and turn a few ideas into software.',
    projects: ['Yipa', 'Huddle', 'Tablow'],
  },
] as const;

for (const site of sites) {
  test(`${site.locale} homepage introduces Will and all three works on mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(site.home);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      site.intro,
    );

    const cards = page.locator('.overview-grid > a');
    await expect(cards).toHaveCount(3);
    for (const [index, name] of site.projects.entries()) {
      const card = cards.nth(index);
      await expect(card.getByRole('heading', { name })).toBeVisible();
      const box = await card.getByRole('heading', { name }).boundingBox();
      expect((box?.y ?? 812) + (box?.height ?? 0)).toBeLessThan(812);
      expect(await card.getAttribute('href')).toContain('/projects/');
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test('language navigation keeps the homepage and project entry reachable', async ({
  page,
}) => {
  await page.goto('/zh/');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/');
  await page.locator('.overview-grid > a').filter({ hasText: 'Yipa' }).click();
  await expect(page).toHaveURL('/projects/yipa');
  await expect(
    page.locator('article header a[href="https://yipa.willopc.com"]'),
  ).toBeVisible();
});

test('keyboard navigation reaches the first project from the skip link', async ({
  page,
}) => {
  await page.goto('/zh/');
  const nextLink = test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(nextLink);
  await expect(page.getByRole('link', { name: '跳至正文' })).toBeFocused();
  const firstProject = page.locator('.overview-grid > a').first();
  let reachedProject = false;
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press(nextLink);
    if (
      await firstProject.evaluate(
        (element) => element === document.activeElement,
      )
    ) {
      reachedProject = true;
      break;
    }
  }
  expect(reachedProject).toBe(true);
});

test('core pages remain readable across supported widths', async ({ page }) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/zh/', '/', '/zh/projects/yipa']) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} overflows at ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 768, height: 900 });
  for (const route of [
    '/zh/notes',
    '/zh/projects',
    '/zh/about',
    '/zh/notes/remember-not-improve',
    '/notes',
    '/projects',
    '/about',
  ]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${route} overflows at 768px`,
    ).toBe(true);
  }
});
