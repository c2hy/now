# 事件收集与 Drip 接入

## 目标与事件口径

now 是 Will.OPC 双语个人网站。Drip 负责串起「访问网站 → 浏览作品 → 点击官网或商店」；Vercel Analytics 保留访问概览。两个系统独立采集，访问数不能直接相加。

| 事件 | 触发 | 当前属性 |
| --- | --- | --- |
| `page_view` | 页面加载，以及浏览器从页面缓存恢复 | `path`、`properties.page_title` |
| `product_view` | 进入作品详情，包括从页面缓存恢复 | `product`（`tablow` / `yipa` / `bubbles`） |
| `store_click` | 作品详情的 App Store / Google Play 链接，包括中键点击 | `product`、`destination`、`properties.placement` |
| `link_click` | 带 `data-drip-placement` 的导航、作品条目、文章条目、作品官网、联系方式 | 可选 `product`、必填 `properties.placement` |

作品画廊条目点击是 `link_click`，进入详情才是 `product_view`，避免把“点击了入口”当成“详情已加载”。联系方式以 `about_social_zhihu`、`about_social_xiaohongshu`、`about_social_x`、`about_social_threads` 区分。

不采集链接全文、邮箱地址、社交账号、正文、URL query / fragment 或完整 referrer。作品名使用内容中的稳定 slug，泡泡留言板仍为 `bubbles`。

## 旧采集的缺陷与修正

| 原有问题 | 影响 | 当前处理 |
| --- | --- | --- |
| 只保存 attribution ID，每页重新读 UTM / referrer | 入口有来源，后续作品浏览和商店点击却没有来源；服务端不会自动继承 | 把 ID 与完整来源上下文一起保存在会话中，所有事件携带相同上下文 |
| attribution ID 不随新广告或渠道入口变化 | 同一 ID 对应不同来源，分析口径混乱 | 新 UTM 或外部 referrer 替换归因上下文，同时生成新的 attribution ID；无新信号时继承 |
| 仅有 campaign / content / medium 的 UTM 不产生 attribution ID；campaign 被转小写 | 部分营销链接无法分组，大小写敏感的活动标识被合并 | 任一受支持 UTM 都产生归因；source / medium 小写，campaign / content 保留大小写；有 UTM 时不猜测缺失的渠道字段 |
| 标签页不关闭，会话 ID 就一直不变 | 隔天回访也可能算同一次会话 | 30 分钟无活动后重建会话并清空来源；滚动、键盘与指针活动延长会话 |
| 每个事件单独发 Beacon，排队成功即结束 | 无法发现密钥错误、属性被拒、服务故障，也没有重试 | 普通发送用 keepalive fetch，读取 202 和 accepted；网络、408、429、5xx 最多尝试 3 次，复用事件 ID；其他拒收停止重试并输出一次不含敏感数据的告警 |
| 只依赖正式构建开关 | 本地预览正式产物、预览部署也可能采集，污染正式数据 | `build:preview` 和 Vercel preview 不配置 Drip；运行时在读取身份前校验 origin，默认仅允许 `https://willopc.com` |
| 社交链接共享 `about_social`，只处理普通 click | 不知道哪个渠道被点，中键打开漏记 | 为平台配置固定 placement，并处理 auxclick |
| 没有采集回归测试 | 构建通过不能证明浏览器发出的事件符合契约 | 独立正式构建 fixture 在 Chromium / WebKit 验证来源继承、身份、拒收、重试、离页、存储被禁与预览隔离 |

旧 README 的“首页正文通过链接介绍作品”已不符合当前内容；目前首页正文没有作品链接。未给正文做全量自动点击采集，后续增加关键入口时应显式标记 placement。

## 新版 Drip 的接入配置

新版继续使用 `POST /v1/events`、`schema_version: 1` 和 UUID v7。重构改变的是服务内部与配置模型：`project`、`ingest_key`、`event_definition`、`event`。事件定义的权威在数据库，代码内 seed 仅用于新库初始化，不能从存在 seed 文件推断线上已支持。

正式项目已在新 `drip_prod` 建立：

- project slug：`now`，名称 `Will.OPC`。
- allowed origins：`https://willopc.com`、`https://now.willopc.com`，保留旧客户端的来源域。
- 正式 key：runtime `production`、release channel `web`、platform `web`；traffic class 沿用服务端推断，保留 bot 识别。
- 事件定义已 seed，当前四种事件及其属性均为既有 public 契约，无需扩展全局属性白名单。
- public write key 从旧生产库 `drip` 原样迁入，保留 key / project ID、启用状态和 server key hash。本机忽略提交的 `.env` 已同步为这个旧 key；旧网站与新网站复用它，无需为服务切库更换已部署网站的 key。此前试配的新 key 已从 `drip_prod` 清除。

```dotenv
PUBLIC_DRIP_ENABLED=true
PUBLIC_DRIP_ENDPOINT=https://drip-api.willopc.com/v1/events
PUBLIC_DRIP_ALLOWED_ORIGINS=https://willopc.com
PUBLIC_DRIP_WRITE_KEY=pk_...
```

前端不传 `runtime_environment`、`release_channel`、`platform` 等服务端从 key 推断的字段，也不需要 server key。不要向前端配置 `srv_` key。

全新且没有历史客户端的环境，首次初始化时执行一次（当前生产库已经完成，不要重建生产 key）：

```sh
# 在 drip 仓库，确认 .env 指向需要初始化的新库
npm run manage -- event seed
npm run manage -- project create --slug now --name Will.OPC \
  --origin https://willopc.com --currency CNY
npm run manage -- key create --project now --label 'production web' \
  --runtime production --release-channel web --platform web
```

已有项目不要重建或重复创建 key，先用 `project show --project now`、`key list --project now` 检查。既有库不要为了接入 now 重跑 `event seed`，它会覆盖已有定义的配置。

`drip_prod` 已重新初始化，包含 Now 与 Tablow 的旧 key 和 54 条事件定义，事件表为空。旧库 `drip` 未修改，历史事件不迁移。新版服务尚未上线；正式启用仍需发布新版采集服务并连接 `drip_prod`。由于新旧库复用旧 key，已部署网站无需随服务切换更新 key。如果部署环境曾改用此前试配的新 key，应先恢复为旧 key。

## 会话、来源与发送行为

匿名 ID 继续复用 localStorage 中的 `drip_anonymous_id_v1`；新会话和归因使用 sessionStorage 的 `drip_session_v2`。同一浏览器、同一 origin 的标签页共享匿名 ID；会话保存在标签页存储中，不主动合并。不同浏览器和域名不合并身份。存储被禁时退回当前页面内存 ID，跨页面连续性相应降低。

来源采用“会话内最近一次明确入口”的口径：UTM 优先；完全没有受支持 UTM 时，使用外部 referrer hostname。X / Twitter / t.co 统一为 `x`。站内导航和语言切换保留上下文，新的明确入口替换上下文，会话超时清空。它不是跨域或跨设备的用户归因。

队列仅在当前页面内存中，最多 100 个事件。每批最多 20 个、48 KB，普通请求合并发送；隐藏页面或离页时用 Beacon 补发尚未确认的批次，包括仍在途的批次，由 Drip 按 `(project_id, id)` 去重。Beacon 返回 true 只说明浏览器接收了发送任务；断网后关闭页面、浏览器强退或拦截器阻断仍可能丢事件，不保证永久离线补发。

## 本地验证

```sh
npm run check
npm run build
npm test
npm run test:drip
```

`test:drip` 使用临时目录构建正式代码、假 key、受拦截的测试 endpoint 和独立的本地端口，不改写 `dist` 或连接正式服务。普通 `npm test` 使用开发服务，不启用 Drip。

验证真实服务时，启动本地新版 drip，连接专用开发库，用 `traffic_class=automation` 的独立 key 上报同样的浏览器事件。核对 202、accepted / inserted、数据库实际记录、来源继承以及同 ID 重发的 inserted=0；测试 key 用后撤销。不要把集成测试指向正式库。

## 当前验证结果

本地新版服务连接 `drip_dev`，浏览器使用独立 automation key；未将开发验证事件写入正式库。Chromium 和 WebKit 分别完成首页 → 作品列表 → Tablow 详情 → App Store 点击，各有 7 条唯一事件实际落库，覆盖四种事件名；source=`x`、medium=`social`、大小写保留的 campaign / content、会话、匿名 ID、归因 ID 均贯穿链路。同 ID 重发返回 202、inserted=0，浏览器无脚本错误。测试 key 验证后撤销。

自动验证包括 22 项正式 bundle 采集测试、20 项页面与开发隔离测试，另有 Astro / TypeScript 检查及正式 / 预览构建。公开入口的新版服务与网站尚未发布，不能把本地验证表述为线上采集已经恢复。

旧 key 迁入后，另以本地新版服务的路由连接真实 `drip_prod`，按旧记录的字段回放 Now 的 483 条 public 事件（使用新事件 ID 和当前时间，避免历史时间窗口影响协议验证）。全部返回 202；同 ID 重发 inserted=0；两个历史 origin 均放行，未授权 origin 返回 403。验证写入在初始化事务提交前清除，未迁入历史事件。

## 分析边界

- 商店点击是跳转意图，不等于下载、安装、注册或付费。now 还没有与产品 App 身份关联的证据，不应声称能计算端到端安装转化。
- 当前不采集阅读时长、滚动深度、阅读完成或主题切换。`page_view` 只能说明页面已加载，不能衡量内容是否读完。
- 官网链接点击使用 `link_click` + `project_link_website`，不是商店点击；不同产品可通过 `product` 分组。
- `path` 可区分中英文页面及文章 / 作品，`placement` 可区分入口。同名事件数量与唯一访客 / 会话数量应分别计算，生产分析需筛选 `traffic_class = 'production'`。
- 文中缺少实际产品入口是站点内容选择；埋点无法替代入口设计。若需要分析正文带来的导流，应先添加真实、有意义的链接，再显式标记。
