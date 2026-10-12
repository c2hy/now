export const profile = {
  name: 'Will',
  siteName: 'Will.OPC',
  site: 'https://willopc.com',
  location: 'Shanghai',
  email: 'hello@willopc.com',
  description:
    'Will’s observations, experiments, and changes of mind. An independent creator in Shanghai, exploring technology and everyday life.',
};
// Only add confirmed public destinations. Unconfigured channels are not rendered.
export const social: { label: string; href: string; account?: string }[] = [
  { label: '知乎', href: 'https://www.zhihu.com/people/56-90-3-32-19' },
  { label: '小红书', href: 'https://xhslink.cn/o/3PlbP24tW4g' },
  { label: 'X', href: 'https://x.com/willopc_com', account: '@willopc_com' },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@willopc_com',
    account: '@willopc_com',
  },
];
