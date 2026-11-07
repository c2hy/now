# Will.OPC

Will 的双语个人网站。Astro + TypeScript + Tailwind CSS 4，静态输出，记录与项目通过 Content Collections 管理。

首页是一篇长期保留的开篇文章，讲述 Will 如何重新检查熟悉的做法、把想法做出来，并让实际使用改变判断。视觉采用纯白纸色、墨色正文和少量红色点缀（夜间模式为深纸色、浅墨色、同一支红），默认跟随系统，也可用顶栏的按钮手动切换，选择会记在浏览器本地。页面结构交给两套宽度：版面画布 1024px 用于首页、列表与页头，阅读列 640px 用于连续长文；页头固定、76px 高，滚到首页画作上时改用半透明玻璃底。字号只有三档：32px 页面标题、18px 正文与导语、13.5px 元信息；字重只有两档：正文与导语 300，标题、导航、元信息与链接 400。中文行盒 34px、英文 28px，正文与导语另加 0.015em 字距。首页首屏是一幅通栏的画，画高由视口与首行行高推导，滚到底时画的下沿正好收进页头下方。段落用留白自然衔接，联系入口跟随正文左对齐；四个渠道链接保持墨色与静止下划线，hover 转红，整页只有「联系我」标题是红色。其他页面的标题是 32px 衬线体、400 字重，中文用思源宋体子集、拉丁用 Georgia。顶部保留作品、文章、关于、语言切换与主题切换。作品页与文章页共用 640px 居中阅读列：每个作品采用题图在上的编辑块——上方 2:1 封面，下方名称、口号与作品描述，条目间以留白分隔、无卡片边框；文章列表以文字入口直接进入完整阅读。

## 本地运行

```sh
npm install
npm run dev
```

打开终端显示的地址（默认 http://localhost:4321）。英文首页 `/`，中文首页 `/zh/`。Writing、Projects 和 About 均可浏览；三个项目与六篇文章各有中英文详情。

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
- `src/content/writing/`、`src/content/projects/`：Markdown 正文与 frontmatter。`translationKey` 关联译文；slug 可不同。文章使用必填的 `category` 归入生活观察、技术分享或做产品；写作时可给未完成的内容标记 `sample: true` 或 `draft: true`，此类内容仅在预览构建可见。首页正文保留当前开篇文章；作品画廊展示 `cover` 封面、名称、`statement` 一句话说明与 `description` 作品描述，按年份与 `order` 排序，未配置 `cover` 时使用 `hero`。
- `src/data/profile.ts`：个人资料与已确认的公开链接。关于页的「联系我」区域展示邮箱与社交账号；`social` 条目包含 `label`（平台名称）、`id`（固定统计标识）、`href`（公开链接）和可选的 `account`（展示的账号名，未填写时展示「查看主页」）。没有配置的渠道不显示。
- `src/data/about.ts`：中英文人物介绍。邮箱与已确认的社交链接展示在关于页。
- `src/i18n/index.ts`：双语界面文案与路径工具。
- `src/styles/global.css`：Tailwind 4 主题（浅色与夜间两套色彩变量）、全局样式与正文排版。拉丁文不再打包 webfont，按平台落到系统字（Windows 优先 Segoe UI Variable Text / Segoe UI，macOS 为 -apple-system / Helvetica Neue）；英文连续正文优先 Sitka Text，缺失时回落到 Georgia。中文使用自托管子集，运行时不发外部字体请求，全部 `font-display: swap`：正文黑体 `sans-sc-300.woff2` / `sans-sc-400.woff2`（正文 300、界面 400），h1 与页头字标用 `serif-sc-display-400.woff2` 局部子集，`serif-sc-400.woff2` 仅作标题衬线后备。子集由 `scripts/subset-fonts.mjs` 生成，字符表在同目录的 `subset-chars.txt` 与 `display-chars.txt`。
- 作品列表的首张封面优先加载，后续封面保持懒加载。
- `public/images/`：项目配图。`public/images/projects/` 保存各项目中英文宽幅配图，作品未配置 `cover` 时作为画廊回退；`public/images/project-covers/` 保存画廊封面，其中 Tablow 使用随版本更新的产品素材，其他作品使用原创概念封面，生成方式见 `docs/project-covers.md`。
- `src/utils/og.ts`、`src/pages/og/`：构建时生成 1200×630 的中英文站点与文章 OG PNG；首页分享图按语言各一张：`public/og/home-en.jpg` 与 `public/og/home-zh.jpg`（中英同画、纸色区问句取自首页第一段，JPG 各控制在 200KB 内），由 `scripts/og-home.mjs` 生成，文案改动后重跑脚本与构建。文章可通过 frontmatter 的 `cover` 覆盖默认文字版式。
- 项目可通过 `seoTitle` 覆盖页面与 OG 标题，通过 `ogImage` 指定分享图。图片尺寸由项目元数据声明，构建校验会核对图片实际尺寸与 `og:image:type`；Tablow 项目图为 1200×600。标题、摘要和正文应一起维护，准确描述已有功能及会员限制。
- 站点图标：`public/avatar.svg` 是唯一的矢量品牌图标（页面 favicon、结构化数据共用）；`public/favicon.ico`（16/32）与 `public/apple-touch-icon.png`（180）由它用 sharp 栅格化生成，覆盖不支持 SVG 图标的浏览器、收藏夹与 iOS 主屏。

标记为 `sample` / `draft` 的内容仅由 `dev` / `build:preview` 显式开启，`build` 强制关闭（当前没有此类内容）。当前默认允许搜索引擎收录；如需让预览或测试部署不被收录，可明确设置 `PUBLIC_INDEXING_ENABLED=false`。

## SEO 与品牌检索

站点的正式名称为 `Will.OPC`，别名为 `willopc`，统一维护在 `src/data/profile.ts`。双语首页和关于页的描述及首段正文同时包含这两种写法；标题只保留 `Will.OPC`（首页即品牌名，关于页与 404 用「内容名 + 品牌」），文章与作品使用各自的内容标题，不再追加品牌后缀。页面静态输出，抓取正文无需执行 JavaScript。

全站 JSON-LD 用同一个 `WebSite` 标识声明 `name: Will.OPC`、`alternateName: willopc`，并关联作者 `Person`、已确认的社交主页和文章。中英文页面提供独立 canonical、互相对应的 hreflang 和英文 `x-default`，三者与 sitemap 的 URL 保持一致：语言首页为 `/`、`/zh/`，其他内容路径不带末尾斜杠。`/sitemap.xml` 包含全部已发布内容，`/robots.txt` 声明其地址。404 页面始终为 `noindex`。正式构建会校验这些关联、品牌关键词和元信息。

文章页显示链接到同语言 About 的作者署名，列表展示文章摘要；文章和作品正文中的延伸阅读使用同语言站内链接。维护内容时应一并核对相关链接；新增实质内容或链接后用真实的 `updatedAt` 更新文章修改日期，保留原始 `publishedAt`。产品的 `seoTitle` 描述类型与用途，文章可通过 `seoTitle` 提供简洁搜索标题，同时保留正文原题。

发布到 `https://willopc.com` 后，在已验证的搜索引擎站长平台提交 `https://willopc.com/sitemap.xml`，并对 `/`、`/zh/`、`/about`、`/zh/about` 请求重新抓取。Google Search Console 可使用「网址检查」核对线上 HTML 和索引状态。代码校验确认的是可抓取内容与品牌信号；实际收录、排名和生效时间由搜索引擎决定。

Mixpanel 仅在配置 public project token 的正式构建中启用；开发与 `build:preview` 不加载统计脚本。使用 Mixpanel 内置页面浏览事件，并记录作品详情浏览、商店点击与显式标记的链接点击；UTM 由 Mixpanel 自动采集，且不在后续页面无限继承。关闭 autocapture 与 session replay，不采集完整 URL、完整 referrer、链接全文、邮箱或社交账号。

在 `.env` 与部署环境配置 `PUBLIC_MIXPANEL_ENABLED`、`PUBLIC_MIXPANEL_TOKEN` 后重新构建即可启用。详见[事件收集与 Mixpanel 接入](docs/analytics.md)，包含事件口径、属性、隐私边界、配置、验证方式及分析边界。

## 正式发布前

1. 核对中英文开篇文章、About 和个人信息；核对文章与发布日期。
2. 核对展示的产品界面与发布版本是否一致，并补充 Huddle 已确认的公开入口；Yipa 与 Tablow 已接入官网和商店链接。
3. 维护已确认的社交链接与邮箱；未配置的渠道不显示。
4. 配置 Mixpanel public project token 与正式部署，并在上线后检查 `$mp_web_page_view`、`product_viewed`、`store_clicked` 和 `link_clicked` 是否到达项目。

## 验证与文档维护

修改后按影响范围运行 `npm run check`、`npm run build`，涉及界面或交互时运行 `npm test`，涉及事件采集时加跑 `npm run test:analytics`。正式构建会检查链接、唯一标题与描述、品牌别名、结构化数据、sitemap、双语 hreflang、H1、索引配置、隐藏内容及项目分享图尺寸；浏览器测试覆盖双语导航、主题、字体和响应式布局。上线后另行确认真实统计入库与公开页面。

本仓库文档只保留当前说明与可复用流程：README 维护开发、内容和验证方式，[事件收集](docs/analytics.md) 维护采集口径与接入流程，[作品封面](docs/project-covers.md) 维护素材来源与生成方式。日常执行日志、日期命名的验收报告与旧版对比图不再入库；修改时原位更新对应说明。
