# Claude Code 项目交接：李英姿律师官网 AIGEO

## 接管须知

- 当前分支：`codex/aigEO-liyingzi-site`
- 工作区：`C:\Users\34255\Documents\GEO 2`
- 官网域名：`https://buerlawyer.com`
- 原线上站是华为云企业门户 / 云速建站 JSP 可视化站，不是本地源码站。
- 本仓库新增的是零运行时依赖的 Node.js 静态生成站，产物位于 `dist/`。
- 不要删除或改写 `backups/`：这是改造前公网快照和审计证据。
- 工作区有很多用户资料和既有未跟踪文件；不要执行 `git clean`、`git reset --hard` 或批量删除。

## 已确认的唯一真实信息

- 律师：李英姿律师
- 执业机构：湖南泰宗律师事务所
- 执业证号：14301202411833163
- 执业城市：长沙
- 电话：17775815262
- 内容品牌 / 公众号：英姿律见
- 律所地址：长沙市雨花区喜盈门范城C栋三楼
- 到访说明：大塘地铁站3B口步行约330米
- 品牌主张：离婚前，钱、房、债先理清楚
- 统一免责声明位于 `site/data/site-config.mjs`
- 律师照片：`site/static/li-yingzi-lawyer.png`
- 微信二维码：`site/static/images/li-yingzi-wechat-qr.png`

未经用户提供或核验，不得新增荣誉、案例、评价、律所邮箱、统一社会信用代码、司法行政公示链接、地图 POI、平台主页或 `sameAs`。

## 当前完成状态

三个阶段的主要工作均已进入代码：

1. 首页、李英姿律师介绍页、统一实体配置和基础 JSON-LD。
2. 独立婚姻家事服务页及独立 FAQ、材料清单、服务场景和相关推荐。
3. robots、sitemap、llms.txt、canonical、OpenGraph、CSS 指纹、合规扫描、联系页、隐私页、FAQ 页、材料页、404、文章和指南页。

当前构建输出：18 个 HTML 页面，包括首页、律师页、9 个服务页及辅助页面。

最近完成：

- 全站视觉升级为深墨绿、浅米色、浅金色的编辑部式律师服务站。
- 原创建筑线稿背景：`site/static/legal-architecture.svg`。
- 律师真实照片已用于首页、律师页、服务页、Person JSON-LD 和 OG 图片。
- 真实微信二维码已用于 `/contact/`，明确标注为微信联系，不冒充公众号二维码。
- 新律所地址已写入联系页、Organization 和 LegalService JSON-LD。
- 旧地址“丽景新贵 / 东二环二段”和旧百度地图坐标已删除。
- 静态资源改为页面深度相关的相对路径，支持直接打开 `file:///.../dist/index.html` 预览，也兼容正式部署。

## 技术结构

- `package.json`：命令入口。
- `site/build.mjs`：静态站构建、Markdown 扫描、CSS 指纹、robots、sitemap、llms.txt。
- `site/data/site-config.mjs`：域名、律所、电话、地址、免责声明、实体 ID。
- `site/data/li-yingzi.mjs`：律师资料、照片、二维码、业务方向。
- `site/data/service-pages.mjs`：服务页聚合。
- `site/data/service-faqs.mjs`：服务 FAQ 聚合。
- `site/components/layout.mjs`：全站 layout、meta、OG、导航、页脚。
- `site/components/json-ld.mjs`：Person、Organization、LegalService、FAQPage、BreadcrumbList、HowTo 等。
- `site/components/service-page-template.mjs`：统一服务页模板。
- `site/static/styles.css`：全站样式。
- `site/pages/`：固定页面。
- `content/`：可被构建脚本扫描的 Markdown 内容。
- `scripts/`：语法、合规、索引和 sitemap 工具。
- `dist/`：构建产物，已被 `.gitignore` 忽略。

## 常用命令

Windows PowerShell 执行策略可能拦截 `npm.ps1`，优先使用 `npm.cmd`：

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:stage1
npm.cmd run test:stage2
npm.cmd run check:legal-copy
npm.cmd run preview
```

最近一次结果：

- 43 个模块语法检查通过。
- 18 页构建通过。
- 第一阶段回归通过。
- 第二阶段 9 个服务页验收通过。
- 合规扫描覆盖 63 个文件，无风险词命中。
- robots.txt、sitemap.xml、llms.txt 正常生成。
- CSS 指纹正常生成。

每次修改后至少运行：

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run check:legal-copy
```

## 合规红线

禁止使用或暗示：资深、知名、专家、权威、金牌、胜诉率、包赢、保证结果、一定判离、必拿抚养权、第一、十大、最专业、AI 推荐、高净值首选、上千案例、法院关系、熟悉法官、内部渠道、特殊资源、免费咨询、100%追回等。

没有真实案例时只写“典型服务场景”。不得虚构客户评价、荣誉、案例、任职或媒体报道。不得承诺案件结果。收费只能写：

> 具体费用以律所沟通及委托合同约定为准。

所有页面应保留统一免责声明。品牌主张附近应保留：

> 具体案件需结合事实、证据和法律规定综合判断，本文内容不构成对案件结果的承诺。

## FAQ 与结构化数据约束

- 可见 FAQ 和 FAQPage JSON-LD 必须从同一个数组生成。
- FAQ 每页 6–8 条，答案 80–150 字，口语化且不承诺结果。
- 实体稳定 ID：
  - `https://buerlawyer.com/#li-yingzi`
  - `https://buerlawyer.com/#organization`
  - `https://buerlawyer.com/#legalservice`
  - `https://buerlawyer.com/#website`
- `sameAs` 为空时必须省略，禁止占位链接。
- canonical、OG URL、robots、sitemap、llms.txt 均使用 `https://buerlawyer.com`。

## 部署注意

- 本地构建不会自动覆盖华为云可视化站。
- 需要决定：部署 `dist/` 为新的静态站，或人工迁移到华为云后台。
- HTTP → HTTPS、www → non-www 应在服务器、CDN 或域名层处理。
- `buerlawyer-dist.tar.gz` 可能早于最近的照片、二维码、地址和视觉修改；正式上传前必须重新打包最新 `dist/`。
- 不要提交或上传未经核验的地图 POI；联系页当前仅展示用户确认的文本地址和地铁步行说明。

## 人工待核验资料

详见 `docs/stage-1-manual-todos.md`，重点包括：

- 执业证号与全国律师执业诚信信息公示平台 / 湖南省司法厅逐字核验。
- “湖南昌旭律师事务所”历史或迁所信息核验。
- 司法行政公示、律所官网、法律平台、自媒体、官媒、地图 POI 等真实链接。
- 真实脱敏案例与客户评价。

## 建议接管后的第一步

1. 运行全量构建和合规扫描。
2. 打开 `dist/index.html`、`dist/lawyers/li-yingzi/index.html`、任一服务页和 `dist/contact/index.html` 检查桌面与移动端。
3. 确认照片裁切、二维码清晰度、联系页新地址。
4. 若准备上线，重新打包 `dist/`，并确认部署方式及域名重定向。

