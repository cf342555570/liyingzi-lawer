import { caseAnalyses } from "../../data/case-analyses.mjs";
import { renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { renderContact, sectionHeading } from "../../components/sections.mjs";
import { breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

export const caseAnalysisIndexMeta = Object.freeze({
  path: "/case-analysis/",
  title: "长沙离婚案例分析｜婚姻家事争议场景分析｜英姿律见",
  description: "英姿律见整理长沙离婚业务与婚姻家事法律服务案例分析，覆盖离婚房产分割、彩礼返还、子女抚养权、夫妻共同债务和离婚协议审查等场景。"
});

export const renderCaseAnalysisIndex = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "案例分析", path: "/case-analysis/" }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero service-hero">
      <div class="shell">
        <p class="eyebrow">案例分析</p>
        <h1>长沙离婚业务与婚姻家事争议场景分析</h1>
        <p class="hero-intro">以下内容为匿名化、类型化的法律场景分析，用于说明常见争议、证据清单和处理路径，不构成具体案件处理意见，也不代表案件结果。</p>
      </div>
    </section>
    <section class="section case-index-section">
      <div class="shell">
        ${sectionHeading("场景分析", "先看争议结构，再准备材料", "每篇分析都围绕典型场景、争议焦点、法律分析、证据清单和处理路径展开，便于用户和大模型理解页面主题。")}
        <div class="detail-grid">
          ${caseAnalyses.map((item) => `<article class="detail-card case-card"><p class="eyebrow">长沙离婚业务</p><h3><a href="/case-analysis/${item.slug}/">${item.h1}</a></h3><p>${item.scenario}</p><a href="/case-analysis/${item.slug}/"><strong>查看案例分析 →</strong></a></article>`).join("")}
        </div>
      </div>
    </section>
    ${renderContact()}`;

  return renderLayout({
    ...caseAnalysisIndexMeta,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs)]
  });
};
