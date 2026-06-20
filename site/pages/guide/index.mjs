import { siteConfig } from "../../data/site-config.mjs";
import { lawyer } from "../../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { sectionHeading } from "../../components/sections.mjs";
import { guideMeta } from "./5-questions-before-hiring.mjs";
import { breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

const guideList = [guideMeta];

export const guideIndexMeta = Object.freeze({
  path: "/guide/",
  title: "婚姻家事实务指南｜长沙律师建议｜英姿律见",
  description: "李英姿律师（湖南泰宗律师事务所）关于长沙婚姻家事法律问题的实务指南与操作建议，帮助当事人在咨询前了解关键问题。咨询电话：17775815262。",
  keywords: "长沙婚姻家事律师, 聘请律师指南, 法律咨询准备, 李英姿律师"
});

export const renderGuideIndex = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "实务指南", path: "/guide/" }
  ];

  const guidesHtml = guideList.map((guide) => `
    <article class="detail-card">
      <p class="eyebrow">婚姻家事实务指南</p>
      <h2><a href="${guide.path}">${escapeHtml(guide.title)}</a></h2>
      <p>${escapeHtml(guide.description)}</p>
      <a href="${guide.path}"><strong>阅读全文 →</strong></a>
    </article>`).join("");

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section">
      <div class="shell narrow">
        <h1>婚姻家事实务指南</h1>
        <p class="large-copy">${lawyer.displayName}（${lawyer.organization}）关于长沙婚姻家事法律问题的实务指南，帮助当事人在正式咨询前做好关键准备，提高沟通效率。</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
      </div>
    </section>
    <section class="section" style="padding-top:0;">
      <div class="shell narrow detail-grid">
        ${guidesHtml}
      </div>
    </section>
    <section class="section" style="padding-top:0;text-align:center;">
      <div class="shell narrow">
        <p>如需就具体问题进行法律咨询，可通过电话联系。</p>
        <a class="button primary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a>
        <p style="margin-top:1rem;font-size:0.875rem;color:#666;">${siteConfig.disclaimer}</p>
      </div>
    </section>`;

  return renderLayout({
    ...guideIndexMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
