# Tablow 项目介绍与 SEO 调整

更新中英文项目介绍、画廊封面和分享预览。定位为「记录上次时间」的生活记录工具；英文主线为 “track when you last did something” / “time since your last entry”。

## 需求覆盖

| 搜索意图（语义推断，非搜索量排名） | 页面对应内容 |
| --- | --- |
| 上次是什么时候、距上次多久、last time tracker | SEO 标题、摘要、首段，说明自动显示距上次多久 |
| 理发记录、换牙刷、haircut tracker | 个人护理场景 |
| 换滤芯记录、换床单、家务记录、home maintenance log | 家务与维护场景 |
| 散步记录、运动记录、activity heatmap | 散步运动场景与真实热力图能力 |
| 见面记录、生活事件、life events tracker | 生活片段与备注 |
| 离线记录 App、无需账号、offline tracker | 本机保存、离线访问和平台支持 |
| 月历记录、历史记录、calendar and notes | 真实功能及查看方式 |

保留独立开发者的产品理念，但先回答用户的实际问题，再解释克制的功能选择。付费补记、导入导出和日期区间筛选明确归入 Premium；没有暗示提醒、云同步或目标管理能力。

## 技术实现

- 项目内容支持可选 `seoTitle`，写入 title 与 OG title；其他项目保持原有标题回退。
- 项目内容支持可选 `ogImage`，Tablow 使用专属中英文 1200×630 PNG，兼容现有分享图规范。
- 画廊使用对应语言的新版横版素材，保留现有画廊布局。
- canonical、双语 hreflang、项目链接和 sitemap 保留现有机制。

参考 Google 官方 [Search Essentials](https://developers.google.com/search/docs/essentials)：在标题、正文和描述中使用用户寻找该内容时的表达；[搜索摘要说明](https://developers.google.com/search/docs/appearance/snippet)：正文与 meta description 都可能成为摘要来源。因此本次同步调整正文与元描述，而非只增加关键词标签。

## 验证

- `npm run check`：28 文件，0 errors / warnings / hints。
- `npm run build`：24 页面，链接、独立元数据、H1、索引和隐藏内容检查通过。
- Playwright Chromium / WebKit：双语导航与多宽度布局共 4 项通过。
- 画廊已人工检查：横版文案与真实记录卡片主体可见，验收预览见 `tablow-gallery-2026-10-14.png`。
- 本次仅本地修改与构建，未部署。
