# 三个产品、存量项与分发

> 主题文档 2/3。回答「三个产品现在是什么状态、它们为什么都不产生可结转的人、分发该怎么做」。
> 判断状态以 [论点台账](decision-ledger.md) 的 K 编号为准。
> 原文出处：`archive/will-opc-diagnosis-2026-11.md`、`archive/will-opc-first-principles.md`、`archive/will-opc-content-experiment.md`、`archive/will-opc-creator-cases.md`、`archive/external-future-signals.md`、`archive/will-opc-opc-definition.md`（附论 G/H）。

---

## 1. 三个产品的现状（2026-11-06）

| | Huddle（泡泡留言板） | Tablow | Yipa |
| --- | --- | --- | --- |
| 平台 | 微信小程序（个人主体类型未核实） | App Store + Google Play | App Store + Google Play，已上架 |
| 收费 | ¥9.9 基础档，另有 Plus/Pro/Large；核心刻度 `maxOwnedSpaces` = 3/10/30/100 | $2 一次性买断 | 订阅制（价格未核实） |
| 付款人 | 为「关系空间」付费的微信用户 | 为「记住一个日期」一次性付费的海外用户 | 未定义 |
| 存量项 | 有：会员续费 + 分享带新；每月自然 1–2 个付费 | **为零**：买断，无续费、无账号、无推送 | 结构上大概率也为零：本地优先、无强制账号、AI 可选 |
| 当前判断 | 低强度维护 + 一个针对性实验 | 维护；是否独立存在待用户拍板 | 完成新版发布，4–8 周内不扩功能 |

上述 Huddle 档位与「按空间计价」是**用户陈述的现状（F）**，本仓库与可访问环境无法独立核实（[K102](decision-ledger.md#k102)）。其余「查不到」的项保持查不到，不填估算。

---

## 2. 收入恒等式与三产品代入

```
收入_t = 新客 × 转化 × 单价  +  存量_{t-1} × 留存 × 单价
         └──── 流量项 ────┘     └──── 存量项 ────┘
```

复利只存在于第二项。第一项是「用工时换钱」，第二项才是「用资产换钱」（[K96](decision-ledger.md#k96)）。

**Huddle 的量级**：要在 ¥9.9 档做到 ¥5,000/月，需要约 505 个在订会员；按每月 1.5 人累积、零流失，需要约 337 个月（[K97](decision-ledger.md#k97)）。这不是预测，是说明「窄而慢」的量级差。

**Tablow**：存量项结构为零。买断产品没有续费；无账号、无推送意味着没有再触达（[K98](decision-ledger.md#k98)、[K93](decision-ledger.md#k93)）。

**Yipa**：如果仍是「本地优先 + 无强制账号 + AI 可选」，结构上同样没有存量项；付费、留存、下载全部不可观测（[K99](decision-ledger.md#k99)）。

**结论**：三款产品缺的是同一项——**可结转的人**（[K100](decision-ledger.md#k100)）。Huddle 的产品复利窄而不外溢，受微信生态、熟人群规模、¥9.9 ARPU、无跨产品迁移四件事约束（[K101](decision-ledger.md#k101)）。

---

## 3. 产品组合的前置问题

**问题**：Tablow 是否继续独立存在，还是并入 Yipa？

**现在采用**：先完成 Yipa 发布，发布后 4–8 周内不做合并决定；用这段时间看 Yipa 的真实留存与 Tablow 的商店表现（[K105](decision-ledger.md#k105)）。

**理由**：

- 合并会同时改动两个产品的叙事、商店身份与用户承诺，属于不可逆动作（[K95](decision-ledger.md#k95)）。
- 当前缺的是留存/复访数据，不是「合并方案」；先有数据再改配置，避免把「产品数量」继续当替罪羊（[K107](decision-ledger.md#k107)）。
- Yipa 已把 Tablow 的基础记录并入；两产品的功能边界已经部分重叠，合并的技术成本低于过去（`archive/will-opc-diagnosis-2026-11.md#L59-L67`）。

**曾考虑（未采用）**：立即合并，理由是省维护。未采用的原因：维护成本本来就低，合并带来的叙事风险与商店身份风险远大于省下的时间。

---

## 4. 分发：三种机制，只有一种能结转

| 机制 | 实际作用 | 能否结转 | 现状 |
| --- | --- | --- | --- |
| 商店/ASO | 承接已有认知，收口 | 弱：排名是租约，规则会变 | 自然流量正在降级为收口渠道（[K20](decision-ledger.md#k20)） |
| 内容/社媒 | 制造偶遇，建立「判断值得看」的信任 | 不直接结转；只能经承接物转成名单 | 复利从未开始（[K108](decision-ledger.md#k108)） |
| 产品内自传播 | 分享带新，产品复利 | 可结转，但受产品形态约束 | Huddle 有；Tablow 没有；Yipa 未验证（[K25](decision-ledger.md#k25)） |

**判断**：分发端的真正缺口不是「写作产量」，而是**承接物**——一个让偶遇的人留下可再次联系方式的入口（[K109](decision-ledger.md#k109)）。

> 承接物为 0 时，宣发乘数再大，结果也是 0（[K120](decision-ledger.md#k120)）。

---

## 5. 内容实验：定位与判定

**实验配置**（[K114](decision-ledger.md#k114)–[K117](decision-ledger.md#k117)）：

- 主平台 Threads；X/Instagram/Facebook 只做分发与对照。
- 6 小时/周，四周 24 小时封顶；用尽即停，不延期、不借用产品时间（[K115](decision-ledger.md#k115)、[K175](decision-ledger.md#k175)）。
- 五条全满足才算「通过」：渠道愿意分发、链路能通、有真实互动、有可归因点击、没有伤害主产品（[K116](decision-ledger.md#k116)）。
- 「通过」只说明渠道能分发、链路能通，**不说明内容有效**（[K113](decision-ledger.md#k113)）。

**判定规则**（[K172](decision-ledger.md#k172)）：通过 / 内容成立但承接不成立 / 渠道无效 / 表达待改 / 受众错配 / 未判定。未判定必须写清哪一环没发生。

**被推翻的旧判据**：4 周「通过」= 内容有效。4 周只能判可见性；完整反馈周期远长于判断周期（[K112](decision-ledger.md#k112)）。

**必须补测的一项**：存量捕获率 = 每 100 次到达里，有多少人变成可再次触达（[K111](decision-ledger.md#k111)）。现有实验没有测这个数。

---

## 6. 受众、影响力与「受众→产品」的真实机制

来自 creator-cases 的可核实归纳（只作机制清单，不作基准率）：

- 可核实的转移是「已有付费关系 + 课程/社群 + 同一使用场景」，不是免费受众规模（[K121](decision-ledger.md#k121)）。
- 影响力至少四层：触达、付费关系、方法可信、社区归属；只有后三层有跨产品转移证据（[K122](decision-ledger.md#k122)）。
- 没有一例显示受众规模可以单独预测产品成功（[K123](decision-ledger.md#k123)）。
- 七种路径机制（邮件名单、课程/社群、内容工具化、内测、折扣、社区迁移、平台注意力）只是清单，没有统计（[K124](decision-ledger.md#k124)）。

**对 Will.OPC 的直接含义**：把「涨粉」当目标没有证据支持；把「付费关系 + 同场景」当目标才有。内容的作用是让人记住判断，不是直接卖工具（[K44](decision-ledger.md#k44)、[K45](decision-ledger.md#k45)）。

---

## 7. 本文件里已被推翻或不再适用的判断

- [K45](decision-ledger.md#k45)：P2「信任可跨品类迁移」作为判死依据 —— 条件成立/不可判定，不能单独判死。
- [K57](decision-ledger.md#k57)：3 产品 × 2 市场 = 6 条队列，产品组合是负杠杆 —— 已被推翻。
- [K69](decision-ledger.md#k69)、[K145](decision-ledger.md#k145)、[K149](decision-ledger.md#k149)：Huddle 有付款所以给 90% 时间 / 选 A —— 已被推翻。
- [K70](decision-ledger.md#k70)、[K151](decision-ledger.md#k151)：Yipa 暂缓 —— 已被推翻（已上架）。
- [K107](decision-ledger.md#k107)：三个产品并行导致验证不足 —— 已被推翻。
- [K112](decision-ledger.md#k112)：4 周通过 = 内容有效 —— 已被推翻。
- [K125](decision-ledger.md#k125)：自媒体是偶遇渠道、不是资产 —— 已被推翻（部分）。
- [K144](decision-ledger.md#k144)：复利断在 P4 —— 已被推翻。
- [K164](decision-ledger.md#k164)：90% 给 Huddle / Tablow 只维护 / Yipa 暂缓 —— 已被推翻。
- [K170](decision-ledger.md#k170)：Huddle 应对主持人按空间计费（作为新建议）—— 已被推翻（按空间计价是现状）。
