import { siteConfig } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "./layout.mjs";
import { renderContact, renderListCards, sectionHeading } from "./sections.mjs";
import { breadcrumbSchema, geoAreaServiceSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "./json-ld.mjs";

export const renderGeoAreaPage = (geoArea) => {
  const isPriorityArea = geoArea.slug === "yuhua";
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "长沙服务区域", path: "/areas/" },
    { name: geoArea.name, path: geoArea.path }
  ];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero service-hero">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">长沙${escapeHtml(geoArea.name)}婚姻家事法律服务</p>
          <h1>${escapeHtml(geoArea.name)}婚姻家事法律咨询｜李英姿律师</h1>
          <p class="hero-intro">${escapeHtml(geoArea.intro)}</p>
          <div class="hero-actions"><a class="button primary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a><a class="button secondary" href="/lawyers/li-yingzi/">查看律师介绍</a><a class="button secondary" href="/qualifications/">资质核验</a></div>
          <p class="legal-note">${siteConfig.sloganNotice}</p>
        </div>
        <aside class="identity-panel"><p class="eyebrow">实体信息</p><h2>${lawyer.displayName}</h2><p>${lawyer.organization}</p><p>长沙婚姻家事法律服务</p><p>服务区域：${escapeHtml(geoArea.name)}</p></aside>
      </div>
    </section>
    <section class="section"><div class="shell">
      ${sectionHeading("本地场景", `${geoArea.name}常见婚姻家事问题`, "页面用于说明一般材料和处理路径，不代表对具体案件作出判断。")}
      ${renderListCards(geoArea.scenarios)}
    </div></section>
    <section class="section services-section"><div class="shell">
      ${sectionHeading("服务方向", `${geoArea.name}婚姻家事服务入口`, "进入对应专题查看事实要点、材料清单和常见问题。")}
      <div class="service-grid compact">${services.map((service) => `<a class="service-card" href="${service.path}"><h3>${escapeHtml(geoArea.name)}${escapeHtml(service.name)}</h3><p>${escapeHtml(service.summary)}</p><strong>查看专题 →</strong></a>`).join("")}</div>
    </div></section>
    <section class="section"><div class="shell two-column aligned-start"><div>
      ${sectionHeading("咨询准备", "先形成四张清单")}
      ${renderListCards(["婚姻关系和重要事件时间线", "房产、存款、车辆和投资清单", "借款、贷款和资金流向清单", "子女生活、照顾、教育和医疗材料清单"])}
    </div><aside class="local-panel"><p class="eyebrow">服务说明</p><h2>以材料和证据为基础</h2><p>是否适合协商、调解或诉讼，需要结合案件所在地、双方状态、证据完整程度和实际诉求判断。所有正式法律业务均由律师事务所依法接受委托。</p></aside></div></section>
    <section class="section"><div class="shell narrow legal-note"><strong>区县页处理说明</strong><p>${isPriorityArea ? "雨花区为当前优先保留和深化的本地区县页，后续可继续补充雨花区法院、交通、材料清单和本地场景问答。" : "本区县页当前仅作为服务区域说明保留，因页面结构与其他区县页相近，已设置 noindex, follow，待补充真实本地化信息后再恢复索引。"}</p></div></section>
    ${renderContact()}`;

  return renderLayout({
    title: `${geoArea.name}婚姻家事律师咨询｜李英姿律师｜湖南泰宗律师事务所`,
    description: geoArea.description,
    path: geoArea.path,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), geoAreaServiceSchema(geoArea), websiteSchema(), breadcrumbSchema(breadcrumbs), howToSchema()],
    robots: isPriorityArea ? "index, follow" : "noindex, follow"
  });
};
