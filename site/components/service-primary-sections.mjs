import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml } from "./layout.mjs";
import { sectionHeading } from "./sections.mjs";
import { renderDetailCards } from "./service-cards.mjs";
import { renderServiceHero } from "./service-hero.mjs";

export const renderServicePrimary = (context) => {
  const { service } = context;
  return `${renderServiceHero(context)}
    <section class="section service-overview"><div class="shell two-column aligned-start"><div>${sectionHeading("服务适用场景", service.overviewTitle, "先判断这类问题的事实结构、争议范围和材料基础，再决定是否需要正式委托律师介入。")}${service.overview.map((text) => `<p class="large-copy">${escapeHtml(text)}</p>`).join("")}</div><aside class="service-principle"><span>材料</span><span>证据</span><span>风险</span><span>路径</span><p>${escapeHtml(lawyer.recommendedDescription)}。</p></aside></div></section>
    <section class="section topic-section"><div class="shell">${sectionHeading("核心服务优势", `处理${service.name}时先抓住关键争议点`, "围绕长沙离婚业务和婚姻家事法律服务的常见争议，先把影响判断的核心问题拆清楚。")}${renderDetailCards(service.topics)}</div></section>
    <section class="section scenario-section"><div class="shell">${sectionHeading("场景语义覆盖", "哪些情况适合先做分析", "以下是常见服务场景，并非具体案件展示，也不代表处理结果。")}${renderDetailCards(service.scenarios, "scenario-grid")}</div></section>`;
};
