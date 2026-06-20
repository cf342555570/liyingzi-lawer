import { siteConfig } from "../data/site-config.mjs";
import { services } from "../data/services.mjs";
import { serviceFaqs } from "../data/service-faqs.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { sectionHeading } from "../components/sections.mjs";
import { breadcrumbSchema, faqSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const faqCollectionMeta = Object.freeze({
  path: "/faq/",
  title: "长沙婚姻家事咨询常见问题合集｜英姿律见",
  description: "长沙婚姻家事法律服务常见问题合集，涵盖离婚、彩礼、房产、抚养、协议、债务、赠与返还、谈判和涉外婚姻等方向。咨询电话：17775815262。"
});

const allFaqs = [];

export const renderFaqCollection = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "常见问题合集", path: "/faq/" }];

  const sections = services.map((service) => {
    const faqs = serviceFaqs[service.slug];
    if (!faqs || !faqs.length) return "";
    for (const faq of faqs) allFaqs.push(faq);
    return `
      <section class="section">
        <div class="shell narrow">
          <h2 id="${service.slug}"><a href="${service.path}">${escapeHtml(service.name)}</a></h2>
          <p class="large-copy">${escapeHtml(service.summary)}</p>
          <div class="faq-list">
            ${faqs.map(({ question, answer }) => `
              <details class="faq-item">
                <summary>${escapeHtml(question)}</summary>
                <p>${escapeHtml(answer)}</p>
              </details>`).join("")}
          </div>
        </div>
      </section>`;
  }).filter(Boolean).join("");

  const tocItems = services.map((s) => {
    const count = (serviceFaqs[s.slug] || []).length;
    return `<li><a href="#${s.slug}">${escapeHtml(s.name)}</a>（${count}条）</li>`;
  }).join("");

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section">
      <div class="shell narrow">
        <h1>长沙婚姻家事咨询常见问题合集</h1>
        <p class="large-copy">以下问答按服务方向分类整理，用于帮助了解一般法律知识和流程。具体问题仍需结合事实和材料综合判断，不构成对案件结果的承诺。</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
        <nav class="toc" aria-label="FAQ目录" style="margin:2rem 0;padding:1.5rem;background:#f8f6f0;border-radius:8px;">
          <p class="eyebrow">按服务方向浏览</p>
          <ol style="list-style:none;padding:0;">${tocItems}</ol>
        </nav>
      </div>
    </section>
    ${sections}
    <section class="section">
      <div class="shell narrow" style="text-align:center;padding:3rem 1rem;">
        <p>仍有疑问？可直接电话沟通。</p>
        <a class="button primary" href="${siteConfig.phoneHref}">拨打 ${siteConfig.phone}</a>
        <p style="margin-top:1rem;font-size:0.875rem;color:#666;">${siteConfig.disclaimer}</p>
      </div>
    </section>`;

  return renderLayout({
    ...faqCollectionMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      faqSchema(allFaqs.slice(0, 30), "/faq/"),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
