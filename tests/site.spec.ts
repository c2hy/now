import { expect, test } from '@playwright/test';

const sites = [
  {
    locale: 'zh',
    home: '/zh/',
    introTitle: '我是 Will。',
    introDescription: '我做了几个用来记录东西的 App，也写日常里留意到的事。',
    projects: [
      { name: 'Yipa', slug: 'yipa' },
      { name: '泡泡留言板', slug: 'bubbles' },
      { name: '橘小记', slug: 'tablow' },
    ],
  },
  {
    locale: 'en',
    home: '/',
    introTitle: 'I’m Will.',
    introDescription:
      'I’ve made a few apps for recording things. I also write about what I notice in everyday life.',
    projects: [
      { name: 'Yipa', slug: 'yipa' },
      { name: 'Huddle', slug: 'bubbles' },
      { name: 'Tablow', slug: 'tablow' },
    ],
  },
] as const;

for (const site of sites) {
  test(`${site.locale} homepage introduces Will and all three works on mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(site.home);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      site.introTitle,
    );
    await expect(page.locator('.home-description')).toHaveText(
      site.introDescription,
    );

    const sections = page.locator('#main > section[aria-labelledby]');
    await expect(sections).toHaveCount(4);
    await expect(
      page.locator('section[aria-labelledby="home-projects-title"]'),
    ).toHaveCount(1);
    await expect(page.locator('.overview-grid')).toHaveCount(0);

    const sectionOrder = await sections.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('aria-labelledby')),
    );
    expect(sectionOrder).toEqual([
      'home-title',
      'home-projects-title',
      'home-notes-title',
      'home-about-title',
    ]);

    const projects = page.locator(
      'section[aria-labelledby="home-projects-title"] > article',
    );
    await expect(projects).toHaveCount(3);
    for (const [index, project] of site.projects.entries()) {
      const item = projects.nth(index);
      const headingLink = item
        .getByRole('heading', { name: project.name })
        .getByRole('link');
      await expect(headingLink).toBeVisible();
      await expect(headingLink).toHaveAttribute(
        'href',
        new RegExp(`/projects/${project.slug}$`),
      );
      await expect(
        item.locator('a[data-drip-placement="home_project_overview"]'),
      ).toHaveCount(3);
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
  await page.getByRole('heading', { name: 'Yipa' }).getByRole('link').click();
  await expect(page).toHaveURL('/projects/yipa');
  await expect(
    page.locator('article header a[href="https://yipa.willopc.com"]'),
  ).toBeVisible();

  await page.goto('/zh/projects');
  await expect(
    page.locator('article a[data-drip-placement="project_item"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('article a[data-drip-placement="home_project_overview"]'),
  ).toHaveCount(0);
});

test('keyboard navigation reaches the first project from the skip link', async ({
  page,
}) => {
  await page.goto('/zh/');
  const nextLink = test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(nextLink);
  await expect(page.getByRole('link', { name: '跳至正文' })).toBeFocused();
  const firstProject = page
    .locator('section[aria-labelledby="home-projects-title"] article h3 a')
    .first();
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
