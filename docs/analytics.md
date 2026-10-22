# 事件收集与 Mixpanel 接入

## 目标与事件口径

now 是 Will.OPC 双语个人网站。Mixpanel 负责记录「访问网站 → 浏览作品 → 点击官网或商店」的关键行为。页面浏览使用 Mixpanel 内置事件，作品与点击使用自定义事件；不使用 autocapture 或 session replay，避免重复事件与不必要的页面内容采集。

| 事件 | 触发 | 属性 |
| --- | --- | --- |
| `$mp_web_page_view` | 每次页面加载 | `page_path`、`page_title`、自动 `utm_*`、自动来源域 |
| `product_viewed` | 进入作品详情页 | `product_slug` |
| `store_clicked` | 作品详情的 App Store / Google Play 链接，包括中键点击 | `product_slug`、`store`、`placement` |
| `link_clicked` | 带 `data-analytics-placement` 的导航、作品条目、文章条目、作品官网、联系方式 | `placement`，可选 `product_slug` |

页面浏览使用 Mixpanel 内置的 `$mp_web_page_view`，不再额外发送自定义 `page_view`。作品画廊条目点击是 `link_clicked`，进入详情才是 `product_viewed`，避免把「点击了入口」当成「详情已加载」。联系方式以 `about_social_zhihu`、`about_social_xiaohongshu`、`about_social_x`、`about_social_threads` 区分。

## 属性口径

- `page_path`：当前页面的 pathname，不含 query 与 fragment。
- `page_title`：浏览器标题，与页面 `<title>` 一致。
- `product_slug`：内容中的稳定 slug（`tablow` / `yipa` / `bubbles`）。
- `store`：`app_store` 或 `google_play`。
- `placement`：稳定的入口标识，例如 `nav_projects`、`note_item`、`project_item`、`project_link_website`、`project_link_app_store`、`about_social_x`。

作品详情的链接由 frontmatter 的 `type` 生成 placement：`app-store` → `project_link_app_store`，`google-play` → `project_link_google_play`，`website` → `project_link_website`，`other` → `project_link_other`。只有商店链接带 `data-analytics-store`，因此会进入 `store_clicked`；官网与其他链接进入 `link_clicked`。

## 隐私与采集边界

- 关闭 autocapture：不采集链接 href、链接全文、邮箱地址、社交账号、正文或表单内容。
- 关闭 session replay：不录制页面、不采集滚动深度与阅读完成。
- 通过 `property_blacklist` 移除 `$current_url`、`$referrer`、`$initial_referrer` 与 `current_url_search`：不发送完整 URL、URL query、fragment 或完整 referrer。页面位置使用显式的 `page_path` 表达。
- 不采集文章正文、邮箱地址、社交账号全文或 URL 中的其他参数。营销链接可以带 UTM，但不要在 URL 中放入敏感信息。
- 使用 localStorage 持久化 Mixpanel `distinct_id`；不使用跨域或跨设备身份合并。

## UTM 与归因

Mixpanel SDK 自动读取 `utm_source`、`utm_medium`、`utm_campaign`、`utm_content` 与 `utm_term`。`analytics.ts` 设置 `stop_utm_persistence: true`，让 UTM 只作用于带参数的落地页，不在后续站内页面无限继承；这符合 Mixpanel 当前推荐的归因行为。站内导航的来源判断继续依赖 Mixpanel 自动记录的来源域。

这里不是跨域或跨设备的用户归因，也不能把页面浏览等同于阅读完成。

## 初始化配置

`src/scripts/analytics.ts` 使用 `mixpanel-browser` 官方 core 入口，在美国区域默认 endpoint 上初始化。core 入口不打包本站未使用的录屏与 targeting 模块，保留页面浏览、UTM、持久化和事件发送；统计仍在脚本执行时初始化，不依赖延迟加载或自定义事件队列。

```ts
import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core';

mixpanel.init(token, {
  track_pageview: false,
  autocapture: false,
  persistence: 'localStorage',
  stop_utm_persistence: true,
  save_referrer: false,
  property_blacklist: [
    '$current_url',
    '$referrer',
    '$initial_referrer',
    'current_url_search',
  ],
});
const page = { page_path: location.pathname, page_title: document.title };
mixpanel.register(page);
mixpanel.track_pageview(page);
```

先注册页面属性再调用 `track_pageview(page)`，确保内置页面浏览事件带上 `page_path` 与 `page_title`。页面浏览、身份、持久化、批量发送与重试都由 Mixpanel SDK 处理，代码不再维护自定义队列、匿名 ID、会话或 Beacon。

### 环境变量

```dotenv
PUBLIC_MIXPANEL_ENABLED=true
PUBLIC_MIXPANEL_TOKEN=
```

project token 是公开值，会出现在页面的 `data-analytics-token` 中；不要在这里放服务端 secret。未配置 token 时，正式构建仍可完成，但不会加载统计脚本。

数据区域为美国，使用 SDK 默认的 `https://api-js.mixpanel.com`。如果项目实际位于欧盟，需要在 `mixpanel.init` 中增加：

```ts
api_host: 'https://api-eu.mixpanel.com',
```

### 环境隔离

- 开发服务：不加载统计脚本，不创建 Mixpanel 存储键。
- `build:preview`：`PREVIEW_CONTENT=true`，不加载统计脚本。
- 正式构建：`import.meta.env.PROD`、`PUBLIC_MIXPANEL_ENABLED` 不为 `false`、且 token 非空时加载。
- 不再依赖部署平台的预览环境变量；预览隔离只由构建模式和显式开关决定。

## 本地验证

```sh
npm run check
npm run build
npm test
npm run test:analytics
```

`test:analytics` 使用临时目录构建正式代码、假 token 与独立的本地端口，并拦截 `https://api-js.mixpanel.com/**` 的请求；不改写 `dist`，也不会向真实 Mixpanel 项目发送事件。测试覆盖：

- 内置 `$mp_web_page_view` 与页面属性；
- 作品详情 `product_viewed`；
- 商店点击 `store_clicked` 与官网/导航点击 `link_clicked`；
- `placement`、`store`、`product_slug` 映射；
- UTM 自动属性；
- `$current_url`、`$referrer`、`$initial_referrer` 已被屏蔽；
- 开发环境不初始化统计。

上线前在 `.env` 填入真实 token，重新构建，并在 Mixpanel Live View 中确认四类事件到达美国区域项目。不要把测试 token 或测试事件写入正式统计。

## 分析边界

- 商店点击是跳转意图，不等于下载、安装、注册或付费。now 没有与产品 App 身份关联的证据，不应声称能计算端到端安装转化。
- 当前不采集阅读时长、滚动深度、阅读完成或主题切换。`$mp_web_page_view` 只能说明页面已加载，不能衡量内容是否读完。
- 官网链接点击使用 `link_clicked` + `project_link_website`，不是商店点击；不同产品可通过 `product_slug` 分组。
- `page_path` 可区分中英文页面及文章 / 作品，`placement` 可区分入口。同名事件数量与唯一访客 / 会话数量应分别计算。
- 文中缺少实际产品入口是站点内容选择；埋点无法替代入口设计。若需要分析正文带来的导流，应先添加真实、有意义的链接，再显式标记 placement。
