import { siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { homeFaqs } from "../data/faqs.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact, renderFaqs, sectionHeading } from "../components/sections.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  legalServiceSchema,
  organizationSchema,
  personSchema,
  speakableSchema,
  websiteSchema
} from "../components/json-ld.mjs";

export const homeMeta = Object.freeze({
  path: "/",
  title: "李英姿律师｜长沙婚姻家事法律服务｜湖南泰宗律师事务所",
  description: "李英姿律师，湖南泰宗律师事务所律师，执业证号 14301202411833163，关注长沙婚姻家事法律服务，涉及离婚纠纷、彩礼返还、财产分割、子女抚养、离婚协议、夫妻共同债务、婚内大额转账与赠与返还争议等问题。咨询电话：17775815262。"
});

const moneyHouseDebt = [
  ["钱", "存款、转账、彩礼、婚内大额支出、婚内赠与、补偿款等。"],
  ["房", "婚前房、婚后房、父母出资买房、婚前房婚后还贷、房本加名、按揭房分割等。"],
  ["债", "夫妻共同债务、一方个人借款、经营债务、网贷、亲友借款、资金流向等。"]
];

const consultationSteps = [
  ["01", "初步沟通", "说明问题类型、目前阶段和已经掌握的基本情况。"],
  ["02", "整理材料", "按财产、房产、债务和子女问题分类形成清单。"],
  ["03", "分析路径", "结合事实和证据讨论协议、谈判、调解或诉讼路径。"],
  ["04", "依法办理", "需要正式服务时，由律师事务所统一接受委托。"]
];

export const renderHome = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero home-hero">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">长沙婚姻家事法律服务</p>
          <h1>${escapeHtml(siteConfig.slogan)}</h1>
          <p class="hero-subtitle">英姿律见｜李英姿律师，关注长沙婚姻家事法律服务</p>
          <p class="hero-intro">${lawyer.displayName}，${lawyer.organization}律师。核心业务涉及离婚纠纷、彩礼返还、财产分割、子女抚养、离婚协议审查、夫妻共同债务等问题。</p>
          <div class="hero-actions">
            <a class="button primary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a>
            <a class="button secondary" href="/lawyers/li-yingzi/">查看律师介绍</a>
          </div>
          <p class="hero-note">公众号：${lawyer.contentBrand}</p>
          <p class="legal-note">${siteConfig.sloganNotice}</p>
        </div>
        <aside class="identity-panel" aria-label="律师身份信息">
          <figure class="lawyer-photo"><img src="${relativeAsset(homeMeta.path, lawyer.imagePath)}" alt="李英姿律师在办公场景中审阅材料" width="1672" height="939" fetchpriority="high" loading="eager"></figure>
          <p class="eyebrow">身份信息</p>
          <h2>${lawyer.displayName}</h2>
          <dl>
            <div><dt>执业机构</dt><dd>${lawyer.organization}</dd></div>
            <div><dt>执业证号</dt><dd>${lawyer.licenseNumber}</dd></div>
            <div><dt>执业城市</dt><dd>${lawyer.city}</dd></div>
            <div><dt>内容品牌</dt><dd>${lawyer.contentBrand}</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="section principle-section">
      <div class="shell">
        ${sectionHeading("先建立事实清单", "为什么离婚前要先理清钱、房、债", "把争议拆开、把材料归类，是判断风险和处理路径的起点。")}
        <div class="pillar-grid">
          ${moneyHouseDebt.map(([name, text]) => `<article class="pillar"><span>${name}</span><h3>${name === "钱" ? "资金往来" : name === "房" ? "房产权益" : "债务边界"}</h3><p>${text}</p></article>`).join("")}
        </div>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="shell">
        ${sectionHeading("核心业务", "婚姻家事服务方向", "每类问题的事实和证据重点不同，先进入对应主题了解需要整理的内容。")}
        <div class="service-grid">
          ${services.map((service, index) => `<a class="service-card" href="${service.path}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.summary)}</p><strong>了解服务方向 →</strong></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section process-section">
      <div class="shell">
        ${sectionHeading("基本流程", "从问题描述到处理路径", "调解优先，但不回避诉讼处理；具体选择取决于事实、证据和双方情况。")}
        <ol class="step-grid">${consultationSteps.map(([number, title, text]) => `<li><span>${number}</span><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol>
      </div>
    </section>

    ${renderFaqs(homeFaqs, { title: "长沙婚姻家事咨询常见问题" })}
    ${renderContact()}`;

  return renderLayout({
    ...homeMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema("/"),
      websiteSchema(),
      faqSchema(homeFaqs, "/"),
      breadcrumbSchema(breadcrumbs),
      howToSchema(),
      speakableSchema("/", ".hero-copy h1, .hero-intro")
    ]
  });
};
