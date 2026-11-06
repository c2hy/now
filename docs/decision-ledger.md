# 论点台账（Decision Ledger）

> 覆盖 `docs/archive/` 下全部 13 份 `will-opc-*` 与 `external-*` 原文中出现过的**判断**。按问题归并，不按时间排序；重复出现的同一判断合并为一条，出处列多处。
> 本台账只整理既有内容，不重新检索；文档之间的事实冲突只记录、不裁决（见文末「未裁决的事实冲突」）。
> 出处格式：`archive/文件名#L起-L止`；行号对应原文当前版本。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| **成立** | 在当前事实与推导下仍然可用，无需附加条件。 |
| **条件成立** | 方向可用，但只在写明的条件下成立；条件不满足时不能当结论用。 |
| **已被推翻** | 前提或结论已被后续文档、后续事实或自身审计否定；不能再用。 |
| **待验证** | 判断本身可成立，但缺一个具体证据才能定论；表中写明缺什么。 |
| **已过期** | 事实前提已变化，原句作为事实陈述不再为真；判断可能仍有余留价值。 |

证据标记沿用原文：**D** 推导、**E** 经验数字、**A** 类比、**F** 给定事实、**R** 决策规则、**U** 不可观测。
注意 `creator-cases` 自用一套等级（A=官方可核实、B=当事人自述、C=单一叙事、D=查不到）；其中的 **D 是「查不到」，不是「推导」**，引用时已换算。

---

## 来源映射

原文全部在 `docs/archive/`，未删除、未改动；下表说明每份原文归到哪份主题文档、对应哪些台账编号。

| 原文件 | 现在归到 | 台账编号 |
| --- | --- | --- |
| `archive/will-opc-strategy-review.md` | `opc-foundations.md` §5；`products-and-distribution.md` §4 | K01–K18 |
| `archive/will-opc-positioning.md` | `opc-foundations.md` §1、§4、§6 | K71–K75 |
| `archive/will-opc-direction-research.md` | `opc-foundations.md` §2；`paths-and-execution.md` §1 | K76–K85 |
| `archive/will-opc-opc-definition.md` | `opc-foundations.md` §1–4；`products-and-distribution.md` §4 | K33–K54、K170 |
| `archive/will-opc-roadmap-2026-11.md` | `paths-and-execution.md` §1、§7；入口「历史指针」 | K144–K153 |
| `archive/will-opc-diagnosis-2026-11.md` | `products-and-distribution.md` §1–3；`paths-and-execution.md` §6 | K105–K108、K143–K155 |
| `archive/will-opc-creator-cases.md` | `products-and-distribution.md` §6 | K121–K124 |
| `archive/will-opc-content-experiment.md` | `products-and-distribution.md` §5 | K112–K117、K172 |
| `archive/will-opc-first-principles.md` | `opc-foundations.md` §1–2；`products-and-distribution.md` §2；`paths-and-execution.md` §4、§6 | K61–K100、K168 |
| `archive/will-opc-scenarios-2026-11.md` | `paths-and-execution.md` §5–6 | K156–K169 |
| `archive/will-opc-path-comparison-2026-11.md` | `paths-and-execution.md` §1–4、§6 | K131–K142 |
| `archive/external-future-signals.md` | `opc-foundations.md` §5；`products-and-distribution.md` §4 | K19–K25 |
| `archive/external-b2b-and-launch-evidence.md` | `paths-and-execution.md` §2；`opc-foundations.md` §5 | K26–K32 |

---

## A. 环境与外部约束（K01–K32）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K01 | 可抓取网页约 24% 含 AI 生成或编辑文本，内容供给已通胀 | 成立（E，2026-08 预印本） | `archive/will-opc-strategy-review.md#L14` | 本条；只作方向证据，精确值需按期复核 |
| K02 | 平台会识别并降权 AI 内容 | 条件成立：取决于平台当期政策与执行力度 | `archive/will-opc-strategy-review.md#L24` | 本条；按平台后台实测复核，不当作长期定律 |
| K03 | Instagram 静态图触达下降、Reels 上升、Threads 月活超过 X | 条件成立：截至 2026-11-06 的平台数据，会变 | `archive/will-opc-strategy-review.md#L34` | 本条，标注日期使用 |
| K04 | iOS 非游戏 CPI 约 $4.50，而 $2 产品到手约 $1.70，买量不可能 | 条件成立：只对 Tablow 这类一次性低价品成立 | `archive/will-opc-strategy-review.md#L57`；`#L443` | K05；Yipa 不套用此算术 |
| K05 | $2 一次性买断的单位经济在低价区间最脆弱 | 条件成立：仅 Tablow 及同类一次性低价品 | `archive/will-opc-strategy-review.md#L175`；`#L440` | 本条；不能升级为方案级结论 |
| K06 | $2 的单位经济可以代表整个 Will.OPC 方案 | 已被推翻（被附录 B 自改：只适用 Tablow） | `archive/will-opc-strategy-review.md#L440-L454` | K05；Yipa 按订阅口径另算 |
| K07 | 1000 true fans 的原始论证已被原作者自己修正 | 成立 | `archive/will-opc-strategy-review.md#L97` | 本条 |
| K08 | owned audience 被拥有的是「通道」，不是「网站」 | 成立 | `archive/will-opc-strategy-review.md#L107` | 本条；网站只有存档权，没有推送权 |
| K09 | newsletter → 产品的成功样本大多卖给同一批读者 | 条件成立：是案例归纳，非常态比例 | `archive/will-opc-strategy-review.md#L116` | 本条；不作因果保证 |
| K10 | build in public 的收益在 2025–2026 已发生反转 | 条件成立：E+A，平台环境继续变化 | `archive/will-opc-strategy-review.md#L124` | 本条 |
| K11 | audience ≠ customers，有量化证据且方向一致 | 成立（E） | `archive/will-opc-strategy-review.md#L133` | 本条 |
| K12 | 个人品牌 → 多产品的幸存者，几乎都卖给同一批受众 | 条件成立：A 档归纳，幸存者偏差明显 | `archive/will-opc-strategy-review.md#L141` | 本条；不能反推「必须先有受众」 |
| K13 | 平台死亡是常态；赛马是保险，但保险有保费 | 成立 | `archive/will-opc-strategy-review.md#L151` | 本条 |
| K14 | 长期被讨论的作者，机制是「可复用物」，不是「写得好」 | 条件成立：A 档归纳 | `archive/will-opc-strategy-review.md#L160` | 本条 |
| K15 | 30 天 53 个新用户只证明链路不是零，不证明可重复、可放大 | 成立 | `archive/will-opc-strategy-review.md#L184`；`#L232-L246` | 本条 |
| K16 | 「owned memory」不等于「owned audience」 | 成立 | `archive/will-opc-strategy-review.md#L248` | 本条；网站承担理解，不承担触达 |
| K17 | 双轨「必须同时存在」 | 已被推翻（作为执行前提）：历史样本是先单引擎再双轨；一个人同时只能维持一种「必须每周出现」的义务 | `archive/will-opc-strategy-review.md#L258`；`archive/will-opc-scenarios-2026-11.md#L33-L50` | K17′：同一时间一个主复利、一个副复利，第三个默认不投入（`archive/will-opc-diagnosis-2026-11.md#L143`） |
| K18 | 「赛马」的成本没有被计入 | 成立 | `archive/will-opc-strategy-review.md#L264` | 本条；赛马是风险对冲，代价是边际质量与归因清晰度 |
| K19 | AI 内置化先打单点功能，Tablow 最先失效 | 条件成立：C 类推测，取决于系统功能清单 | `archive/external-future-signals.md#L17-L81` | 本条；以 WWDC / I/O 功能清单作早期信号 |
| K20 | 商店自然流量从获客渠道降级为「承接已有认知的收口渠道」 | 条件成立：C 类推测，商店广告化与 AI 摘要继续加深 | `archive/external-future-signals.md#L114` | 本条；ASO 只做维护性优化 |
| K21 | 站点应从「流量入口」改成「信任与转化页面」 | 成立 | `archive/external-future-signals.md#L120` | 本条；与 K109 的承接物一致 |
| K22 | 产品内自传播 + 个人品牌相对升值 | 条件成立：慢、难测量；外部环境只是让另外两条路变窄 | `archive/external-future-signals.md#L124` | 本条 |
| K23 | 一次性买断收入占比低且在下降 | 条件成立：二手口径冲突（9.8% vs <1%），只取方向 | `archive/external-future-signals.md#L284` | 本条；不采用具体数值 |
| K24 | 未来 6–12 个月有 9 个可观察的领先指标 | 成立（R，观察清单） | `archive/external-future-signals.md#L265-L277` | 本条 |
| K25 | 决定这套模式生死的是「产品内部有没有不用花钱就能重复发生的获客动作」 | 成立 | `archive/external-future-signals.md#L303` | 本条；Huddle 有，Tablow 没有，Yipa 未验证 |
| K26 | 个人主体虚拟支付：月限额 10 万元、Android 1%、iOS 12%、个人不支持 web-view | 成立（A，平台文档） | `archive/external-b2b-and-launch-evidence.md#L271-L276` | 本条；Huddle 主体类型未核实，不能写成既成路径 |
| K27 | 自然人可签合同、可代开发票，但没有对公账户；组织客户要求合同/账户/发票三者一致 | 成立（A + 推断） | `archive/external-b2b-and-launch-evidence.md#L292-L294` | 本条；决定能不能接 B 端，与产品能力无关 |
| K28 | B 端定制的收入上限由可计费小时决定 | 成立（算术，C 推断） | `archive/external-b2b-and-launch-evidence.md#L15` | 本条；单人整包月收入约 1.1–1.8 万元（中国指导价口径） |
| K29 | 服务段毛利中位约 30%，订阅毛利中位约 81% | 成立（E） | `archive/external-b2b-and-launch-evidence.md#L16` | 本条 |
| K30 | 团队版单席溢价中位约 2 倍；收入倍数来自席位数量、最低席位与企业合同 | 成立（A） | `archive/external-b2b-and-launch-evidence.md#L21`、`#L258` | 本条；「个人版改名卖团队版」不会自动涨价 |
| K31 | 微信生态社群付费是「平台抽成 + 版本包 + 按席位」，不是「按群卖」 | 成立（E） | `archive/external-b2b-and-launch-evidence.md#L23`、`#L260` | 本条；没有找到按群年费，说明「群主」未被单独定价 |
| K32 | 「做定制的人后来做出产品」有路径，没有比例 | 成立（查不到有样本的转化率） | `archive/external-b2b-and-launch-evidence.md#L17` | 本条；只可用时间线类比，不可当基准率 |

---

## B. OPC 的定义与类型（K33–K85）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K33 | AI 把 OPC 的瓶颈从生产移到验证 | 成立（D） | `archive/will-opc-opc-definition.md#L15` | 本条；被 `first-principles` 收入恒等式证实 |
| K34 | OPC 判据 = 一人承担全部判断与风险 + 拥有一项不随小时线性计价的可复用资产 | 成立（定义 D） | `archive/will-opc-opc-definition.md#L19`、`#L37-L46` | 本条 |
| K35 | AI 消除的主要是生产成本，不是验证成本 | 成立（D） | `archive/will-opc-opc-definition.md#L21`、`#L127` | 本条 |
| K36 | 验证成本没有下降，反而因供给变多而上升 | 条件成立：方向由 D 推出；幅度依赖 E 档且未复测 | `archive/will-opc-opc-definition.md#L23` | 本条；只写方向，不写倍数 |
| K37 | AI 没有降低分发与信任的边际成本 | 条件成立：分发**素材**成本降了，分发**结果**成本没降；信任建立没降、维持可能上升 | `archive/will-opc-opc-definition.md#L25`、`#L140-L145` | K37′：按 `#L145` 的修正版表述使用 |
| K38 | AI 之后 T2 受益最大、T1 更难、T3 中位数更差、T4 仍受制于人 | 条件成立：T2 是单例（Designjoy），T3 是分布数据；品类级强度不对等 | `archive/will-opc-opc-definition.md#L90-L100` | 本条；只作方向，不作精确排序 |
| K39 | Will.OPC 是 T5 混合型，缺「读者身份 = 买家身份」 | 条件成立：身份不是唯一条件，改为「同使用场景 + 同付款理由」 | `archive/will-opc-opc-definition.md#L29`、`#L200-L212` | K63 |
| K40 | T5 只有「读者身份 = 买家身份」才成立 | 已被推翻（A 档 n≈5 被写成结构定律；正确 D 版是共享场景与付款理由） | `archive/will-opc-opc-definition.md#L83`、`#L98`、`#L210`；`archive/will-opc-first-principles.md#L105-L106` | K63 |
| K41 | AI 之后真正「变强」的是 T2（关系服务型） | 条件成立：单例 Designjoy；方向成立，强度有限 | `archive/will-opc-opc-definition.md#L100` | 本条；不改写成「T2 最好」 |
| K42 | OPC 能防御的位置只有三种：拥有分发、拥有关系/信任、拥有不可复制的数据或技术 | 成立（D） | `archive/will-opc-opc-definition.md#L179-L185` | 本条 |
| K43 | Tablow / Yipa 是 T1；Huddle 在 T1 与 T2 之间，且有四档付费层 | 成立（2026-11-05 修订后） | `archive/will-opc-opc-definition.md#L204-L206` | 本条；「没有付费层」的旧句作废 |
| K44 | P1：内容能建立「判断值得看」的信任，不建立「工具值得买」的信任 | 条件成立：D+A，「部分成立」的强度靠案例 | `archive/will-opc-opc-definition.md#L227` | 本条 |
| K45 | P2：信任可以跨品类迁移到产品购买 | 条件成立：只在读者与买家同场景时成立；跨品类不成立未被随机样本证实（A 档 n≈4，不可判定） | `archive/will-opc-opc-definition.md#L228`；`archive/will-opc-first-principles.md#L102-L103` | K63；P2 不能作为判死整条方案的唯一依据 |
| K46 | P3：产品能自己形成获客/留存/收入 | 条件成立：不能形成规模，但不是零（Huddle 有分享带新，Tablow 社媒曾带来新增） | `archive/will-opc-opc-definition.md#L229`；`archive/will-opc-diagnosis-2026-11.md#L35` | K46′：改为「不能形成规模，但不是零」 |
| K47 | P4：三个产品不共享账号、支付、数据、受众 | 成立（现状 F） | `archive/will-opc-opc-definition.md#L230` | 本条；这是配置，不是定律 |
| K48 | 由 P4 推出「跨产品复利无法建立 / 在 P4 成立前任何路线都不该承诺受众复利」 | 已被推翻（把现状读成禁令；共享资产可以被设计出来） | `archive/will-opc-roadmap-2026-11.md#L8`、`#L146`；`archive/will-opc-first-principles.md#L323-L327` | K48′：P4 只否定「产品数据复利」，不否定分发复利与品牌复利（`archive/will-opc-diagnosis-2026-11.md#L126-L129`） |
| K49 | 附论 G：Tablow → Yipa 是「逆选择」，因为 Yipa 卖的是 Tablow 买家刻意回避的东西 | 已被推翻（Yipa 改为本地优先、无强制账号、AI 可选，并对齐 Tablow 基础记录） | `archive/will-opc-opc-definition.md#L1067-L1070`；`archive/will-opc-diagnosis-2026-11.md#L13`、`#L46-L51` | K51′：改为「能力重叠后的迁移边，可能是产品合并，不是新获客」 |
| K50 | 附论 G：微信小程序内不能把用户送到境外商店（web-view 仅已备案业务域名） | 成立（平台规则 F） | `archive/will-opc-opc-definition.md#L1095-L1103` | 本条；物理断路，不是文案问题 |
| K51 | 附论 G：「唯一物理通、又是上行的边只有 Tablow → Yipa，而它恰好需求方向相反」 | 已被推翻（「物理通」仍成立；「需求相反」的前提失效） | `archive/will-opc-opc-definition.md#L1116`；`archive/will-opc-diagnosis-2026-11.md#L28` | K51′：改为「物理通；能力重叠，可能替代而非升级」 |
| K52 | 附论 H：AI 是选择时的加分项，不是让人开始记录的引力 | 成立（D+E）；适用性降级：不能直接套 Yipa | `archive/will-opc-opc-definition.md#L1230-L1234`；`archive/will-opc-diagnosis-2026-11.md#L14`、`#L62-L68` | 本条；「AI 流失快 30%」只能外推 |
| K53 | 附论 H：AI 产品流失快 30%，可直接预测 Yipa | 已过期（Yipa 不是 AI 主价值产品，AI 为可选能力） | `archive/will-opc-opc-definition.md#L1236`；`archive/will-opc-diagnosis-2026-11.md#L64-L67` | K52；30% 只作「AI 承诺容易高于实际使用」的旁证 |
| K54 | Yipa 的买家是「想记录/观察自己的人」 | 已被推翻（产品形态已变；买家尚未定义） | `archive/will-opc-opc-definition.md#L212`；`archive/will-opc-diagnosis-2026-11.md#L36`、`#L79-L86` | K54′：「买家未定义；当前覆盖想记录并偶尔回看的人，与 Tablow 日期记录人群重叠」 |
| K55 | 真实验证吞吐 = min(生产吞吐, 验证吞吐) | 成立（D） | `archive/will-opc-opc-definition.md#L158-L162` | 本条 |
| K56 | 三类结构冲突成立：付款人冲突、时间结构冲突、资产冲突 | 成立 | `archive/will-opc-opc-definition.md#L216-L218` | 本条 |
| K57 | 验证冲突：3 产品 × 2 市场 = 6 条验证队列，产品组合是负杠杆 | 已被推翻（三款产品都低维护，不占持续在场带宽；真实原因是没有可跨期比较的数据） | `archive/will-opc-opc-definition.md#L219`；`archive/will-opc-first-principles.md#L351-L354` | K107；减产品不会让验证变多 |
| K58 | 旧方案起点错在 P2 | 条件成立：P2 是 A 档、本身不可判定；「起点错」可保留，但判死依据要降级为「缺承接物 + 付款人结构未定」 | `archive/will-opc-opc-definition.md#L232-L234`；`archive/will-opc-first-principles.md#L102-L103` | K58′；P2 只作待验证项 |
| K59 | 问题应重述为四问：资产、付款人、验证吞吐、类型选择 | 成立（框架） | `archive/will-opc-opc-definition.md#L240-L248` | 本条 |
| K60 | 谈解法前需要三组证据：受众-买家重合度、单产品验证量级、时间结构承受度 | 待验证：三组证据均未取得 | `archive/will-opc-opc-definition.md#L256-L258` | 本条；对应 30 天检验与承接物测量 |
| K61 | 这套策略约四成由约束推出、两成依赖行业数字、三成半把案例当规律；但分层看，诊断层约 70% D、处方层约 50% A | 成立（自审结论） | `archive/will-opc-first-principles.md#L9-L18` | 本条 |
| K62 | P2 是 A 档，却承担了判死整条旧方案的重量 | 成立（审计结论） | `archive/will-opc-first-principles.md#L102-L103` | 本条；判死依据应降级为待验证 |
| K63 | 「读者身份 = 买家身份」是 T5 的唯一条件（被写成结构定律） | 已被推翻（正确 D 版：内容与产品必须共享同一个使用场景与同一个付款理由） | `archive/will-opc-first-principles.md#L105-L106`、`#L356-L359` | K63′：同场景 + 同付款理由；身份只是代理 |
| K64 | 个人品牌成立需要五个条件（身份匹配、重复曝光、具体承诺、桥接物、代理指标） | 已被推翻（作为机制清单；五条是归纳，不是从零开始的必要条件） | `archive/will-opc-first-principles.md#L108-L109`；`archive/will-opc-diagnosis-2026-11.md#L158-L166` | 可作检查表使用，不能当机制判断或测量结果 |
| K65 | A/B/C 三选一是策略模板，不是约束推导 | 成立（审计结论） | `archive/will-opc-first-principles.md#L114-L115` | 本条；三选一预设了「必须选一条」 |
| K66 | 「付费价值正在向空间管理移动」是从一个功能推断需求 | 待验证：缺 Huddle 空间数分布、触顶率、转让/管理员使用与续费数据 | `archive/will-opc-first-principles.md#L117-L118`；`archive/will-opc-path-comparison-2026-11.md#L179-L194` | K103；拿到数据前只能作假设 |
| K67 | 内容实验应先吸引「普通技术使用者」 | 待验证：缺买家画像与四类候选的重合度测量 | `archive/will-opc-first-principles.md#L120-L121`；`archive/will-opc-content-experiment.md#L12`、`#L39-L42` | K67′：作为实验假设，不是目标受众定论 |
| K68 | 「自媒体不是资产」 | 已被推翻（部分）：结论在它自己的定义内成立，但定义把「被记住、被信任」这种不可测量存量预先排除了 | `archive/will-opc-first-principles.md#L123-L124`、`#L361-L364`；`archive/will-opc-roadmap-2026-11.md#L177` | K68′：社媒能积累不可测量存量，但不可结转、不可迁移、不可作主推依据；「不可测量」不等于「零」 |
| K69 | 「Huddle 有付款证据，所以它是主推」 | 已被推翻（¥9.9 × 每月 1.5 人 = 年化约 ¥178，不支撑 90% 投入） | `archive/will-opc-first-principles.md#L126-L127`、`#L341-L344`；`archive/will-opc-roadmap-2026-11.md#L138` | K106；Huddle 降为低强度维护 + 一个实验 |
| K70 | 「Yipa 暂缓」 | 已被推翻（前提「未上线、无市场证据」已过期；Yipa 已上架、主功能完成） | `archive/will-opc-first-principles.md#L129-L130`、`#L346-L349`；`archive/will-opc-roadmap-2026-11.md#L156` | K105；改为完成发布并观察 4–8 周 |
| K71 | 垂直在视角，不在题材 | 成立（定位原则） | `archive/will-opc-positioning.md#L100-L143` | 本条 |
| K72 | 产品是观点的软件版本 | 条件成立：前提是产品与内容共享同一场景 | `archive/will-opc-positioning.md#L221-L236` | 本条 |
| K73 | 双轨必须同时运行 | 已被推翻（时间上互斥；一个人同时只能维持一种「必须每周出现」的义务） | `archive/will-opc-positioning.md#L352-L372`；`archive/will-opc-diagnosis-2026-11.md#L142-L143` | K17′ |
| K74 | 明确否定的路线清单（不停发 App、不讲 Vibe Coding、不靠收入截图、不反效率/反增长等） | 成立（品牌边界） | `archive/will-opc-positioning.md#L583-L611` | 本条 |
| K75 | Will.OPC 最核心的是「独立判断」 | 成立 | `archive/will-opc-positioning.md#L613-L629` | 本条 |
| K76 | 在这个品类里，钱不在记录者手里，而在「替记录者付钱的人」手里 | 条件成立：品类机制成立；需具体付款人验证 | `archive/will-opc-direction-research.md#L15` | 本条；对应 D1/D2/D3 |
| K77 | 隐私没有价格，只有信任；E2EE 只能降低不信任，不能提高支付意愿 | 成立（E：田野实验 + 产品定价） | `archive/will-opc-direction-research.md#L17` | 本条 |
| K78 | 执业者付费能把客单价提高 40–80 倍，但要求产品从「日记」变成「执业工具」 | 条件成立：缺执业者身份与 3–5 个愿意先付钱的验证对象 | `archive/will-opc-direction-research.md#L19` | 本条；D1 的前提 |
| K79 | 三个产品之间不共享账号、支付、数据、受众，只共享 Will 的时间与品牌 | 成立（F） | `archive/will-opc-direction-research.md#L21` | 本条；与 K47 同义 |
| K80 | 现有条件下，没有一个方向成立 | 条件成立：在「无执业者关系、无 newsletter、无投放」条件下成立；Yipa 上架不改变 D1–D5 的结构阻碍 | `archive/will-opc-direction-research.md#L23`、`#L415` | K80′：绝对表述改为条件表述；D1 仍是最先可证伪 |
| K81 | D1 执业者付费是排序第一的最小实验（3 周、<$100） | 条件成立：仍缺 3–5 位执业者的联系方式 | `archive/will-opc-direction-research.md#L409` | 本条 |
| K82 | D2 关系型记录需要把产品从单人日记改成双人共享物 | 条件成立：需要新受众与支付层 | `archive/will-opc-direction-research.md#L30` | 本条 |
| K83 | D3 一次成果/礼物成品需要先建立履约与礼品信任 | 条件成立：与「一人 + 无投放」直接冲突 | `archive/will-opc-direction-research.md#L31` | 本条 |
| K84 | D4 卖身份需要先推翻「不做 newsletter」，积累 ≥3,000 名可重复触达读者 | 条件成立：12 个月内无法验证 | `archive/will-opc-direction-research.md#L32` | 本条；与承接物方向部分重合 |
| K85 | D5 平台生态寄生不构成方向 | 成立 | `archive/will-opc-direction-research.md#L33` | 本条 |

---

## C. 三个产品的现状与判断（K86–K107）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K86 | I1 注意力串行：同一时间只能维持一个有「持续在场」义务的系统 | 成立 | `archive/will-opc-first-principles.md#L155` | 本条 |
| K87 | I2 单位时间收入上限：任何路径的回报必须按小时计价 | 成立（D），但分母缺失 | `archive/will-opc-first-principles.md#L156`、`#L166` | 本条；每周可用小时数待用户提供 |
| K88 | I3 现金流方向：没有外部资本，支出必须由既有收入覆盖 | 成立 | `archive/will-opc-first-principles.md#L157` | 本条 |
| K89 | I4 可复用资产 = 一次投入后仍能降低下一次获客成本的可结转存量项 | 成立（核心框架） | `archive/will-opc-first-principles.md#L158` | 本条；存量只有四类：付费关系、可再触达名单、安装/使用基数、专有数据或技术 |
| K90 | I5 渠道是租约：平台持有分发权，可单方面改规则 | 成立 | `archive/will-opc-first-principles.md#L159` | 本条 |
| K91 | I6 边际成本：软件≈0，AI 推理>0，客服>0，商店抽成 15–30% | 成立 | `archive/will-opc-first-principles.md#L160` | 本条 |
| K92 | I7 价格被免费替代锚定 | 成立 | `archive/will-opc-first-principles.md#L161` | 本条；提高单价只能换计价单位 |
| K93 | I8 无账号 + 无推送 = 无再触达 | 成立（与产品承诺正面冲突） | `archive/will-opc-first-principles.md#L162` | 本条 |
| K94 | I9 发现只发生在两处：已表达的意图，或既有关系 | 成立 | `archive/will-opc-first-principles.md#L163` | 本条 |
| K95 | I10 不可逆决策：商店身份与审核记录、公开叙事、用户信任 | 成立 | `archive/will-opc-first-principles.md#L164` | 本条 |
| K96 | 收入恒等式 = 流量项（新客 × 转化 × 单价）+ 存量项（存量 × 留存 × 单价），复利只在第二项 | 成立 | `archive/will-opc-first-principles.md#L230-L235` | 本条；取代模糊的「复利」说法 |
| K97 | Huddle 要在 ¥9.9 档做到 ¥5,000/月，需约 505 个在订会员；按每月 1.5 人累积、零流失，需约 337 个月 | 条件成立：算术成立，但「零流失、1.5 人/月」是假设，不是预测 | `archive/will-opc-first-principles.md#L237-L243` | 本条；只用于说明量级差 |
| K98 | Tablow 的存量项结构为零 | 成立 | `archive/will-opc-first-principles.md#L245-L252` | 本条；买断产品没有续费 |
| K99 | Yipa 若仍「无强制账号 + 本地优先」，则结构上同样没有存量项 | 条件成立：待商店漏斗与留存数据；Yipa 的付费/留存/下载全部不可观测 | `archive/will-opc-first-principles.md#L254-L259` | 本条；不能填任何收入估算 |
| K100 | 三款产品缺的是同一项：可结转的人 | 成立 | `archive/will-opc-first-principles.md#L269` | 本条；这是主瓶颈的算术表述 |
| K101 | Huddle 的自传播属于产品复利，受四件事约束：微信生态、熟人群规模、¥9.9 ARPU、无跨产品迁移 | 成立（D） | `archive/will-opc-diagnosis-2026-11.md#L147-L154` | 本条；它是窄而复利，不外溢 |
| K102 | Huddle 的档位核心刻度是 `maxOwnedSpaces`：Free 3 / Plus 10 / Pro 30 / Large 100；按空间计价是已上线现状 | 成立（用户陈述 F；本仓库与可访问环境无法独立核实） | `archive/will-opc-path-comparison-2026-11.md#L17`、`#L34` | 本条；“按空间计价是新建议”作废（K135） |
| K103 | 按空间计价已是事实后，Huddle 真正待答四件事：空间轴是否杠杆、付款人与受益单位是否错位、多空间是否组织雏形、另两个候选是否改写 | 待验证：缺小程序后台 8 组数据（见 K141 与 `path-comparison` §6.0） | `archive/will-opc-path-comparison-2026-11.md#L45-L55`、`#L179-L194` | 本条；数据到手前只能作条件判断 |
| K104 | Yipa 的 E2EE「连我也看不到」与「从业者要看客户记录」直接冲突 | 成立（结构判断） | `archive/will-opc-path-comparison-2026-11.md#L38` | 本条；因此 B 端候选更适合不含敏感内容的 Tablow/Huddle，不是 Yipa |
| K105 | Yipa 应完成新版发布，发布后 4–8 周不扩功能、不做上线营销，只观察与修复 | 成立（替代「冻结」） | `archive/will-opc-diagnosis-2026-11.md#L194-L203`；`archive/will-opc-scenarios-2026-11.md#L112` | 本条；这是当前 Yipa 决策 |
| K106 | Huddle 应低强度维护 + 一个针对性实验（提价/分享转化/换付款人三选一），不做 90% 投入 | 成立 | `archive/will-opc-diagnosis-2026-11.md#L174-L182`；`archive/will-opc-scenarios-2026-11.md#L118` | 本条；与 K69/K145 相反 |
| K107 | 三个产品并行导致验证不足；减产品是解法 | 已被推翻（三款产品都低维护；真实原因是没有一项数据能跨期比较，减产品不会让验证变多） | `archive/will-opc-first-principles.md#L351-L354` | K107′：产品数量不是问题；要补的是承接物与可跨期数据 |

---

## D. 分发与获客（K108–K130）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K108 | 复利没有形成，真正从未开始积累的是「分发复利」 | 成立（被收入恒等式证实） | `archive/will-opc-diagnosis-2026-11.md#L9`；`archive/will-opc-first-principles.md#L310` | 本条 |
| K109 | 内容路线的必要条件是「承接物」，不是「产量」；没有承接物时写得再多也只是把流量换个地方归零 | 成立（D） | `archive/will-opc-first-principles.md#L193-L200` | 本条 |
| K110 | 如果只能做一件鲁棒动作，就是建立一个可再次触达的承接物 | 成立（三情景交叉） | `archive/will-opc-scenarios-2026-11.md#L21-L25` | 本条；当前最高优先级 |
| K111 | 现有内容实验没有测「存量捕获率」：每 100 次到达有多少人变成可再次触达 | 成立（缺口指认） | `archive/will-opc-first-principles.md#L378` | 本条；无需改实验，只需在承接页加可留联系方式入口并单独计数 |
| K112 | 4 周实验「通过」等于「内容有效」 | 已被推翻（4 周只能证明「能被看见」，不能证明「能积累分发」；Tj<Tf） | `archive/will-opc-scenarios-2026-11.md#L64`、`#L181` | K113 |
| K113 | 4 周实验只能判断「渠道是否愿意分发、链路是否通」，不能判断内容是否有效 | 成立（替代规则） | `archive/will-opc-content-experiment.md#L20`、`#L281`；`archive/will-opc-scenarios-2026-11.md#L144` | 本条；加量只由存量增长触发 |
| K114 | Threads 是主实验场，X / Instagram / Facebook 只做分发与对照 | 条件成立：E+A，换题材后是否成立未知 | `archive/will-opc-content-experiment.md#L13`、`#L177` | 本条；只做一次主平台切换 |
| K115 | 内容投入上限 6 小时/周、四周 24 小时 | 成立（R） | `archive/will-opc-content-experiment.md#L16`、`#L330-L337` | 本条 |
| K116 | 内容实验五条全满足才算通过 | 成立（R） | `archive/will-opc-content-experiment.md#L17`、`#L281` | 本条；但「通过」的含义受 K113 限制 |
| K117 | 通过只说明「渠道愿意给这批人分发、链路能通」，不说明「持续写就能起量」 | 成立 | `archive/will-opc-content-experiment.md#L20`、`#L353` | 本条 |
| K118 | 宣发的期望值随工时线性增长，不随存量复利；中位数接近零，方差极大 | 成立（式子推导） | `archive/will-opc-path-comparison-2026-11.md#L13`、`#L114` | 本条 |
| K119 | 二次传播只有四种结构：工具性、身份表达、争议、时效；前两种可设计，后两种不可控 | 条件成立：A/E 机制判断 | `archive/will-opc-path-comparison-2026-11.md#L91-L101` | 本条 |
| K120 | 宣发是承接物的乘数，不是替代品；承接物为 0 时，乘数再大结果也是 0 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L116` | 本条；顺序是「先承接物，再宣发」 |
| K121 | 可核实的受众→产品转移是「已有付费关系 + 课程/社群 + 同一使用场景」，不是免费受众规模 | 成立（A 档归纳，三正三反） | `archive/will-opc-creator-cases.md#L16` | 本条 |
| K122 | 影响力至少分四层：触达、付费关系、方法可信、社区归属 | 条件成立：归纳，未证明穷尽 | `archive/will-opc-creator-cases.md#L518-L523` | 本条；只有第 2/3/4 层有跨产品转移证据 |
| K123 | 没有一例显示「受众规模」可以单独预测产品成功 | 成立（证据陈述，不是规律） | `archive/will-opc-creator-cases.md#L550` | 本条；证据缺失不等于不存在 |
| K124 | 七种受众→产品路径机制（邮件名单、课程/社群、内容工具化、内测、折扣、社区迁移、平台注意力） | 条件成立：归纳，无统计 | `archive/will-opc-creator-cases.md#L463-L469` | 本条；只作机制清单，不作基准率 |
| K125 | 自媒体是偶遇渠道，不是资产 | 已被推翻（部分）：只证明了「不是即时转化渠道」，没有考察个人品牌复利 | `archive/will-opc-roadmap-2026-11.md#L177`；`archive/will-opc-diagnosis-2026-11.md#L33` | K68′：目前不是可复用的分发资产；个人品牌是另一种复利，机制尚未齐备 |
| K126 | 自媒体应按三阶段指标看：触达质量（0–3 月）、记忆与重复（3–6 月）、迁移（6–12 月） | 成立（R） | `archive/will-opc-diagnosis-2026-11.md#L205-L213` | 本条 |
| K127 | 证明内容存在真实受众的证据（重复直接访问/品牌词、非同行来信、第三方引用、意图簇搜索增长、新用户自述来源） | 成立（R） | `archive/will-opc-diagnosis-2026-11.md#L217-L222` | 本条 |
| K128 | 自媒体要变成资产，缺的是「可拥有的名单 + 身份一致」 | 成立 | `archive/will-opc-roadmap-2026-11.md#L197-L199` | 本条；名单应建在用户侧，不是内容侧 |
| K129 | 自媒体继续投入需同时满足三条件：每季度 ≥1 个可归因付费/可识别商店点击、每周 ≤ A 的 10%、不影响交付与客服 | 条件成立：A 路线本身已被推翻，百分比需重算 | `archive/will-opc-roadmap-2026-11.md#L185-L189` | K129′：改为「每周 ≤6 小时、不影响产品维护与客服」 |
| K130 | 自媒体停止条件：连续 3 个月零可归因转化、边际收益低于同等时间客服/产品改进、平台政策进一步限流 | 成立（R） | `archive/will-opc-roadmap-2026-11.md#L191-L195` | 本条 |

---

## E. 路径选择（K131–K155）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K131 | B 端定制能最快产生现金，也能产生客户关系存量，但默认结局是把一人公司退化成一个人的外包公司 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L11` | 本条；只有「固定范围、固定价格、可复用交付」三条同时成立才不退化 |
| K132 | 第三条路（换收款对象/计价单位/能力层级）是三条里唯一在三种情景下都不失效的方向，但属于 T2，收入与小时线性相关、规模上限低 | 条件成立：N 只在 A/B 两情景成立；Huddle 组织级待数据 | `archive/will-opc-path-comparison-2026-11.md#L15`；`archive/will-opc-scenarios-2026-11.md#L122` | K132′：降为两情景成立，不是全鲁棒 |
| K133 | 「做 B 端」与「炒起来」共享同一个假设：问题出在前端不够大；这个假设只对一半 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L23-L25` | 本条；最大缺口在存量项，不在前端 |
| K134 | 两个方向都要求持续在场，会占用唯一稀缺的在场带宽 | 成立（I1） | `archive/will-opc-path-comparison-2026-11.md#L27` | 本条 |
| K135 | Huddle 的第三条路是「换计价单位：按空间或按主持人计费」 | 已被推翻（按空间计价是已上线现状，不是待提出的建议） | `archive/will-opc-path-comparison-2026-11.md#L33-L35`；`#L17` | K102；改为「在同一计价轴上，把购买者从个人多空间升级为组织」 |
| K136 | B 端定制有四种单位经济：按小时、人头费/驻场、项目制、产品化服务；产品化服务最接近产品 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L61-L69` | 本条 |
| K137 | B 端退化判据：>70% 收入来自逐客户重新报价、复用改动 >20%、定制组件 30 天未进入产品 | 成立（R） | `archive/will-opc-path-comparison-2026-11.md#L75-L79` | 本条 |
| K138 | B 端是「条件鲁棒」：需求跨三情景成立，但执行能力当前不具备 | 条件成立：与 `scenarios` 的 5/9 分类冲突，等 30 天检验 | `archive/will-opc-path-comparison-2026-11.md#L163` | 本条；不改写 `scenarios` 分类，先标注 |
| K139 | 第一瓶颈的排序是路径的函数：C 端路径下分发第一，B 端路径下销售第一 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L165` | 本条；推翻「分发永远是第一瓶颈」的绝对说法 |
| K140 | 主推资格的证据必须来自「第二次复用」，不是第一次付款 | 成立（R） | `archive/will-opc-path-comparison-2026-11.md#L167` | 本条；补上 K92 的判据 |
| K141 | 30 天最小检验：B 端 1 页固定报价发 10 个商家；宣发 4 条带承接页；第三条路 1 页交付承诺；Huddle 组织级/空间轴/成员侧各一个小实验 | 成立（R）；数据需用户导出 | `archive/will-opc-path-comparison-2026-11.md#L196-L240` | 本条；先看 §6.0 八个数再决定做哪个 |
| K142 | 三条路径的取舍不是「哪个更好」，是「你愿意用哪种失败方式换取哪种资产」 | 成立 | `archive/will-opc-path-comparison-2026-11.md#L133` | 本条 |
| K143 | 四层排序：分发 > 商业转化 > 产品组合/定位 > 产品开发 | 条件成立：C 端路径成立；B 端路径下销售第一（K139） | `archive/will-opc-diagnosis-2026-11.md#L94-L98` | K139 |
| K144 | 复利断在 P4 | 已被推翻（P4 是现状，不是原因；「没有复用」是 F，「因为 P4」是错误归因） | `archive/will-opc-roadmap-2026-11.md#L8`；`archive/will-opc-first-principles.md#L67` | K108；缺的是分发复利 |
| K145 | 90% 可支配时间给 Huddle；Tablow 只维护；Yipa 暂缓 | 已被推翻（Yipa 已上架；Huddle 规模不支持 90%） | `archive/will-opc-roadmap-2026-11.md#L24`；`archive/will-opc-diagnosis-2026-11.md#L31-L32` | K106 + K105 |
| K146 | 路线 A：收窄到 Huddle，把它做成可持续会员生意 | 已被推翻（作为 90% 主推；降为低强度维护 + 一个实验） | `archive/will-opc-roadmap-2026-11.md#L30-L39`、`#L138` | K106 |
| K147 | 路线 B：换付费方（执业者/管理者），同一份交付换付款人可放大客单价 | 条件成立：仍缺非熟人执业者付费证据 | `archive/will-opc-roadmap-2026-11.md#L65-L73` | 本条；与 D1 同向 |
| K148 | 路线 C：now 是承接层，不是引流层；它承接已有意图，不制造意图 | 成立 | `archive/will-opc-roadmap-2026-11.md#L106-L109` | 本条 |
| K149 | 选 A | 已被推翻（排序启发式，未做算术；¥9.9 × 1.5 人 = 年化 ¥178） | `archive/will-opc-roadmap-2026-11.md#L138`；`archive/will-opc-first-principles.md#L341-L344` | K106 |
| K150 | A 不承诺跨产品复利：在 P4 成立之前，任何路线都不该承诺受众复利 | 已被推翻（P4 是现状，不是禁令；共享资产可设计） | `archive/will-opc-roadmap-2026-11.md#L146`；`archive/will-opc-first-principles.md#L323-L327` | K48′ |
| K151 | Yipa 暂缓，不按原计划继续研发，不降级为 Huddle/Tablow 的功能 | 已被推翻（前提「Yipa 未上线」已过期；改为完成发布并观察） | `archive/will-opc-roadmap-2026-11.md#L156`；`archive/will-opc-diagnosis-2026-11.md#L194-L203` | K105 |
| K152 | 主推资格由付款证据决定，不由计划决定 | 已被推翻（付款门槛太低，¥9.9 就通过；不测量单位时间回报） | `archive/will-opc-roadmap-2026-11.md#L173`；`archive/will-opc-first-principles.md#L329-L333` | K92：单位时间收入 × 可结转性 × 可放大性；另加 K140 |
| K153 | 一年内五件不该做的事（不为不续费的功能投入、不在小程序跳境外商店、Yipa 未过门槛不开发、不新增内容平台、不把 now 当引流层） | 条件成立：第 2、4、5 条成立；第 3 条已过期（Yipa 已上架） | `archive/will-opc-roadmap-2026-11.md#L203-L207` | K153′：改为「发布后不扩大功能范围」 |
| K154 | 主推资格应改为「由可复现的用户证据决定」（留存、复访、主动请求、付费都算） | 已被推翻（作为最终判据：付款/用户证据的门槛仍太低，缺单位时间分母；应改为 K92 + K140） | `archive/will-opc-diagnosis-2026-11.md#L15`、`#L70-L77`；`archive/will-opc-first-principles.md#L329-L333` | K92 + K140 |
| K155 | 用户判断「方向对，颗粒度错」 | 已被推翻（不可证伪：无论结果如何都能这样说） | `archive/will-opc-diagnosis-2026-11.md#L17`；`archive/will-opc-first-principles.md#L80` | K155′：拆成三种分发机制与两种资产分别判断（`diagnosis` §2.2，`#L113-L118`） |

---

## F. 执行方案与判定规则（K156–K176）

| 编号 | 判断（精简） | 状态 | 出处 | 现在以哪条为准 |
| --- | --- | --- | --- | --- |
| K156 | 15 项动作中 5 项全情景鲁棒、1 项两情景成立、9 项单情景押注 | 成立（分类；B 端另作条件鲁棒补充，K138） | `archive/will-opc-scenarios-2026-11.md#L13-L19` | 本条；B 端补注，不改原分类 |
| K157 | 13 项动作里 12 项「判断周期短于反馈周期」 | 成立（估计 R，没有一项被测量） | `archive/will-opc-scenarios-2026-11.md#L33-L50` | 本条 |
| K158 | N 年内能完成的完整反馈周期数 = N / Tf，与判断周期 Tj 无关 | 成立（逻辑） | `archive/will-opc-scenarios-2026-11.md#L54` | 本条 |
| K159 | 在 Tj 处切换，不增加完成的周期数，只增加已放弃的项目数 | 成立 | `archive/will-opc-scenarios-2026-11.md#L55` | 本条 |
| K160 | 三个情景按驱动变量分：A 工具被免费内置、B 付费集中关系与托管、C 分发规则改变 | 条件成立：压力测试，不是预测；可同时部分发生 | `archive/will-opc-scenarios-2026-11.md#L70-L104` | 本条 |
| K161 | 情景 A 中 Tablow 最先失效，Yipa 只剩 AI 则无位置，Huddle 不受影响 | 条件成立：取决于系统功能清单 | `archive/will-opc-scenarios-2026-11.md#L80` | 本条 |
| K162 | 情景 B 中 Huddle 是核心，但不等于「90% 时间」 | 成立 | `archive/will-opc-scenarios-2026-11.md#L90-L92` | 本条 |
| K163 | 情景 C 中「内容获客」与「ASO 是主渠道」被推翻，承接物/私域被强化 | 条件成立：依赖自然曝光连续两季下降 ≥15% | `archive/will-opc-scenarios-2026-11.md#L100-L102` | 本条 |
| K164 | 两年失败路径的每一步都合理，整体为零 | 成立（构造性，不是预测） | `archive/will-opc-scenarios-2026-11.md#L128-L138` | 本条；用于识别路径依赖 |
| K165 | 8 条前置阻断规则（先写 Tj/Tf、12 个月最多换一次主平台、加量只由存量触发、Huddle 提价 4 周定生死、交付物 4 周定生死、半年硬闸、解释禁令、不可逆动作闸） | 成立（R） | `archive/will-opc-scenarios-2026-11.md#L140-L151` | 本条 |
| K166 | 现在必须定的只有两件：把公开承诺收窄到数据处理方式，以及不做终身买断 | 成立（R） | `archive/will-opc-scenarios-2026-11.md#L171` | 本条 |
| K167 | 冻结六个月看起来可逆，实际消耗唯一不可再生资源，应按不可逆动作管理 | 成立 | `archive/will-opc-scenarios-2026-11.md#L151`、`#L168` | 本条 |
| K168 | 交付物前置（N）：不卖应用，卖一次完成的、与具体处境相关的交付物；应用退为工具或免费下游 | 条件成立：它违反 T1，属于 T2；依赖「愿意面对陌生人销售」与「每周可交付工时」两个未测变量 | `archive/will-opc-first-principles.md#L382-L392`、`#L410-L415` | 本条；只作候选 |
| K169 | 交付物前置在 A/B 两情景成立，C 情景下暴露 | 成立（替代「全鲁棒」） | `archive/will-opc-scenarios-2026-11.md#L122`、`#L182` | K132′ |
| K170 | Huddle 的存量单位是主持人，因此应对主持人按空间计费，而不是对分享行为免费 | 已被推翻（作为「新建议」：按空间计价已是现状；作为「存量单位」判断仍成立） | `archive/will-opc-first-principles.md#L427`；`archive/will-opc-path-comparison-2026-11.md#L34` | K102 + K103；改问「第 4 个空间的需求密度」 |
| K171 | 诊断对下一步的六条约束（先答产品组合、声明主复利、正视 ARPU、区分三种分发机制、用领先指标判断内容、不把「不需要高强度开发」当成「开发不是瓶颈」） | 成立 | `archive/will-opc-diagnosis-2026-11.md#L237-L242` | 本条 |
| K172 | 内容实验的判定规则（通过/内容成立承接不成立/渠道无效/表达待改/受众错配/未判定）与样本量警告 | 成立（R） | `archive/will-opc-content-experiment.md#L273-L293` | 本条；「通过」含义受 K113 限制 |
| K173 | 30 天最小检验的判定分三档：通过、失败、未判定；未判定必须写清哪一环没发生 | 成立（R） | `archive/will-opc-path-comparison-2026-11.md#L177-L240` | 本条 |
| K174 | 选择规则：只有一个通过就作主线，两个以上选「可结转资产更大」的那条，全部未判定先补承接物 | 成立（R） | `archive/will-opc-path-comparison-2026-11.md#L240` | 本条 |
| K175 | 内容实验四周总预算用尽即停，不延期、不借用产品时间 | 成立（R） | `archive/will-opc-content-experiment.md#L337-L349` | 本条 |
| K176 | 判断「值不值」只能做相对比较，不能给绝对门槛，因为每周可用小时数从未测量 | 成立（U） | `archive/will-opc-first-principles.md#L166`、`#L433` | 本条；分母需用户提供 |

---

## G. 未裁决的事实冲突

以下冲突只记录，不在本次整理中裁决：

1. **「现有条件下没有一个方向成立」vs「Yipa 已上架、Huddle 有付费」**：`direction-research` 写于 Yipa 上架前；`diagnosis` 已用新事实清算。台账按「条件成立」处理（K80），不宣布 D1–D5 全部复活。
2. **「分发是第一瓶颈」vs「B 端路径下销售第一」**：两者是路径依赖，不是事实冲突；按 K139 并列标注。
3. **5 项鲁棒动作 vs「B 端是条件鲁棒」**：`scenarios` 的分类与 `path-comparison` 的补充冲突；K138/K156 保留双方，等 30 天检验后再改写。
4. **「4 周通过」vs「4 周只能判可见性」**：同一阈值被赋予不同含义；K112/K113 以「只判可见性」为准，但保留原文阈值。
5. **Huddle 主体类型、开票现状、Yipa 定价**：多份文档写「查不到」，且 `path-comparison` 的 `maxOwnedSpaces` 只来自用户陈述；未核实，不作裁决。
