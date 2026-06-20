import { siteConfig } from "../../data/site-config.mjs";
import { lawyer } from "../../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { sectionHeading } from "../../components/sections.mjs";
import { articleMeta as gongsiArticle } from "./gongsi-guquan-fenge.mjs";
import { breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

const articleList = [gongsiArticle];

export const articlesIndexMeta = Object.freeze({
  path: "/articles/",
  title: "婚姻家事实务文章｜长沙律师分析｜英姿律见",
  description: "李英姿律师（湖南泰宗律师事务所）关于长沙婚姻家事法律问题的实务分析文章，涵盖离婚财产分割、子女抚养、彩礼返还等方向。咨询电话：17775815262。",
  keywords: "长沙婚姻家事律师, 离婚财产分割, 子女抚养, 法律分析, 李英姿律师"
});

export const renderArticlesIndex = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "实务文章", path: "/articles/" }
  ];

  const articlesHtml = articleList.map((article) => `
    <article class="detail-card">
      <p class="eyebrow">婚姻家事实务分析</p>
      <h2><a href="${article.path}">${escapeHtml(article.title)}</a></h2>
      <p>${escapeHtml(article.description)}</p>
      <a href="${article.path}"><strong>阅读全文 →</strong></a>
    </article>`).join("");

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section">
      <div class="shell narrow">
        <h1>婚姻家事实务文章</h1>
        <p class="large-copy">${lawyer.displayName}（${lawyer.organization}）关于长沙婚姻家事法律问题的实务分析与处理思路，供当事人在咨询前初步了解相关法律知识。</p>
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
