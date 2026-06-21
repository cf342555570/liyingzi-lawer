import { siteConfig } from "../../data/site-config.mjs";
import { lawyer } from "../../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { sectionHeading } from "../../components/sections.mjs";
import { articleMeta as gongsiArticle } from "./gongsi-guquan-fenge.mjs";
import { breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

export const articlesIndexMeta = Object.freeze({
  path: "/articles/",
  title: "婚姻家事普法文章｜法律规则与风险分析｜英姿律见",
  description: "英姿律见婚姻家事普法栏目，由李英姿律师围绕离婚财产分割、子女抚养、彩礼返还、夫妻共同债务等问题整理法律规则、证据要点与风险分析。",
  keywords: "长沙婚姻家事律师, 离婚财产分割, 子女抚养, 法律分析, 李英姿律师"
});

export const renderArticlesIndex = (additionalArticles = []) => {
  const articleList = [gongsiArticle, ...additionalArticles]
    .sort((a, b) => String(b.date || b.datePublished || "").localeCompare(String(a.date || a.datePublished || "")));
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "普法文章", path: "/articles/" }
  ];

  const articlesHtml = articleList.map((article) => `
    <article class="detail-card">
      <p class="eyebrow">婚姻家事普法</p>
      <h2><a href="${article.path}">${escapeHtml(article.title)}</a></h2>
      <p>${escapeHtml(article.description)}</p>
      ${article.date ? `<p style="font-size:0.875rem;color:#666;">发布：${escapeHtml(article.date)}</p>` : ""}
      <a href="${article.path}"><strong>阅读全文 →</strong></a>
    </article>`).join("");

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section">
      <div class="shell narrow">
        <h1>婚姻家事普法文章</h1>
        <p class="large-copy">英姿律见普法栏目由${lawyer.displayName}（${lawyer.organization}）围绕婚姻家事法律规则、证据准备与常见处理风险整理。内容用于一般法律知识参考，不能替代针对具体案件的材料审查。</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
      </div>
    </section>
    <section class="section" style="padding-top:0;">
      <div class="shell narrow detail-grid">
        ${articlesHtml}
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
    ...articlesIndexMeta,
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
