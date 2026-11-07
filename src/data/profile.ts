export const profile = {
  name: 'Will',
  siteName: 'Will.OPC',
  alternateName: 'willopc',
  site: 'https://willopc.com',
  location: 'Shanghai',
  email: 'hello@willopc.com',
};
export type Channel = {
  id: string;
  label: string;
  labelEn?: string;
  href: string;
  account?: string;
};
// Only add confirmed public destinations. Unconfigured channels are not rendered.
export const social: Channel[] = [
  {
    id: 'zhihu',
    label: '知乎',
    labelEn: 'Zhihu',
    href: 'https://www.zhihu.com/people/56-90-3-32-19',
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    labelEn: 'RedNote',
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
