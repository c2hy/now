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
      'Will.OPC (willopc) is independent developer Will’s site. He builds Yipa, Huddle, and Tablow in Shanghai, and writes down what he hasn’t figured out.',
    writing: 'Writing',
    projects: 'Projects',
    about: 'About',
    language: '中',
    langLabel: '切换到中文',
    themeLabel: 'Switch color theme',
    skip: 'Skip to content',
    empty: 'Nothing published here yet.',
    notesIntro:
      'Observations from daily life, technical notes, and things I learn while building products. Some are worked through; others are still open questions.',
    projectsIntro:
      'A few products I’ve built: remembering the last time, sharing with people you know, and keeping a private record.',
    indexLabel: 'Site index',
    now: 'Now',
    nowSummary: 'One person, plus AI, carrying products from end to end: ',
  },
  zh: {
    homeTitle: '答案会变，问题留着',
    siteIntro:
      'Will 的个人网站。在上海做独立开发，喜欢多问一句为什么，也会自己动手试试。这里有作品，有日常，还有做过之后才明白的事。',
    aboutIntro:
      'Will.OPC（willopc）是独立开发者 Will 的网站。他在上海一个人做 Yipa、泡泡留言板和橘小记，也写下试过之后才明白的事。',
    writing: '文章',
    projects: '作品',
    about: '关于',
    language: 'EN',
    langLabel: 'Switch to English',
    themeLabel: '切换深浅色主题',
    skip: '跳至正文',
    empty: '这里暂时没有已发布的内容。',
    notesIntro:
      '生活里的观察，技术上的记录，做产品时想明白或没想明白的事。都先记下来，过段时间再回头看看。',
    projectsIntro:
      '这是我做的几个产品。起点都很日常：想记住上一次，想和熟悉的人分享生活，也想慢慢看清自己。',
    indexLabel: '站点索引',
    now: '现在',
    nowSummary: '一个人，加上 AI，把产品从头做到尾：',
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
