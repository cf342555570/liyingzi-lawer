import { siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs } from "./layout.mjs";

export const renderServiceHero = ({ service, breadcrumbs }) => `
  ${renderBreadcrumbs(breadcrumbs)}
  <section class="hero service-hero"><div class="shell service-hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">长沙婚姻家事法律服务</p><h1>${escapeHtml(service.h1)}</h1><p class="hero-intro">${escapeHtml(service.lead)}</p>
      <div class="hero-actions"><a class="button primary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a><a class="button secondary" href="#materials">查看材料清单</a></div>
      <p class="hero-note">${lawyer.displayName}｜${lawyer.organization}｜公众号：${lawyer.contentBrand}</p><p class="legal-note">${siteConfig.sloganNotice}</p>
    </div>
    <aside class="service-anchor-card" aria-label="服务信息"><img class="service-avatar" src="${relativeAsset(service.path, lawyer.imagePath)}" alt="长沙婚姻家事律师李英姿｜英姿律见 湖南泰宗律师事务所" width="1672" height="939" loading="lazy"><p class="eyebrow">核心业务</p><h2>${escapeHtml(service.name)}</h2><dl><div><dt>律师</dt><dd>${lawyer.displayName}</dd></div><div><dt>律所</dt><dd>${lawyer.organization}</dd></div><div><dt>执业城市</dt><dd>${lawyer.city}</dd></div><div><dt>电话</dt><dd><a href="${siteConfig.phoneHref}">${siteConfig.phone}</a></dd></div></dl></aside>
  </div></section>`;
