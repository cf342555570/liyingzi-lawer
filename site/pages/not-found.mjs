import { siteConfig } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const notFoundMeta = Object.freeze({
  path: "/404.html",
  title: "页面未找到｜英姿律见｜李英姿律师",
  description: "您访问的页面不存在。如需咨询长沙婚姻家事法律服务，可拨打 17775815262 或返回首页。"
});

export const renderNotFound = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "页面未找到", path: "/404.html" }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section not-found-section">
      <div class="shell narrow" style="text-align:center;padding:4rem 1rem;">
        <h1>页面未找到</h1>
        <p style="font-size:1.125rem;margin:1rem 0 2rem;">您访问的页面不存在或已被移除。</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <a class="button primary" href="/">返回首页</a>
          <a class="button secondary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a>
        </div>
        <p style="margin-top:2rem;color:#666;">${lawyer.displayName}｜${siteConfig.organization}｜长沙婚姻家事法律服务</p>
        <p style="font-size:0.875rem;color:#999;margin-top:0.5rem;">${siteConfig.sloganNotice}</p>
      </div>
    </section>`;

  return renderLayout({
    ...notFoundMeta,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs)]
  });
};
