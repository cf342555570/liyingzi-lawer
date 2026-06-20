import { siteConfig } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { servicePages } from "../data/service-pages.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact, sectionHeading } from "../components/sections.mjs";
import { breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const materialsMeta = Object.freeze({
  path: "/materials/",
  title: "婚姻家事材料清单合集｜英姿律见｜李英姿律师",
  description: "长沙婚姻家事法律服务各方向材料清单合集，包括离婚、彩礼、房产、抚养、协议、债务、赠与返还、谈判和涉外婚姻等问题的材料准备参考。"
});

const servicePageBySlug = Object.fromEntries(
  servicePages.map((s) => [s.slug, s])
);

export const renderMaterials = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "材料清单合集", path: "/materials/" }];

  const sections = services.map((service) => {
    const page = servicePageBySlug[service.slug];
    if (!page || !page.materials || !page.materials.length) return "";
    return `
      <section class="section" style="page-break-before:auto;">
        <div class="shell narrow">
          <h2 id="${service.slug}"><a href="${service.path}">${escapeHtml(service.name)}</a></h2>
          <p class="large-copy">${escapeHtml(page.lead)}</p>
          <ol class="material-list">
            ${page.materials.map((m, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><p>${escapeHtml(m)}</p></li>`).join("")}
          </ol>
        </div>
      </section>`;
  }).filter(Boolean).join("");

  const tocItems = services.map((s) =>
    `<li><a href="#${s.slug}">${escapeHtml(s.name)}</a> — ${escapeHtml(s.summary)}</li>`
  ).join("");

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section">
      <div class="shell narrow">
        <h1>婚姻家事材料清单合集</h1>
        <p class="large-copy">以下材料清单按服务方向分类，用于帮助当事人在咨询前了解大致需要准备哪些材料。材料暂时不齐时，可以先列目录并标记缺项，不建议通过公开渠道发送非必要隐私信息。</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
        <nav class="toc" aria-label="材料清单目录" style="margin:2rem 0;padding:1.5rem;background:#f8f6f0;border-radius:8px;">
          <p class="eyebrow">目录</p>
          <ol style="list-style:none;padding:0;">${tocItems}</ol>
        </nav>
        <p style="font-size:0.875rem;color:#666;">共 ${services.length} 个服务方向的材料清单。点击方向名称可跳转到对应服务页查看完整说明。</p>
      </div>
    </section>
    ${sections}
    <section class="section">
      <div class="shell narrow">
        <div class="privacy-card" style="background:#f8f6f0;padding:1.5rem;border-radius:8px;">
          <p class="eyebrow">隐私提醒</p>
          <h2>先脱敏，再沟通</h2>
          <p>初步沟通无需提交身份证号、详细住址或未成年人完整身份信息。确有办理需要时，再按律所要求通过适当方式提供必要材料。</p>
        </div>
      </div>
    </section>
    ${renderContact()}`;

  return renderLayout({
    ...materialsMeta,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs)]
  });
};
