# 外部证据：B 端定制、个人品牌与「改变收款对象」

> 这份文件只做一件事：核查三条路径各自依赖的外部事实。不评价既有内部策略文档，不重复它们的推导，不给行动建议。
>
> 证据等级：**A**＝官方文档、平台一手数据、法规原文、有样本且方法公开的调查；**B**＝可信二手转述，或平台统计口径不完全透明；**C**＝单一来源、创作者自述、媒体估算，或本文的算术推断。
>
> 每条带日期。事实、对未来的推测、查不到，三者分开写。检索与核对截止 2026-11-06。
>
> 定价页与平台政策都会变。表中「2026-11-06」表示当天在页面上读到的现值，不代表长期有效。

---

## 0. 结论先行

1. **B 端定制的收入上限由可计费小时决定。** 单人能卖的小时有硬上限；按中国平台 2026 年的指导价（500–800 元/人天）换算，整包月收入约 1.1–1.8 万元，海外按 Upwork 中级费率（$40–70/h）换算约 $6.4k–11.2k。这是算术，不是统计（C，推断，2026-11）。
2. **产品化服务能提高复用率，但公开基准里「服务段」的毛利仍远低于订阅。** Benchmarkit 2025 的 B2B SaaS 样本：订阅毛利中位 81%，专业服务毛利中位 30%，整体 77%。咨询业调查的毛利中位 36–40%，头部 55–60%（B）。软件侧的可核实毛利是 75–82%（A/B）。
3. **「做定制的人后来做出产品」有路径，没有比例。** 能核实的是案例时间线：37signals 1999 年做设计、2004 年发布 Basecamp，产品上线约一年后收入超过设计业务；Trello 来自 Fog Creek 的内部工具，内部到发布约 1 年，但 Fog Creek 已存在 11 年。**任何「定制转产品的转化率」都查不到有样本的调查**（2026-11）。
4. **中文市场的名义价差很大，但成交数据不存在。** 猿急送 2026 年自述：整包 1–8 万元、大型 30 万元以上、时间制 500–800 元/人天、平台抽成 8.6%。Clutch 2026-09 的样本（公司口径）：平均项目 $66,499、$25–49/h。两者项目范围不可直接对齐，价差 2–47 倍取决于口径（B + 推断）。
5. **个人品牌的收入是幂律，平台只公布分子，不公布分母。** YouTube 官方 2018 年说，被新门槛影响的频道里 99% 年收入不足 $100、90% 月收入不足 $2.50（A）。Substack 2026 年约 10 万个出版物有收入、2025 年作者总收入 4.5 亿美元、前 10% 拿走 62%（B）。Gumroad 2020 年有收入的 45,917 个创作者，中位年收入 $70（B）。
6. **平台在收紧「从内容到现金」的入口。** YouTube 2026-08 宣布，2027-02-01 起新创作者需要 365 天内 8,000 有效观看小时，或 90 天内 2,000 万 Shorts 播放；2018 年的门槛是 1,000 订阅 + 4,000 小时（A）。
7. **「团队版比个人版贵很多倍」是错觉。** 2026-11-06 官方定价页的单席倍数中位约 2 倍：Notion 2.0×、Linear 1.6×、Figma 3.4×、Slack 2.1×、Superhuman 1.3×（A）。Fathom 单席甚至更便宜（Premium $20、Team $19/人），但 2 席起使最低月费变成 1.9 倍。收入的倍数来自席位数量、最低席位与企业合同，不来自单席溢价。
8. **组织客户的收入集中度可核实。** Figma 2026 Q3：收入 3.914 亿美元（同比 +43%），GAAP 毛利 80%、非 GAAP 82%；ARR 超过 1 万美元的客户 16,566 个，超过 10 万美元的 1,717 个（A）。
9. **微信生态的社群付费是「平台抽成 + 版本包 + 按席位」，不是「按群卖」。** 知识星球抽成 20%（个人）、企业分段 20%/10%；小鹅通 2025 年 GMV 203.02 亿元、收入 6.08 亿元（抽成率约 3%，推断）、关键客户 1,689 家；群接龙收 1% 交易服务费、团长主页 299 元/年、社群主页免费（A/B，2026-05 / 2022-06）。
10. **中国的主体规则直接决定能收谁的钱。** 2026-09 微信向个人主体开放「工具」类目虚拟支付：月限额 10 万元，Android 1%、iOS 12%；个人主体仍不支持 web-view；自然人可凭身份证代开发票，但开票与对公账户链条和企业主体不同（A）。Apple 个人账号以个人姓名上架，组织账号要 D-U-N-S（A）。Google Play 2023-11-13 后新建的个人账号，上正式版前要 12 名测试者连续 14 天（B）。

---

## 1. B 端定制 / 产品化服务的真实单位经济

### 1.1 三种形态的定价与毛利

| 形态 | 可核实的价格/费率 | 来源与日期 | 类型 | 等级 |
| --- | --- | --- | --- | --- |
| 外包（时间换钱） | Upwork 页面：入门 $20–40/h、中级 $40–70/h、专家 $70–150+/h；项目数周到数月 | [Upwork 成本页](https://www.upwork.com/hire/software-developers/cost/)，2026-11 现值 | 平台指导 | B |
| 外包平台抽成 | Upwork 按合同 0–15%（示例 10%）；Direct Contracts 5% | [Upwork 官方](https://support.upwork.com/hc/en-us/articles/211062538-Report-Fraudulent-Activity)、[Direct Contracts](https://www.upwork.com/direct-contracts/)，2026-11 现值 | 官方 | A |
| 外包平台抽成 | Contra 0% 佣金；客户付 $29/合同 + Stripe 手续费 | [Contra 官方帮助](https://help.contra.com/en/articles/11159973-how-to-bring-a-new-client-to-contra)，2025–2026 | 官方 | A |
| 外包（公司口径） | Clutch 美国样本：平均项目 $66,499.09；平均月费 $7,138.93；$25–49/h | [Clutch 定价指南](https://clutch.co/web-developers/pricing)，2026-09-21 更新 | 平台统计 | A |
| 产品化服务 | Designjoy：$4,995/月（原价 $5,995），一次一个需求，平均 48 小时交付，单人运营、不外包 | [Designjoy 官网](https://www.designjoy.co/)，2026-11-06 | 官方价格页 | A |
| 产品化服务 | ManyPixels：$699 / $1,199 / $1,399 / $2,599 每月；次日交付 | [ManyPixels 定价](https://www.manypixels.co/pricing)，2026-11-06 | 官方价格页 | A |
| 咨询 | 咨询费调查（近 1,000 名受访者）：39% 收 $100–250/h；19% 收 $250–500；12% 低于 $100；4% 收 $500–1,000；0.5% 超过 $1,000；25% 不按小时 | [Consulting Success 费率研究](https://www.consultingsuccess.com/consulting-hourly-rate)，2026-11-02 更新 | 独立调查（自选样本） | B |
| 咨询 | 月收入分布：32% 在 $10K–45K/月；22% 低于 $2K/月；5% 在 $45K–100K+/月 | [Consulting Success](https://www.consultingsuccess.com/increase-your-fees-with-the-right-consulting-clients)，2025–2026 | 独立调查 | B |
| 咨询（欧洲） | 日均 1,300 欧元；合伙人 1,600 欧元；分析师 700 欧元 | [BDU 2025 薪酬研究](https://www.bdu.de/news/studie-honorare-im-consulting-2025-tagessaetze-leicht-ruecklaeufig/)，2025-12-15 | 行业调查 | B |

**毛利对照（关键的一行）**

| 口径 | 数值 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| B2B SaaS 订阅毛利中位 | 81% | [Benchmarkit 2025](https://www.benchmarkit.ai/2025benchmarks)，2025 年度报告 | B |
| B2B SaaS 专业服务毛利中位 | 30% | 同上 | B |
| B2B SaaS 整体毛利中位 | 77% | 同上 | B |
| 咨询公司毛利中位 | 36–40%；头部 55–60% | [NStar 行业基准](https://nstarfinance.com/resources/consulting-firm-profitability-benchmarks)，2025 | B |
| 软件公司毛利（对照） | SaaS 中位约 75%；Figma 2026 Q3 GAAP 80%、非 GAAP 82% | [SaaS 毛利率汇编](https://getaleph.com/answers/saas-gross-margin-2026)（2026）、[Figma 财报](https://investor.figma.com/news-events/news/news-details/2026/Figma-Announces-Third-Quarter-2026-Financial-Results/default.aspx)（2026-11-04） | A/B |

口径要说清：Benchmarkit 的「专业服务 30%」是 SaaS 公司内部的服务段，不是单人产品化服务的独立毛利。Designjoy 这类单人、无雇员的产品化服务，真实毛利可能高于 30%，但它只公开了「单人、无外包、$4,995/月」，没有经审计的毛利数据（C，查不到）。

### 1.2 单人月收入与工时

| 事实 | 数值 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 美国知识工作者中自由职业比例 | 28%，约 2,000 万人 | [Upwork Future Workforce Index](https://www.upwork.com/press/releases/upwork-study-finds-1-in-4-u-s-skilled-knowledge-workers-now-work-independently-generating-1-5-trillion-in-earnings)，2025-04-23，样本 3,000，±1.8% | A |
| 「仅靠自由职业收入」的月收入中位 | $85,000/年 ≈ $7,083/月（全职雇员对照 $80,000/年） | 同上 | A |
| 全球自由职业者平均时薪 | $28/h（2022 年报告） | [Payoneer 报告](https://blog.payoneer.com/e-sellers/industry-tips-sellers/the-2022-global-freelancer-income-report/)，2022 | B |
| 开发者中自由职业比例 | 13.9%（n=48,178） | [Stack Overflow 2025](https://survey.stackoverflow.co/2025/work/)，2025 | A |
| 美国雇员软件开发者年薪中位 | $134,040（$64.44/h） | [BLS OOH](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)，2025 数据 | A |
| 美国私营部门企业生存率（2005 年出生队列） | 1 年 80.1%；5 年 52.6%；10 年 35.9% | [BLS 表 7](https://www.bls.gov/bdm/us_age_naics_00_table7.txt)，数据至 2026-03 | A |

三条限制必须标出来：

- BLS 表 7 统计的是**有雇员的私营 establishment**，不含非雇主自雇。用它推断「自由职业者退出率」不成立。
- Upwork 的 $85,000 是「仅靠自由职业收入」的**中位**，不是所有自由职业者的中位，也不是单人定制工作室的收入。
- 「单人每周工作多少小时、月收入多少」没有 2025–2026 的样本统计。本文 1.1 与 1.4 的月收入换算都是算术推断（C）。

**算术推断（C，不是统计）**：按 22 个工作日、500–800 元/人天，整包月收入 1.1–1.8 万元；按 160 小时、$40–70/h，月收入 $6.4k–11.2k；按 $70–150/h，$11.2k–24k。这里没有扣除获客时间、沟通、返工、平台抽成与税。

### 1.3 定制 → 产品：有案例时间线，没有比例

| 案例 | 可核实的时间线 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 37signals → Basecamp | 1999 年做网页设计；2004 年发布 Basecamp；产品上线约一年后收入超过设计业务，随后停止设计业务 | [Basecamp 官方历史](https://basecamp.com/about)，2026-11 读取 | B（创始人叙述） |
| Fog Creek 内部工具 → FogBugz | 2000 年内部 bug tracker，当年抽出代码对外售卖（不到 1 年） | [Joel Spolsky 文章](https://www.joelonsoftware.com/category/reading-lists/fog-creek-story/page/3/)，2003 | B |
| Fog Creek → Trello | 2010 年夏内部 Creek Week 原型；2011-09 发布；距 Fog Creek 成立 11 年 | [Trello 官方](https://trello.com/about/)，2026-11 读取 | B |

**查不到（2026-11）**：做过 B 端定制的独立开发者中，后来做出自己产品的比例。没有任何有样本的调查。MicroConf 的 State of Independent SaaS 样本是「已经是 SaaS 创始人」的人，存在选择偏差，不能拿来算转化率。「定制收入会让产品开发永久推迟」也没有纵向追踪数据。这两个问题都不能用个案替代。

### 1.4 中文市场 vs 海外

| 口径 | 中文市场 | 海外 | 来源与日期 | 等级 |
| --- | --- | --- | --- | --- |
| 时间制指导价 | 500–800 元/人天；驻场 600–900 元/人天 | Upwork 中级 $40–70/h；Clutch 公司均价 $25–49/h | [猿急送关于页](https://www.yuanjisong.com/home/index/aboutus.html)（2026）；Upwork（2026-11）；Clutch（2026-09-21） | B / A / A |
| 整包客单价 | 1–8 万元；大型 30 万元以上 | Clutch 平均项目 $66,499（约 47 万元） | 同上 | B / A |
| 平台抽成 | 猿急送 8.6% | Upwork 0–15%；Contra 0% + $29/合同 | 同上 | B / A |
| 平台规模（自述） | 130 万+ 技术人才、3.5 万+ 企业、累计 5 万+ 项目 | Upwork 未公开同类分母 | 猿急送，2026 | B（自述） |

换算：500–800 元/人天 ≈ $9–14/h（按 8 小时、7.1 汇率）。与 Upwork 中级差 3–8 倍，与 Clutch 公司均价差 2–5 倍。整包的名义价差 6–47 倍，但中文平台给的是「指导价」，不是成交价；Clutch 给的是公司项目均价，含设计、PM、测试。**范围不可比，价差不能直接当利润率差。**

程序员客栈的公开列表显示开发类报价 300–1,000 元/天（B，2026-11 页面摘要）；猪八戒首页的低端小程序标价 800–1,088 元（B，2026-11）。这两条只能说明「低价档存在」，不能说明市场均价。

### 1.5 隐性资产的转化证据

可核实的只有案例，没有转化率：

- **可复用组件**：Fog Creek 把内部 bug tracker 抽成 FogBugz，不到 1 年；Trello 从内部原型到发布约 1 年（B）。
- **领域知识**：37signals 的设计客户工作持续 5 年，才在 2004 年推出 Basecamp（B）。
- **客户关系**：没有找到可核实的「客户变成产品用户/付费方」的公开数据。ConvertKit、Zapier 早期的公开叙述里提到过客户网络，但没有可核对的转化数字（C，查不到）。

转化周期：上述两个案例是 1 年和 5 年。样本量 2，不能当分布。

### 1.6 这一节证明的机制

- 定制收入的分子是「可计费小时」，分母是「日历时间」。单人能卖的小时有上限，费率再高也受这个上限约束。产品化服务改变的是「同样一小时能复用给几个客户」，不改变「一天只有 24 小时」。
- 服务毛利低于软件毛利，原因是交付必须消耗人时；软件毛利高，原因是复制边际成本接近零。Benchmarkit 的 30% 与 81% 就是这个差。
- 定制 → 产品的路径在机制上成立（组件、领域知识、客户反馈都能迁移），但迁移速度与概率没有公开数据。能核实的案例都用了 1 年以上，其中一个用了 5 年。

---

## 2. 「把个人品牌做起来再反哺产品」的成功率

### 2.1 收入分布

| 结论 | 数值 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 全球创作者规模与收入分层 | 约 5,000 万人；仅约 4% 年收入超过 10 万美元；品牌合作约占收入 70% | [Goldman Sachs](https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027)，2023-04-19 | A（2023 年数据） |
| Substack 有收入的出版物 | 约 10 万个（美国以外约 3 万个）；付费订阅 500 万；2025 年作者总收入 4.5 亿美元 | [Mediagazer 转 On Substack](https://mediagazer.com/260422/p7)，2026-04-22；[Social Day 转述](https://socialday.live/features/substack-writer-numbers-doubled-to-100-000-earning-money-but-most-make-under-500)，2026 | B（官方页未打开） |
| Substack 收入集中度 | 前 10% 拿走 62% 的付款；多数作者年收入低于 $500 | 同上 | B |
| Substack 成功率的分母 | 官方称「数百万出版物」曾开通，但不公布活跃数，因此无法算成功率 | [Scandinavia Standard 转述](https://www.scandinaviastandard.com/n-substack-now-has-millions-of-active-publications-and-only-about-100000-of-them-earn-any-money-at-all-the-gap-isnt-talent-its-that-nobody-teaches-distribution-leverage-business/)，2026-04 | B |
| Gumroad 创作者收入 | 2020 年有收入的 45,917 人；中位年收入 $70；前 1% 拿约 60%，前 10% 拿约 92% | [Silicon Florist 引 Gumroad](https://siliconflorist.com/2021/01/12/what-happened-in-the-gumroad-creator-community-in-2020/amp/)，2021-01-12 | B（2020 年数据） |
| Linktree 创作者收入 | 样本 1,562 人：70% 年收入低于 $49,000；约 46% 低于 $1,000 | [Mediaweek](https://www.mediaweek.com.au/linktree-unveils-new-products-and-partnerships-for-creators)，2024 | B |
| 免费用户 → 付费用户 | 约 10 万免费用户 → 约 100 付费，约 0.1% | [Pieter Levels](https://levels.io/free-users-vs-paying-users-1000x)，2024-11-01 | C（自述） |

### 2.2 失败面

| 结论 | 数值 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 被 YouTube 新门槛影响的频道收入 | 99% 年收入不足 $100；90% 月收入不足 $2.50 | [YouTube 官方博客](https://blog.youtube/news-and-events/additional-changes-to-youtube-partner/)，2018-01-16 | A（2017 年数据，仅指被影响频道） |
| YouTube 达到变现门槛的频道 | 2018 年门槛：1,000 订阅 + 4,000 小时；2026 年 8 月宣布 2027-02-01 起：8,000 有效小时/365 天，或 2,000 万 Shorts 播放/90 天 | [YouTube 2018](https://blog.youtube/news-and-events/additional-changes-to-youtube-partner/)；[YouTube 2026-08-10](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/) | A |
| YouTube 合作计划规模 | 3M 创作者在 YPP | 同上，2026-08-10 | A |
| 「发一年仍接近零增长」的官方比例 | 平台不公布活跃账号分母，查不到 | — | 查不到 |

网传的「90% 频道失败」「90% Substack 零收入」都追不到官方原始口径。Substack 的「12% 有付费收入」「中位年收入 850 美元」只见于聚合站转引，原始报告未找到（C，未核实）。

### 2.3 平台冷启动的实际限制

| 事实/条款 | 具体内容 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| YouTube 推荐不靠社交关系 | 依赖点击、观看时长、满意度问卷等约 800 亿信号；推荐带来的观看量高于订阅和搜索 | [YouTube 官方](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/)，2021-09-15 | A |
| Substack 的推荐机制 | 推荐出现在订阅后流程、主页、推荐邮件；系统提示对方「回荐」，本质是出版物之间的互推网络 | [Substack 官方帮助](https://support.substack.com/hc/en-us/articles/5036794583828-How-can-I-recommend-other-publications-on-Substack)，2024-09-17 | A |
| 微信公众号流量主门槛 | 关注用户达 100 人可开通返佣商品与程序化广告 | [微信广告官方文档](https://ad.weixin.qq.com/docs/45)，现行 | A |
| 小红书流量分配 | 官方称 50% 以上大盘流量持续分给千粉以下账号；0 粉可挂商品 | [新浪财经引官方](https://finance.sina.com.cn/roll/2026-05-30/doc-inhztchc9816988.shtml)，2026-05-30 | B |
| X 推荐 | 开源代码显示关注内与关注外两条检索路径，用 Phoenix 模型预测互动概率；未见对新账号的固定流量配额 | [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm)，2026-01 | B（未能打开原文，按二手转述） |

### 2.4 「炒起来」之后：访问与付费

| 案例 | 可核实数字 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| Pieter Levels：大播客曝光后 | Lex Fridman 播客后月收入 42 万美元（自述） | [levels.io](https://levels.io/new-420k-mo-revenue-record-lex-fridman)，2024-09-22 | C |
| Pieter Levels：Photo AI 现收入 | 月收入 10.5 万美元、利润 8 万美元（自述） | [levels.io](https://levels.io/photoai-40870-line-index-php-105k-mo-revenue)，2026-03-06 | C |
| Marc Lou：全部产品合计 | $87.5k/月；ShipFast 现 $1.7k/月；通讯 5 万读者 | [marclou.com](https://marclou.com/)，2026-11 读取 | C（自述，页面有产品收入条） |
| ShipFast：首发与现状 | 首月 $40k（通讯自述）；现约 $1.7k/月，约 −96% | [Marc Lou 通讯](https://newsletter.marclou.com/p/i-ve-made-3m-with-my-36-startups)（仅摘要）+ 官网，2026-11 | C |
| Ali Abdaal | 业务 2020–2023 年做到约 100 万美元/年；VoicePal 没有公开下载、付费、留存数字 | [aliabdaal.com](https://aliabdaal.com/about/)，现行 | C |

这一节能核实的是「访问量可以爆发」与「爆款收入会衰减」。**没有第三方数据把「爆款访问」换算成「产品付费」**；0.1% 免费→付费是创作者自述，样本不可外推。**留存数据全部缺失。**

### 2.5 其他可行顺序

| 顺序 | 可核实案例 | 时间线 | 来源与日期 | 等级 |
| --- | --- | --- | --- | --- |
| 服务 → 客户 → 产品 | 37signals 设计服务 → Basecamp | 1999 → 2004（约 5 年） | [Nira 史述](https://nira.com/basecamp-history/) | B |
| 产品 → 用户 → 品牌 | Easlo 卖 Notion 模板 → 个人品牌 | 2022 年约 23.9 万美元；2023 年约 5 万美元/月；X 35.6 万粉 | [Steal What Works](https://stealwhatworks.com/blogs/news/notion-templates-over-10k-month-now) | C（二手转述自述） |
| 平台生态内产品 → 用户 | Notion 官方开放创作者发布与售卖模板 | 现行 | [Notion 创作者页](https://www.notion.com/zh-cn/become-a-creator) | A |

### 2.6 这一节证明的机制

- 创作者收入服从幂律。平台公布分子（多少人有收入、总收入多少），不公布分母（多少账号曾经开通、多少仍在活跃）。任何「成功率」在官方口径上都算不出来。
- 冷启动的分发由算法分配。YouTube 官方把推荐信号量说成 800 亿，且推荐量高于订阅与搜索；新账号没有固定流量配额。
- 平台在提高「内容 → 现金」的门槛：2018 年 1,000 订阅 + 4,000 小时，2027 年 8,000 小时或 2,000 万 Shorts 播放。门槛方向是收紧。
- 爆款到付费至少两段损耗（访问→注册/下载，下载→付费）。可核实的只有爆发端和总收入，付费端只有自述。

---

## 3. 第三条路：改变收款对象

### 3.1 团队版 vs 个人版：单席溢价与最低门槛

以下全部为 2026-11-06 在官方定价页读到的月付价（年付另注）；倍数为本文换算（C 推断），价格本身为 A。

| 产品 | 个人/最低档 | 团队档（每席） | 单席倍数 | 最低团队门槛 | 最低门槛倍数 |
| --- | --- | --- | --- | --- | --- |
| Notion | Plus $10/人/月 | Business $20/人/月 | 2.0× | 未标最低席位；2 人即 $40 | 4.0×（按 2 人） |
| Linear | Basic $10/用户/月（年付） | Business $16/用户/月 | 1.6× | 1 席 | 1.6× |
| Figma | Professional Full seat $16/月 | Organization Full seat $55/月（年付） | 3.4× | 未标最低席位 | 3.4× |
| Slack | Pro $8.75/人/月 | Business+ $18/人/月 | 2.1× | 1 席 | 2.1× |
| Calendly | Standard $10/席/月 | Teams $16/席/月（年付） | 1.6× | 1 席；Enterprise $15k/年、50 席起 | 约 125×（Enterprise 对比 Standard） |
| Fathom | Premium $20/人/月 | Team $19/人/月 | 0.95×（单席） | **2 席起，最低 $38/月** | 1.9× |
| Superhuman | Starter $25/人/月 | Business $33/人/月（年付） | 1.3× | 1 席 | 1.3× |
| Miro | Starter $8/人/月 | Business $20/人/月（年付） | 2.5× | 1 席 | 2.5× |
| Descript | Hobbyist $24/月（$16 年付） | Business $65/人/月（$50 年付） | 2.7× | 未标；5 人示例 $325/月 | 13.5×（5 人） |

来源：各官方定价页，2026-11-06。表中未注明「月付」的，多为年付折算价；月付价更高，单席倍数会小幅变化，量级不变。Descript 官方页价格为 JS 渲染，未读到原文，数字来自第三方（B/C）。

读法：

- **单席溢价的分布是 0.95–3.4 倍，中位约 2 倍。** 「团队版 = 个人版的 10 倍」在这个样本里不成立。
- **真正放大收入的是最低席位、席位数量和企业 flat 合同。** Calendly Enterprise 50 席起、$15k/年，按席位折算 $25/席/月；Fathom 的 2 席起把最低月费从 $20 拉到 $38；Descript 的 5 人示例把 $24 拉到 $325。
- **per-seat 与 flat team plan 必须分开看。** 前者随人数线性增长，后者用版本门槛筛选预算。

组织客户的收入集中度（可核实的一家）：

| 事实 | 数值 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| Figma 2026 Q3 收入 | 3.914 亿美元，同比 +43% | [Figma 财报](https://investor.figma.com/news-events/news/news-details/2026/Figma-Announces-Third-Quarter-2026-Financial-Results/default.aspx)，2026-11-04 | A |
| Figma 毛利 | GAAP 80%，非 GAAP 82% | 同上 | A |
| Figma ARR > $10k 的付费客户 | 16,566 个（一年增加 3,650+） | 同上 | A |
| Figma ARR > $100k 的付费客户 | 1,717 个（一年增加 450+） | 同上 | A |
| 「>$10k ARR 客户贡献约 70% 总 ARR」 | — | 财报电话会转述，未读到原文 | B（仅二手） |

最后一行不能等同于「团队版收入占比」，它统计的是所有 ARR 超过 1 万美元的客户，含个人工作室。

### 3.2 微信生态：群主/社群/机构付费

| 对象 | 可核实的定价或规模 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 知识星球服务费 | 个人星球 20%；企业星球自然年内 ≤10 万部分 20%、>10 万部分 10%；另一档企业 10%/5% | [知识星球收费公示](https://www.zsxq.com/fee_publicity.html)，2026-11-06 | A |
| 知识星球支付通道费 | 微信支付 0.6%（个人）/1%（企业）；iOS IAP 27%；小程序虚拟支付 17% | 同上 | A |
| 知识星球单星球案例 | 洪灏 899 元/年，10 天 9,000+ 人，媒体估算约 800 万元 | [财联社转述](https://m.cnstock.com/commonDetail/582433)，2025-11-04 | B（媒体估算，非平台数据） |
| 小鹅通 2025 经营数据 | GMV 203.02 亿元（2024 年 209.74 亿元）；收入 6.08 亿元；毛利 4.6 亿元（约 75.7%）；关键客户 1,689 家、非关键 35,084 家 | [财联社引招股书](https://www.cls.cn/detail/2377150)，2026-05-20 | A/B（招股书经媒体） |
| 小鹅通单位经济 | 每客户获客成本从 9,264 元升至 13,771 元；关键客户净收入留存率 146.6%（2023）→100.2%（2025） | 同上 | A/B |
| 小鹅通定价 | 6,800 / 12,800 / 25,800 元/年；增席位 988 元/席/年 | [小鹅通定价页](https://www.xiaoe-tech.com/server_price/)，2026-11-06 | A |
| 群接龙收费 | 交易额 1% 服务费；团长主页 299 元/年；品牌主页 999 元/年；社群主页免费 | [群接龙帮助页](https://hao.qunjielong.com/10b2/8ad0/)，2022-06-23 | B（旧文档，现价未验证） |
| 快团团规模 | 官方页 2020 年 GMV 100 亿元、100 万团长；2022 年约 1,500 亿元（第三方引述） | [快团团官方页](https://ktt.pinduoduo.com/login/promote)（2020）；[36 氪](https://m.36kr.com/p/2500387666995457)（2023） | B/C |
| 腾讯问卷版本价 | 高级 2,499 元；商业 5,499 元；尊享 24,999 元；旗舰 80,000 元/年起 | [腾讯问卷](https://cloud.tencent.com.cn/product/survey)，2026-11-06 | A |

抽成率换算（C，推断）：小鹅通 2025 年收入 6.08 亿 / GMV 203.02 亿 ≈ 3.0%。这个数包含订阅费与交易相关费用，不等于单一抽成率，但可以作为「社群付费工具的 take rate 量级」。

关于「按群收费」：**没有找到任何按群年费的公开报价。** 群接龙的社群主页免费；知识星球按星球收费（本质接近按群，但定价权在星主）；小鹅通按版本 + 席位。找得到的收费结构是「平台抽成 + 版本包 + 按席位」三种。

### 3.3 把判断力/方法论做成可交付物

| 形态 | 可核实的价格与成本结构 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 咨询（项目制） | 36% 按项目定价；33% 收 $15K–50K/项目；29% 收 $5K–15K/项目 | [Consulting Success](https://www.consultingsuccess.com/100-tips-on-how-to-start-a-consulting-business)，2025 | B |
| 咨询（日费） | 日均 1,300 欧元（德国 2025） | [BDU](https://www.bdu.de/news/studie-honorare-im-consulting-2025-tagessaetze-leicht-ruecklaeufig/)，2025-12-15 | B |
| 咨询毛利 | 中位 36–40%；头部 55–60% | [NStar](https://nstarfinance.com/resources/consulting-firm-profitability-benchmarks)，2025 | B |
| 工作坊（报价样本） | $3,500/天；$1,750/半天 | [Somersault Consulting](https://somersaultconsulting.net/facilitation-services/)，未标日期 | C |
| Cohort 课程 | Maven 抽 10%，讲师留 90%（再减 Stripe）；课程价 $800–2,450；毛利率 65–80% | [Maven](https://maven.com/maven/course-accelerator)（2026）；[Miha Cacic 汇编](https://mihacacic.com/best/cohort-based-course-platforms/)（2026）；[AdvLaunch](https://advlaunch.us/blog/online-course-business-model)（2026） | A/B/C |
| 付费研究 | Trends Pro $25/月或 $299/年；CB Insights 合同中位 $46,984/年（不公开定价） | [Trends](https://access.trends.vc/)（2026）；[Investables 汇编](https://investables.ai/alternatives/cb-insights)（2026） | A/C |
| 模板 | Notion Marketplace 抽 8% + $0.40/笔；Gumroad 2020 中位 $70/年；某模板案例 6 个月 $180K（媒体） | [Notion 帮助](https://www.notion.com/help/selling-on-marketplace)（2026）；[Gumroad 数据](https://siliconflorist.com/2021/01/12/what-happened-in-the-gumroad-creator-community-in-2020/amp/)（2021）；[Mitechnews](https://mitechnews.com/guest-columns/chatgpt-claude-180k-notion-template-no-ads-no-team/)（2026） | A/B/C |
| 软件对照 | SaaS 毛利中位 75%；订阅 81%；Figma 82% | [SaaS 汇编](https://getaleph.com/answers/saas-gross-margin-2026)（2026）；[Benchmarkit 2025](https://www.benchmarkit.ai/2025benchmarks)；[Figma 财报](https://investor.figma.com/news-events/news/news-details/2026/Figma-Announces-Third-Quarter-2026-Financial-Results/default.aspx)（2026-11-04） | A/B |

可扩展性差异在同一张表里就能看到：

- 咨询与工作坊按天卖，交付成本随天线性增长；毛利 36–40% 意味着约 60–64% 的收入用于交付人时（推算 C）。
- Cohort 课程毛利 65–80%，但营收随「开一期」增长，不开课就没有收入；讲师时间不可复制。
- 付费研究（Trends、CB Insights）毛利接近软件，但内容更新仍需人；CB Insights 的合同价说明「研究订阅」可以做到企业级客单价，但没有公开毛利率。
- 模板与软件的边际复制成本接近零，毛利结构最好；但 Gumroad 的中位 $70/年说明这个市场大部分供给不赚钱。

### 3.4 这一节证明的机制

- 团队版的单席溢价小，收入倍数来自席位数量、最低席位与企业合同。把「个人版改个名卖团队版」不会自动涨价；涨价来自「按人头计费」和「企业采购门槛」。
- 组织付费的门槛不只在价格，还在合同主体、发票、账户与采购流程。这一条直接接第 4 节。
- 社群付费工具的收费结构是平台抽成（1%–20%）、版本包（6,800–80,000 元/年）、按席位（988 元/席/年）。没有找到按群年费，说明「群主」这个付款人没有被单独定价。
- 方法论交付的毛利上限低于软件，且不可脱离交付人扩展。能脱离人扩展的只有模板、付费研究这类「一次生产、多次复制」的形态。

---

## 4. 中国独立开发者特有的约束

### 4.1 小程序：主体、类目、备案、收费

| 条款 | 内容 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 个人主体虚拟支付 | 条件：个人主体、服务类目含「工具」、已完成认证与备案；月支付限额 10 万元；Android 等 1% 技术服务费，iOS 12%（Apple 佣金） | [微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/virtual-payment/person)，最后编辑 2026-09-07 | A |
| 主体双轨 | 企业/个体户版与个人版并列；企业版限企业、事业单位、个体工商户 | [虚拟支付文档](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/virtual-payment.html)，2026-09-14 | A |
| 个人可选类目 | 官方类目表分「非个人/个人」两套；个人只能选个人表。「商家自营-生鲜」「生活服务-休闲娱乐」等非个人类目不可选 | [类目文档](https://developers.weixin.qq.com/miniprogram/product/material.html)，2026-10-30 | B（个人表加载截断） |
| 服务商代开个人主体交易能力 | 服务商可代开发个人主体小程序，支持交易类服务与商品类目，可绑定微信支付特约商户号；非个人自助开通 | [微信开放文档](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/product/Register_Mini_Programs/fastregistertransactionweapp.html)，2026-11-04 | A |
| 备案 | 工信部 105 号：APP 含小程序须备案；存量 2023-09 至 2024-03 完成，新上线先备案；个人凭身份证可备案，个人主体上限 5 个 | [工信部通知](https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2023/art_920db564162e4312916a01bed6540ad8.html)（2023-08-04）；[微信备案 FAQ](https://developers.weixin.qq.com/miniprogram/product/record/record_faq.html) | A |
| 个人主体不能用 web-view | 「个人类型的小程序暂不支持使用」；个人不支持配置业务域名 | [web-view 文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)，未标日期 | A |
| 诱导分享 | 3.2.1：诱导分享/关注/下载、要求分享后才可操作、利益诱惑分享等会被拒绝 | [微信运营规范](https://developers.weixin.qq.com/miniprogram/product/reject)，2026-03-25 | A |

### 4.2 承接 B 端合同与开票

| 事实/条款 | 内容 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| 自然人可签合同 | 《民法典》第 464 条：合同是民事主体之间设立、变更、终止民事法律关系的协议 | [全国人大](http://www.npc.gov.cn/npc/c30834/202006/75ba6483b8344591abd07917e1d25cc8.shtml)，2021-01-01 施行 | A（条文）；自然人可订约为推断 |
| 自然人代开发票 | 自然人申请代开发票，提交身份证件及复印件；在办税厅申报缴税后领票 | [税务总局 2016 年 59 号](https://www.chinatax.gov.cn/chinatax/n810341/n810765/n1990035/201609/c2457949/content.html)，2016-11-15 施行 | A |
| 代开专票的限制 | 该公告未区分普票与专票；「自然人只能代开普票」未在本文核到原文 | — | 查不到（未核实） |
| 个体户登记 | 设立登记不收费；个体户承诺 1 个工作日、法定 6 日；凭营业执照开立单位银行结算账户 | [国家政务服务平台](https://gjzwfw.www.gov.cn/fwmh/item/v3/item_113405070924768145400013100400002.do)；[央行账户管理办法](https://www.gov.cn/zhengce/2003-04/10/content_5712738.htm)，2003-09-01 | A |
| 小规模纳税人起征点 | 2026-01-01 至 2027-12-31：月销售额 10 万元、季 30 万元；按次 1,000 元 | [财政部/税务总局 2026 年第 10 号](https://fgk.chinatax.gov.cn/zcfgk/c102416/c5247434/content.html)，2026-01-30 | A |
| 个体户经营所得 | 5%–35%；年应纳税所得额 ≤200 万元部分减半，至 2027-12-31 | [税务总局政策库](https://fgk.chinatax.gov.cn/zcfgk/c100024/c5237608/content.html)，2023-08-01 | A |

制度链条的事实：

- 自然人能签合同，也能代开发票；但代开是「自然人 → 税务机关 → 发票」，不是「公司 → 对公账户 → 专票」。
- 单位银行结算账户要凭营业执照；个体户可以开，自然人没有这条路径（账户管理办法 A + 推断）。
- 组织客户如果要求「对公转账 + 增值税专用发票 + 合同主体一致」，自然人的链条对不上；个体户/公司才对得上。这是制度事实，不是概率。

### 4.3 海外收款与主体

| 事实 | 内容 | 来源与日期 | 等级 |
| --- | --- | --- | --- |
| Apple 个人 vs 组织 | 个人/个体户/单人企业：App 以开发者个人姓名上架；组织：以法人实体名称上架，须提供 D-U-N-S；年费 99 美元 | [Apple 会员比较](https://developer.apple.com/support/compare-memberships/)，现行 | A |
| Apple 收款 | 需签 Paid Apps 协议、提交税务表（非美国税务居民用 W-8BEN/W-8BEN-E/W-8ECI）、银行信息 | [App Store Connect 税务帮助](https://developer.apple.com/help/app-store-connect/manage-tax-information/provide-tax-information)，现行 | A |
| Apple 小企业计划 | 符合条件的开发者佣金 15% | [Apple 小企业计划](https://developer.apple.com/app-store/small-business-program/)，现行 | A |
| Google Play 新个人账号测试 | 2023-11-13 后创建的个人账号，正式版前须封闭测试：至少 12 名测试者连续 14 天参与（2024-12-11 由 20 人降为 12 人） | [Google 帮助中心](https://support.google.com/googleplay/android-developer/answer/14151465)，2023-11-13 起 | B（原文抓取为空，数字经多个第三方一致转述） |
| Google Play 收款 | 售卖付费应用/内购须设置 Google 付款资料并关联账号 | [Android 开发者文档](https://developer.android.com/google/play/billing/getting-ready?hl=zh-CN)，现行 | B |

主体差异的实际影响：

- 海外商店的个人账号把「供应商名称」显示成个人姓名；组织账号显示法人名称。B 端客户在采购时看到的是这个名称。
- 国内自然人代开 + 个人银行账户，与「法人名称 + 对公账户 + 专票」不是同一链条。海外个人账号能收 App Store 的钱，不等于能以同一主体接国内 B 端合同。
- Google Play 的 12 人 14 天测试是新个人账号上架前的硬门槛；它对「先做小工具试水」的节奏有直接影响，但与 B 端合同无关。

### 4.4 这一节证明的机制

- 主体决定可收款方式。个人主体能收小程序虚拟支付，但有月限额 10 万元与 iOS 12% 的固定成本；不能 web-view，意味着不能把外部网页能力包进小程序。
- 组织客户的采购链条要求合同、账户、发票三者一致。自然人能签合同、能代开发票，但开不出对公账户；个体户可以。这条链条决定了「能不能接 B 端」，与产品能力无关。
- 海外商店的个人账号可以收款，但供应商名称是个人；组织账号要 D-U-N-S。两边的主体名称不一致时，B 端合同与商店收款无法共用同一个「公司」叙事。

---

## 5. 事实 / 推测 / 查不到

### 5.1 已经发生的事实（可核实）

- 2026-09，微信向个人主体开放「工具」类目虚拟支付，月限额 10 万元，Android 1%、iOS 12%，要求认证与备案（A）。
- 个人主体小程序仍不支持 web-view（A）。
- 2026-08-10，YouTube 宣布 2027-02-01 起新创作者门槛提高到 8,000 小时/365 天或 2,000 万 Shorts 播放/90 天（A）。
- 2018-01-16，YouTube 官方称被新门槛影响的频道中 99% 年收入不足 $100（A，2017 年数据）。
- 2026-11-04，Figma 公布 Q3 2026 收入 3.914 亿美元、ARR > $10k 客户 16,566 个（A）。
- 2025 年小鹅通 GMV 203.02 亿元、收入 6.08 亿元、关键客户 1,689 家（A/B，招股书经媒体）。
- 2005 年出生队列的美国私营 establishment，5 年生存率 52.6%、10 年 35.9%（A，BLS；不含非雇主自雇）。
- 2026-01-30，小规模纳税人月销售额 10 万元起征点延续到 2027-12-31（A）。
- 自然人可凭身份证代开发票（A，2016 年 59 号公告）。
- Apple 个人账号以个人姓名上架，组织账号须 D-U-N-S（A）。

### 5.2 对未来的推测（C，依赖假设）

- 「定制收入会挤出产品时间」在机制上成立（时间总量固定），但没有任何纵向数据。推翻它的证据应是：同一批人在接单期间产品迭代速度没有下降。
- 个人品牌从 0 到「稳定带来产品用户」的时间与内容量，现有「3 个月/6 个月/14 个月」是二手汇编，不是调查。推翻它的证据应是某个平台的官方 cohort 数据。
- 「团队版收入占比」无法从 Figma 的 >$10k ARR 客户数推出；财报没有按 plan 拆分。
- 中文市场「单人整包月收入 1.1–1.8 万元」是按指导价 × 22 天的算术，不含获客、返工、税。真实分布未知。
- 「社群付费工具的 take rate 约 3%」是小鹅通收入/GMV 的换算，含订阅费与交易费，不是单一抽成率。

### 5.3 查不到（明确缺失）

见第 6 节。

---

## 6. 查不到清单

1. **做过 B 端定制的独立开发者中，后来做出自己产品的比例。** 没有有样本的调查；MicroConf 样本存在选择偏差。
2. **「定制收入让产品开发永久推迟」的纵向数据。** 没有追踪研究，也不能用个案替代。
3. **自由职业者/单人定制的退出率。** BLS 表 7 只统计有雇员的 establishment，不含非雇主自雇。
4. **单人定制的每周工时与月收入分布。** 2025–2026 没有样本统计；本文的月收入是算术推断。
5. **中文平台的真实成交价。** 猿急送给的是指导价，猪八戒/程序员客栈给的是标价；没有成交数据库。
6. **定制 → 产品的转化周期分布。** 只有 2–3 个案例时间线（1 年、5 年、11 年）。
7. **从 0 开始做内容到「稳定带来产品用户」的时间、内容量、平台级转化率。** 平台不披露；现有数字来自二手汇编。
8. **「发一年内容仍接近零增长」的官方比例。** YouTube、Substack、小红书均不公布活跃账号分母。
9. **Substack 的零收入比例与中位收入。** 官方页未打开；「12% 有付费收入」「中位 850 美元」只见转引。
10. **爆款 → 付费的第三方留存数据。** 只有创作者自述（0.1% 免费→付费、ShipFast 首发 $40k→现 $1.7k/月）。
11. **个人主体虚拟支付的独立生效公告与确切生效日。** 只找到文档「最后编辑 2026-09-07」，没有单独公告。
12. **自然人代开增值税专用发票的限制原文。** 2016 年 59 号公告未区分普票/专票；「只能代开普票」未核到原文。
13. **个人开发者转为企业主体的比例与成本。** 无官方统计；工信部 2022 年一季度只公布开发者构成（101.5 万，其中企业 28.9 万、团队/个人 72.5 万），不是转化率。
14. **微信群主工具的 ARPU、续费率、按群年费报价。** 群接龙社群主页免费；没有找到按群年费。
15. **知识星球的付费星球总数、平台 GMV、续费率。** 只有收费公示与单星球媒体估算。
16. **快团团的当前 GMV 与货币化方式。** 官方页仍是 2020 年数据；2022 年数字来自第三方。
17. **Canva 与 Descript 的官方定价原文。** Canva 被 Cloudflare 拦截；Descript 价格由 JS 渲染，未读到数字。
18. **Figma 按 plan 的收入拆分。** 财报只给客户数分档与总收入，没有个人版/团队版占比。
19. **产品化服务（Designjoy 类）的独立毛利率。** 只有自述的规模，没有经审计的毛利。
20. **Ali Abdaal 的 VoicePal 下载、付费、留存。** 没有公开数字。

---

## 7. 方法说明与局限

- 价格与政策在 2026-11-06 读取。平台价格会变，政策文档会更新；引用时要回到原页核对。
- A 级里也有口径差异：BLS 不含非雇主自雇；Upwork 的 $85,000 是「仅靠自由职业收入」的中位；Clutch 是公司口径，不是单人净收入。这些差异在表里已标注。
- B 级多数是「一手数据经二手转述」。能打开原文的已尽量打开；打不开的写了「未能打开原文」。
- C 级包括创作者自述与本文的算术换算。算术用的假设都写在句子里（22 天、8 小时、7.1 汇率、160 小时/月）。
- 这份文件不包含内部数据（产品收入、用户数、留存）。凡是需要「把外部基准套到 Will 的实际情况」的推导，都不在这里做。
- 与既有文档的关系：本文只补外部事实，不评价 `will-opc-*.md`、`external-future-signals.md` 的结论；也不重复它们已经写过的平台政策与产品层判断。路径对照、情景推演、内容试验的分配留给对应文档。
