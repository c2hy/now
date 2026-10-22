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
    homeTitle: 'Answers change. The questions stay.',
    siteIntro:
      'Will’s observations, experiments, and changes of mind. An independent developer in Shanghai, exploring technology and everyday life.',
    aboutIntro:
      'Will is an independent developer in Shanghai. After years as an engineer, he now builds Yipa, Huddle, and Tablow on his own, and writes down what the attempts teach him.',
    writing: 'Writing',
    projects: 'Projects',
    about: 'About',
    language: '中',
    langLabel: '切换到中文',
    themeLabel: 'Switch color theme',
    skip: 'Skip to content',
    empty: 'Nothing published here yet.',
    notesIntro:
      'Everyday observations, technical decisions, and things I’ve tried. Some are worked through; others are questions I’m still turning over.',
    projectsIntro:
      'A few ideas I’ve put into practice: remembering the last time, sharing with familiar people, and taking another look at our experiences.',
  },
  zh: {
    homeTitle: '答案会变，问题留着',
    siteIntro:
      'Will 的个人网站。在上海做独立开发，喜欢多问一句为什么，也会自己动手试试。这里有作品，有日常，还有做过之后才明白的事。',
    aboutIntro:
      '关于 Will：在上海做独立开发。做过很多年工程师，现在一个人做 Yipa、泡泡留言板和橘小记，也把试过之后才明白的事写在这里。',
    writing: '文章',
    projects: '作品',
    about: '关于',
    language: 'EN',
    langLabel: 'Switch to English',
    themeLabel: '切换深浅色主题',
    skip: '跳至正文',
    empty: '这里暂时没有已发布的内容。',
    notesIntro:
      '这里写生活里的观察，也聊技术和做产品的事。有些问题想明白了，有些还在琢磨，都先记下来，过段时间再回头看看。',
    projectsIntro:
      '这是我做的几个产品。起点都很日常：想记住上一次，想和熟悉的人分享生活，也想慢慢看清自己。',
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
    'product-building': '做产品',
  },
};
export const date = (value: Date, locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);
