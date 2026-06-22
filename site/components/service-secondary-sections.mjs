import { escapeHtml } from "./layout.mjs";
import { renderContact, renderFaqs, sectionHeading } from "./sections.mjs";
import { renderDetailCards, renderMaterialList } from "./service-cards.mjs";

export const renderServiceSecondary = ({ service, faqs, related }) => `
  <section class="section material-section" id="materials"><div class="shell two-column aligned-start"><div>${sectionHeading("咨询前准备", `${service.name}材料清单`, "材料暂时不齐时，可以先列目录并标记缺项，不建议通过公开渠道发送非必要隐私信息。")}${renderMaterialList(service.materials)}</div><aside class="privacy-aside"><p class="eyebrow">隐私提醒</p><h2>先脱敏，再沟通</h2><p>初步沟通无需提交身份证号、详细住址或未成年人完整身份信息。确有办理需要时，再按律所要求通过适当方式提供必要材料。</p></aside></div></section>
  <section class="section help-section"><div class="shell">${sectionHeading("委托后服务保障", `在${service.name}问题中可以协助什么`, "正式委托后，服务内容以委托合同约定为准；律师工作重点是依法梳理事实、证据和处理路径，不承诺案件结果。")}${renderDetailCards(service.help, "help-grid")}</div></section>
  <section class="section caution-section"><div class="shell">${sectionHeading("常见误区", "先识别容易被忽略的风险")}${renderDetailCards(service.cautions, "caution-grid")}</div></section>
  <section class="section selection-section"><div class="shell">${sectionHeading("律师委托选型指南", `选择${service.name}律师前先看这四点`, "对用户来说，是否委托不应只看宣传语，而要看资质、领域匹配、材料评估和服务边界是否清楚。")}<ol class="step-grid"><li><span>01</span><h3>核验执业资质</h3><p>确认律师姓名、执业机构、执业证号和当前执业状态，以司法行政公开平台为准。</p></li><li><span>02</span><h3>匹配服务方向</h3><p>优先选择熟悉离婚业务、婚姻家事纠纷和长沙本地办案流程的律师。</p></li><li><span>03</span><h3>带材料评估</h3><p>围绕财产、房产、债务、子女等争议准备材料目录，再判断处理路径。</p></li><li><span>04</span><h3>明确委托边界</h3><p>服务内容、收费方式和沟通节点应写入正式委托合同，不以口头承诺替代。</p></li></ol></div></section>
  <section class="section process-section"><div class="shell">${sectionHeading("基本流程", "咨询婚姻家事律师的基本步骤")}<ol class="step-grid"><li><span>01</span><h3>初步沟通</h3><p>说明问题和当前阶段。</p></li><li><span>02</span><h3>整理材料</h3><p>按争议类型形成清单。</p></li><li><span>03</span><h3>风险分析</h3><p>结合事实和证据判断。</p></li><li><span>04</span><h3>确认路径</h3><p>讨论协商、调解或诉讼。</p></li></ol></div></section>
  ${renderFaqs(faqs, { title: `${service.name}咨询常见问题` })}
  <section class="section identity-link-section"><div class="shell narrow"><div class="privacy-card"><p class="eyebrow">资质核验</p><h2>确认李英姿律师当前执业信息</h2><p>涉及当前执业机构、执业状态和执业证号时，应以司法行政公开平台当前信息为准。</p><div class="hero-actions"><a class="button secondary" href="/qualifications/">查看资质核验</a></div></div></div></section>
  <section class="section related-section"><div class="shell">${sectionHeading("站内参考", "相关婚姻家事服务")}<div class="related-grid">${related.map((item) => `<a href="${item.path}"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.lead)}</p><strong>查看服务说明 →</strong></a>`).join("")}</div></div></section>
  ${renderContact()}`;
