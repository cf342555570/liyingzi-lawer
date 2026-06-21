import { siteConfig } from "../data/site-config.mjs";
import { geoAreas } from "../data/geo-areas.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { sectionHeading } from "../components/sections.mjs";
import { breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const areasIndexMeta = Object.freeze({
  path: "/areas/",
  title: "长沙婚姻家事法律服务区域｜九个区县｜李英姿律师",
  description: "李英姿律师婚姻家事法律服务以长沙为主要区域，覆盖芙蓉区、雨花区、天心区、岳麓区、开福区、长沙县、望城区、宁乡市和浏阳市。"
});

export const renderAreasIndex = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "长沙服务区域", path: "/areas/" }];
  const body = `${renderBreadcrumbs(breadcrumbs)}
    <section class="section"><div class="shell narrow"><p class="eyebrow">长沙全域服务</p><h1>长沙婚姻家事法律服务区域</h1><p class="large-copy">${areasIndexMeta.description}</p><p class="legal-note">${siteConfig.sloganNotice}</p></div></section>
    <section class="section" style="padding-top:0"><div class="shell">
      ${sectionHeading("区县入口", "按所在地查看婚姻家事服务说明", "区县页面用于帮助整理本地问题与材料，具体管辖和处理路径仍需结合实际情况判断。")}
      <div class="service-grid">${geoAreas.map((area) => `<a class="service-card" href="${area.path}"><h2>${escapeHtml(area.name)}</h2><p>${escapeHtml(area.description)}</p><strong>查看${escapeHtml(area.name)}服务说明 →</strong></a>`).join("")}</div>
    </div></section>`;
  return renderLayout({ ...areasIndexMeta, body, schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs), howToSchema()] });
};
