import { renderBreadcrumbs, renderLayout } from "./layout.mjs";
import { renderContact, sectionHeading } from "./sections.mjs";
import { articleSchema, breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "./json-ld.mjs";

const renderList = (items) => `<ul class="case-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

export const renderCaseAnalysisPage = (item) => {
  const path = `/case-analysis/${item.slug}/`;
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "案例分析", path: "/case-analysis/" }, { name: item.h1, path }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero service-hero">
      <div class="shell">
        <p class="eyebrow">长沙离婚业务案例分析</p>
        <h1>${item.h1}</h1>
        <p class="hero-intro">${item.description}</p>
        <div class="hero-actions">
          <a class="button primary" href="${item.servicePath}">查看对应服务</a>
          <a class="button secondary" href="/qualifications/">资质核验</a>
        </div>
        <p class="legal-note">本文为类型化案例分析，不披露真实当事人信息，不构成对具体案件结果的承诺。</p>
      </div>
    </section>
    <section class="section case-detail-section">
      <div class="shell two-column aligned-start">
        <article>
          ${sectionHeading("典型场景", "这类问题通常怎么发生")}
          <p class="large-copy">${item.scenario}</p>
          ${sectionHeading("争议焦点", "先把核心问题拆清楚")}
          ${renderList(item.focus)}
          ${sectionHeading("法律分析", "不能只看单一事实")}
          <p>${item.analysis}</p>
          ${sectionHeading("证据清单", "咨询前可以先整理这些材料")}
          ${renderList(item.evidence)}
          ${sectionHeading("处理路径", "协商、调解和诉讼如何衔接")}
          <p>${item.path}</p>
        </article>
        <aside class="privacy-aside">
          <p class="eyebrow">律师提示</p>
          <h2>先整理事实和证据，再判断路径</h2>
          <p>离婚业务和婚姻家事案件差异较大，本文只提供一般分析框架。具体方案需结合材料、证据、对方主张和程序阶段综合判断。</p>
          <div class="hero-actions">
            <a class="button primary" href="/contact/">联系咨询</a>
          </div>
        </aside>
      </div>
    </section>
    ${renderContact()}`;

  return renderLayout({
    title: item.title,
    description: item.description,
    path,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      articleSchema({ title: item.title, description: item.description, path, datePublished: "2026-06-22" }),
      breadcrumbSchema(breadcrumbs)
    ]
  });
};
