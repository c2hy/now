export type Locale = 'en' | 'zh';
export const locales: Locale[] = ['en', 'zh'];
export const writingCategorySlugs = [
  'life-observation',
  'technical-sharing',
  'product-building',
] as const;
export type WritingCategory = (typeof writingCategorySlugs)[number];
export const path = (locale: Locale, rest = '') =>
  `${locale === 'zh' ? '/zh/' : '/'}${rest}`;
export type ContentKind = 'writing' | 'projects';
export type Section = ContentKind | 'about';
const segment = (section: Section) =>
  section === 'writing' ? 'notes' : section;
export const sectionPath = (locale: Locale, section: Section) =>
  path(locale, segment(section));
export const contentPath = (locale: Locale, kind: ContentKind, slug: string) =>
  path(locale, `${segment(kind)}/${slug}`);
export const ui = {
  en: {
    writing: 'Notes',
    projects: 'Projects',
    about: 'About',
    language: '中文',
    langLabel: '切换到中文',
    home: 'Home',
    skip: 'Skip to content',
    back: 'Back to',
    allWriting: 'Browse all notes',
    allProjects: 'Explore all projects',
    read: 'Read the story',
    live: 'Live',
    noting: 'Things I’ve noted lately',
    making: 'Things I’ve made',
    aboutLink: 'A little more about me',
    elsewhere: 'Elsewhere',
    empty: 'Nothing published here yet.',
    allCategories: 'All notes',
    categoryFilterLabel: 'Filter notes by audience',
    noCategoryResults: 'No notes in this category yet.',
    notesIntro:
      'Notes on self, technology, everyday life, and how software quietly enters all three.',
    projectsIntro:
      'Three launched products: Yipa for self-observation, Huddle for smaller social spaces, and Tablow for remembering when something last happened.',
  },
  zh: {
    writing: '记录',
    projects: '作品',
    about: '关于',
    language: 'EN',
    langLabel: 'Switch to English',
    home: '首页',
    skip: '跳至正文',
    back: '返回',
    allWriting: '查看全部记录',
    allProjects: '看看全部作品',
    read: '了解背后的故事',
    live: '已上线',
    noting: '最近记下的事',
    making: '我做的一些东西',
    aboutLink: '再多了解我一点',
    elsewhere: '在别处',
    empty: '这里暂时没有已发布的内容。',
    allCategories: '全部记录',
    categoryFilterLabel: '按内容方向筛选记录',
    noCategoryResults: '这个分类下暂时没有记录。',
    notesIntro: '写人与自我、数字生活，以及软件如何悄悄进入真实生活。',
    projectsIntro:
      '三个已经上线的产品：用于自我观察的 Yipa、属于小圈子的泡泡留言板，以及记录“上一次”的橘小记。',
  },
};
export const writingCategoryLabels: Record<
  Locale,
  Record<WritingCategory, string>
> = {
  en: {
    'life-observation': 'Life & Observation',
    'technical-sharing': 'Technical Notes',
    'product-building': 'Products & Building',
  },
  zh: {
    'life-observation': '生活观察',
    'technical-sharing': '技术分享',
    'product-building': '产品与构建',
  },
};
export const date = (value: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);
