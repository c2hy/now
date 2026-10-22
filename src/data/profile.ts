export const profile = {
  name: 'Will',
  siteName: 'Will.OPC',
  alternateName: 'willopc',
  site: 'https://willopc.com',
  location: 'Shanghai',
  email: 'hello@willopc.com',
  description:
    'Will’s observations, experiments, and changes of mind. An independent creator in Shanghai, exploring technology and everyday life.',
};
// Only add confirmed public destinations. Unconfigured channels are not rendered.
export const social: {
  id: string;
  label: string;
  href: string;
  account?: string;
}[] = [
  {
    id: 'zhihu',
    label: '知乎',
    href: 'https://www.zhihu.com/people/56-90-3-32-19',
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    href: 'https://xhslink.cn/o/3PlbP24tW4g',
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/willopc_com',
    account: '@willopc_com',
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.com/@willopc_com',
    account: '@willopc_com',
  },
];
