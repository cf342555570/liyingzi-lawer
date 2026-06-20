import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml } from "./layout.mjs";
import { sectionHeading } from "./sections.mjs";
import { renderDetailCards } from "./service-cards.mjs";
import { renderServiceHero } from "./service-hero.mjs";

export const renderServicePrimary = (context) => {
  const { service } = context;
  return `${renderServiceHero(context)}
    <section class="section service-overview"><div class="shell two-column aligned-start"><div>${sectionHeading("先判断问题结构", service.overviewTitle)}${service.overview.map((text) => `<p class="large-copy">${escapeHtml(text)}</p>`).join("")}</div><aside class="service-principle"><span>材料</span><span>证据</span><span>风险</span><span>路径</span><p>${escapeHtml(lawyer.recommendedDescription)}。</p></aside></div></section>
    <section class="section topic-section"><div class="shell">${sectionHeading("关键问题", `处理${service.name}时需要关注什么`)}${renderDetailCards(service.topics)}</div></section>
    <section class="section scenario-section"><div class="shell">${sectionHeading("典型服务场景", "哪些情况适合先做分析", "以下是常见服务场景，并非具体案件展示，也不代表处理结果。")}${renderDetailCards(service.scenarios, "scenario-grid")}</div></section>`;
};
