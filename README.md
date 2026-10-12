# Will.OPC

Will 的双语个人网站。Astro + TypeScript + Tailwind CSS 4，静态输出，记录与项目通过 Content Collections 管理。

首页是一篇长期保留的开篇文章，讲述 Will 如何重新检查熟悉的做法、把想法做出来，并让实际使用改变判断。视觉采用纯白背景、灰色正文和少量红色点缀（经典黑红配色），并支持夜间模式：默认跟随系统，也可用顶栏的按钮手动切换，选择会记在浏览器本地。标题使用衬线体（Newsreader 与思源宋体）、500 字重，正文保持无衬线、400 字重；中文正文行距 1.95，英文 1.85。顶部保留作品、文章、关于、语言切换与主题切换。作品页与文章页共用 640px 居中阅读列：每个作品采用题图在上的编辑块——上方 2:1 封面，下方名称、口号与作品描述，条目间以留白分隔、无卡片边框；文章列表以文字入口直接进入完整阅读。

## 本地运行

```sh
npm install
npm run dev
```

打开终端显示的地址（默认 http://localhost:4321）。英文首页 `/`，中文首页 `/zh/`。Writing、Projects 和 About 均可浏览；三个项目与四篇文章各有中英文详情。

需要 Node.js 22.12 或更新版本。Astro 7 的开发服务在后台运行，可使用 `npm run dev -- stop` 停止。

```sh
npm run check          # Astro / TypeScript 检查
npm run build:preview  # 预览构建（包含标记为 sample / draft 的内容）
npm run preview        # 浏览 dist 预览构建
npm test               # Chromium / WebKit 页面与响应式检查，自动启动本地站点
npm run build          # 正式构建，排除所有 sample / draft 内容
```

首次运行浏览器测试需 `npx playwright install chromium webkit`。

## 内容与样式

- `src/content/home/zh.md`、`src/content/home/en.md`：长期保留的中英文开篇文章，独立于文章列表维护。
- `src/content/writing/`、`src/content/projects/`：Markdown 正文与 frontmatter。`translationKey` 关联译文；slug 可不同。文章使用必填的 `category` 归入生活观察、技术分享或做产品；写作时可给未完成的内容标记 `sample: true` 或 `draft: true`，此类内容仅在预览构建可见。首页通过正文中的链接介绍作品；作品画廊展示 `cover` 封面、名称、`statement` 一句话说明与 `description` 作品描述，按年份与 `order` 排序，未配置 `cover` 时使用 `hero`。
- `src/data/profile.ts`：个人资料与已确认的公开链接。关于页的「联系我」区域展示邮箱与社交账号；`social` 条目包含 `label`（平台名称）、`href`（公开链接）和可选的 `account`（展示的账号名，未填写时展示「查看主页」）。没有配置的渠道不显示。
- `src/data/about.ts`：中英文人物介绍。邮箱与已确认的社交链接展示在关于页。
- `src/i18n/index.ts`：双语界面文案与路径工具。
- `src/styles/global.css`：Tailwind 4 主题（浅色与夜间两套色彩变量）、全局样式与正文排版。字体经 npm 包本地打包、不依赖 Google CDN，且全部使用 `font-display: swap` 避免加载阻塞：正文为 Inter 与 Noto Sans SC，标题为 Newsreader 与 Noto Serif SC，均为 OFL 授权；中文字体按 unicode-range 子集按需下载，Inter 主字体在页面预加载。
- `public/images/`：项目配图。`public/images/projects/` 保存各项目中英文宽幅配图，作品未配置 `cover` 时作为画廊回退；`public/images/project-covers/` 保存画廊使用的三张原创概念封面，中英文共用，生成方式与完整提示词见 `docs/project-covers.md`。
- `src/utils/og.ts`、`src/pages/og/`：构建时生成 1200×630 的中英文站点与文章 OG PNG；文章可通过 frontmatter 的 `cover` 覆盖默认文字版式。
- 站点图标：`public/avatar.svg` 是唯一的矢量品牌图标（页面 favicon、结构化数据共用）；`public/favicon.ico`（16/32）与 `public/apple-touch-icon.png`（180）由它用 sharp 栅格化生成，覆盖不支持 SVG 图标的浏览器、收藏夹与 iOS 主屏。

标记为 `sample` / `draft` 的内容仅由 `dev` / `build:preview` 显式开启，`build` 强制关闭（当前没有此类内容）。当前默认允许搜索引擎收录；如需让预览或测试部署不被收录，可明确设置 `PUBLIC_INDEXING_ENABLED=false`。Drip 仅在正式构建中、配置 `PUBLIC_DRIP_WRITE_KEY` 后加载，采集 `page_view`、作品浏览、商店点击和标记过的链接点击；开发环境不会生成身份、不读写浏览器存储，也不会发出请求。来源标记遵循 UTM 优先、外部 referrer 兜底：读取 `utm_source`、`utm_medium`、`utm_campaign`、`utm_content`，无 UTM 时保留外部 referrer hostname；X、Twitter 和 t.co 统一记为 `source=x`。同时为同一浏览会话生成并复用 `attribution_id`，不上传完整 referrer URL。Vercel Analytics 继续保留，用于网站访问统计。

在 Drip 中创建 `now` app 和 production web public ingest key，将输出的 public write key 配置为 `PUBLIC_DRIP_WRITE_KEY`。它可以出现在浏览器 bundle 中；不要配置 Drip server key。当前 `now` app 已允许 `https://willopc.com` 与 `https://now.willopc.com` 两个公开入口。

## 正式发布前

1. 核对中英文开篇文章、About 和个人信息；核对文章与发布日期。
2. 核对展示的产品界面与发布版本是否一致，并补充 Huddle 已确认的公开入口；Yipa 与 Tablow 已接入官网和商店链接。
3. 维护已确认的社交链接与邮箱；未配置的渠道不显示。
4. 配置 Drip public write key 与正式部署，并在上线后检查 `page_view`、`product_view`、`store_click` 和 `link_click` 是否入库。

## 验证

2026-10-08 重构已通过 Astro / TypeScript 检查（0 错误、警告、提示）、24 页正式构建与链接和元信息检查，以及 Chromium / WebKit 共 12 项浏览器检查。覆盖首页正常字重、中英文作品画廊的封面加载与点击、文章阅读、语言切换、键盘导航，以及 320、375、768、1024、1440px 的页面排版。另已目视检查中英文首页、桌面与手机作品画廊、中文文章列表、作品详情与站点分享图。尚未部署；未进行真实设备验收。

作品改为纵向单列并增加描述后，24 页构建与链接检查通过，复跑 Chromium / WebKit 的作品入口和响应式检查共 4 项，均通过；另已检查中英文作品描述、正常字重及桌面和手机效果。

2026-10-13 点缀色由蓝改为红并加入夜间模式后，Astro / TypeScript 检查通过（0 错误、警告、提示），24 页正式构建与链接检查通过，Chromium / WebKit 共 14 项浏览器检查通过（新增夜间模式：跟随系统、手动切换、刷新后记忆）；另已目视检查中英文首页、作品页与文章页在浅色和夜间下的效果，以及 375px 手机端顶栏。

同日清理已不再引用的旧版作品封面与生成源图（`public/images/covers/`）、概念示意图（三个 SVG）、产品截图（`tablow-home-*.png`）及 Newsreader 字体授权文件：`public/` 由约 14MB 降至 3.3MB。清理后正式构建与链接检查通过，Chromium / WebKit 共 14 项浏览器检查通过。

同日升级字体与排版：标题引入 Google Fonts 字体系列 Newsreader（西文）与 Noto Serif SC（中文），经 npm 包自托管、不依赖 Google CDN，全部 @font-face 均为 `font-display: swap`（构建产物 204 条），Inter 主字体在页面内预加载；标题采用流体字号与 `text-wrap: balance`，英文正文行高调整为 1.85，日期使用等宽数字。Astro / TypeScript 检查通过、24 页构建与链接检查通过，Chromium / WebKit 共 16 项浏览器检查通过（覆盖两款衬线字体真实加载、中英行高与日期数字对齐）；另已目视检查中文文章页、中英文列表页、作品页与夜间效果。
