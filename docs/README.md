# now/docs 唯一入口

> 这个目录里所有研究文档的入口。先读这一页，再按问题去读三份主题文档；需要逐条查某个判断还算不算数，去 [论点台账](decision-ledger.md)。
> 原文全部保留在 [`archive/`](archive/)，没有删除；被推翻的句子在台账里有状态与替代判断。

---

## 决策摘要（给三个月后重新打开这个目录的人）

**现在只做一件事：建立「可再次触达的承接物」，并把它放在所有动作之前。**

依据：三款产品缺的是同一项——可结转的人。Tablow 的存量项为零；Huddle 的存量按每月约 1.5 人累积，年化约 ¥178；Yipa 结构上大概率也为零。分发复利从未开始，产品复利只在 Huddle 内部窄幅运转。内容、宣发、B 端定制都只作用于流量项；承接物为 0 时，乘数再大也是 0。

做什么：在 now 站与产品成交路径上各加一个「留下可再次联系的方式」的入口，单独计数。定义**存量捕获率** = 每 100 次到达里，有多少人变成可再次触达（订阅、付费、主动留联系方式）。

判定：8 周内该比率 > 0，且连续 8 周周增 ≥5%，才允许把内容时间从 6 小时/周加到 10 小时；比率 = 0 时停止扩量，改测承接物，不换平台。截止 **2027-01-01**。到期仍为 0，结论是「当前承接物不成立」，不是「内容无效」。

必须由用户提供或决定：

1. 导出 Huddle 后台 8 组数据：空间数分布、各档触顶率与 30 天升级率、30 天内第二成员/第一条内容、成员数分布、转让与管理员使用率及 90 天留存、多空间成员重叠度、付费 owner 空间数与续费关系、客服扩容/开票记录。
2. 拍板 Tablow 是否继续独立存在，还是并入 Yipa。
3. 给出每周可用小时数——所有「值不值」的判断缺这个分母。
4. 决定是否接受 T2 型交付（面对陌生人销售、交付物前置）；不接受则该候选降为「曾考虑」。

这 8 周内不开新动作：不换平台、不加量、不做 B 端报价、不改名、不合并、不下架。

---

## 按问题分组

| 问题 | 先读 | 再查 |
| --- | --- | --- |
| 环境与外部约束 | [opc-foundations.md §5](opc-foundations.md#5-外部约束截至-2026-11-06) | 台账 K01–K32 |
| OPC 的定义与类型 | [opc-foundations.md §1–4](opc-foundations.md#1-定义与判据) | 台账 K33–K85 |
| 三个产品的现状与判断 | [products-and-distribution.md §1–3](products-and-distribution.md#1-三个产品的现状2026-11-06) | 台账 K86–K107 |
| 分发与获客 | [products-and-distribution.md §4–6](products-and-distribution.md#4-分发三种机制只有一种能结转) | 台账 K108–K130 |
| 路径选择 | [paths-and-execution.md §1–5](paths-and-execution.md#1-三条路径与当前选择) | 台账 K131–K155 |
| 执行方案与判定规则 | [paths-and-execution.md §6](paths-and-execution.md#6-执行规则可直接照做) | 台账 K156–K176 |
| 历史与已废弃 | 本节下方「历史指针」 | `archive/` 原文 |

### 历史指针（只放指针，不再维护）

- **`archive/will-opc-roadmap-2026-11.md`**：A/B/C 三选一路线与「90% 给 Huddle / Yipa 暂缓」。**已不再权威**，被 `will-opc-diagnosis-2026-11.md` 清算；结论已作废，只保留推导过程与「一年内不该做的事」中仍成立的部分。
- **`archive/will-opc-opc-definition.md` 的 T5 唯一条件、附论 G/H**：T5 的「身份=买家是唯一条件」已被推翻；G 的「逆选择」已因 Yipa 改版失效；H 的「AI 流失快 30%」只能外推。定义与平台事实仍然有效。
- **`archive/will-opc-path-comparison-2026-11.md` 的「按空间计价是新建议」**：已撤回；按空间计价是 Huddle 的现行机制，不是待提出的方案。修订块保留在 §0/§1。
- **`archive/will-opc-strategy-review.md` 的「$2 代表整个方案」**：已推翻，只适用 Tablow。

---

## 文档清单

| 文档 | 回答什么问题 | 是否仍为权威 | 被谁取代/补充 |
| --- | --- | --- | --- |
| [decision-ledger.md](decision-ledger.md) | 每一条判断现在是什么状态、出处、以哪条为准 | **是**，唯一状态权威 | — |
| [opc-foundations.md](opc-foundations.md) | OPC 是什么、有哪几类、AI 改变了什么、外部允许什么 | **是**，定义与环境权威 | 吸收 opc-definition / strategy-review / positioning / direction-research / external-future-signals |
| [products-and-distribution.md](products-and-distribution.md) | 三产品现状、为什么没有存量项、分发怎么做 | **是**，产品与分发权威 | 吸收 diagnosis / first-principles / content-experiment / creator-cases |
| [paths-and-execution.md](paths-and-execution.md) | 有哪几条路、先做哪条、怎么判定继续或停 | **是**，路径与执行权威 | 吸收 roadmap / diagnosis / first-principles / scenarios / path-comparison / external-b2b |
| [archive/](archive/) | 原文与推导过程 | 否；只作证据与追溯 | 由以上四份归并 |
| `analytics.md` / `project-covers.md` / `writing-guide.md` | 站点运营与写作规范 | 是，与本套研究无关 | — |

---

## Archive 映射表

原文件 → 现在归到哪里 → 对应台账编号。原文未删除、未改动；需要逐句追溯时按行号回看。

| 原文件 | 回答什么问题 | 权威性 | 被谁取代 | 现在归到 | 台账 |
| --- | --- | --- | --- | --- | --- |
| `will-opc-strategy-review.md` | 2026 平台/内容/分发环境；个人品牌样本；$2 单位经济 | 外部事实仍权威；方案级结论部分被推翻 | opc-foundations §5 / products §4（外部事实保留） | opc-foundations §5；products §4 | K01–K18 |
| `will-opc-positioning.md` | 定位：观察者、独立判断、垂直在视角 | 品牌定位仍权威；双轨执行论被推翻 | opc-foundations（定位原则保留） | opc-foundations §1、§4、§6 | K71–K75 |
| `will-opc-direction-research.md` | 五个方向与付款人结构 | 机制仍权威；「无方向成立」已条件化 | opc-foundations §2（方向判断保留） | opc-foundations §2；paths §1 | K76–K85 |
| `will-opc-opc-definition.md` | OPC 定义、五类型、结构冲突、附论 G/H | 定义与平台事实权威；T5 唯一条件与 G/H 部分被推翻 | opc-foundations（定义保留） | opc-foundations §1–4；products §4 | K33–K54、K170 |
| `will-opc-roadmap-2026-11.md` | A/B/C 路线；90% Huddle；Yipa 暂缓 | **已不再权威** | 被 `will-opc-diagnosis-2026-11.md` 明确取代 | 历史指针；paths §1、§7 | K144–K153 |
| `will-opc-diagnosis-2026-11.md` | 对 roadmap 的清算；四层诊断；六问 | 诊断框架仍权威 | products / paths 归并（框架保留） | products §1–3；paths §6 | K105–K108、K143–K155 |
| `will-opc-creator-cases.md` | 受众→产品的可核实案例 | 证据仍权威（A 档归纳） | products §6 归并（证据保留） | products §6 | K121–K124 |
| `will-opc-content-experiment.md` | 四周内容实验配置与判定 | 配置仍权威；「通过=有效」被推翻 | products §5 归并（配置保留） | products §5 | K112–K117、K172 |
| `will-opc-first-principles.md` | 不变量、收入恒等式、新形态 N | **最权威的推导层** | 三份主题文档归并（推导层最权威） | opc-foundations §1–2；products §2；paths §4、§6 | K61–K100、K168 |
| `will-opc-scenarios-2026-11.md` | 时间尺度、三情景、鲁棒动作、阻断规则 | 仍权威（R） | paths §5–6 归并 | paths §5–6 | K156–K169 |
| `will-opc-path-comparison-2026-11.md` | 三路径比较、30 天检验、Huddle 四问 | 仍权威；「按空间计价是新建议」已修订 | paths §1–4、§6 归并 | paths §1–4、§6 | K131–K142 |
| `external-future-signals.md` | 2026–2027 外部信号与 9 个领先指标 | 条件权威（C 类推测） | opc-foundations §5 / products §4 归并 | opc-foundations §5；products §4 | K19–K25 |
| `external-b2b-and-launch-evidence.md` | B 端单位经济、上架门槛、主体/发票约束 | 事实权威 | paths §2 / opc-foundations §5 归并 | paths §2；opc-foundations §5 | K26–K32 |

---

## 使用规则

1. **任何「结论」先查台账状态**。成立/条件成立才可用；已被推翻、已过期不得再引用；待验证只能写成假设。
2. **同一问题只保留一个结论**。主题文档里的「曾考虑」是降级记录，不是备选方案。
3. **改动规则**：新增判断先加台账行；推翻旧判断时，在台账改状态并指向替代条，同时在该主题文档末尾登记；原文不动。
4. **事实冲突不裁决**：台账末尾「未裁决的事实冲突」只记录，等用户提供数据或明确拍板。
