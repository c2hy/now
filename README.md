# Will.OPC

Will 的双语个人网站。Astro + TypeScript + Tailwind CSS 4，静态输出，记录与项目通过 Content Collections 管理。

## 本地运行

```sh
npm install
npm run dev
```

打开终端显示的地址（默认 http://localhost:4321）。英文首页 `/`，中文首页 `/zh/`。Notes、Projects 和 About 均可浏览；三个项目与三篇记录各有中英文详情。

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

- `src/content/writing/`、`src/content/projects/`：Markdown 正文与 frontmatter。`translationKey` 关联译文；slug 可不同。文章使用必填的 `category` 归入生活观察、技术分享或产品与构建；写作时可给未完成的内容标记 `sample: true` 或 `draft: true`，此类内容仅在预览构建可见。
- `src/data/profile.ts`：个人资料与已确认的公开链接。没有配置的渠道不显示。
- `src/i18n/index.ts`：双语界面文案与路径工具。
- `src/styles/global.css`：Tailwind 4 主题、全局样式与正文排版。字体由 npm 包提供并本地打包；Inter 与 Noto Sans SC 均使用 OFL 授权。
- `public/images/`：项目 SVG 概念示意图与已确认的产品截图。
- `src/utils/og.ts`、`src/pages/og/`：构建时生成 1200×630 的中英文站点与文章 OG PNG；文章可通过 frontmatter 的 `cover` 覆盖默认文字版式。

标记为 `sample` / `draft` 的内容仅由 `dev` / `build:preview` 显式开启，`build` 强制关闭（当前没有此类内容）。当前默认允许搜索引擎收录；如需让预览或测试部署不被收录，可明确设置 `PUBLIC_INDEXING_ENABLED=false`。不加载统计脚本，也不写追踪存储；`robots.txt`、`sitemap.xml` 和中英文 OG 分享图已接入，RSS、Analytics 与生产部署仍待接入。

## 正式发布前

1. 确认 Hero、About 和个人信息；核对文章与发布日期。
2. 补充 Huddle 的真实产品截图和外部链接；Yipa 与 Tablow 已接入中英文官网及 App Store / Google Play 链接，项目详情头图仍是概念示意图。
3. 配置真实社交链接与邮箱。
4. 按规划补齐 SEO 分享、订阅、统计与部署，并在上线后核对索引状态。

## 规划

当前初版已通过类型检查、22 页预览与正式构建，以及 Chromium / WebKit 共 6 项浏览器测试。响应式检查覆盖 320、375、768、1024、1440px；另已目视检查首页、文章和项目详情。尚未进行 iOS / Android 真机测试、Lighthouse 性能评估或生产部署验证。

- [V1 实现规格](docs/v1-implementation-guide.md)
