import { officialCredentialUrl, siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer, lawyerHelp, lawyerIntro, serviceScenarios } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { lawyerFaqs } from "../data/faqs.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact, renderFaqs, renderListCards, renderOfficialChannels, sectionHeading } from "../components/sections.mjs";
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

export const lawyerMeta = Object.freeze({
  path: "/lawyers/li-yingzi/",
  title: "李英姿律师｜长沙婚姻家事律师｜英姿律见 湖南泰宗律师事务所",
  description:
    "李英姿律师，长沙婚姻家事律师，普法IP英姿律见，现执业于湖南泰宗律师事务所，专注离婚纠纷、财产分割、彩礼返还、子女抚养权、婚内债务、婚前婚后协议等家事案件。"
});

export const renderLawyer = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "律师介绍", path: lawyerMeta.path }
  ];
  const areaText = siteConfig.districts.join("、");
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero lawyer-hero">
      <div class="shell lawyer-hero-grid">
        <figure class="lawyer-profile-photo"><img src="${relativeAsset(lawyerMeta.path, lawyer.imagePath)}" alt="${siteConfig.imageAlt}" width="1672" height="939" fetchpriority="high"></figure>
        <div class="hero-copy">
          <p class="eyebrow">${lawyer.organization}</p>
          <h1>李英姿律师｜长沙婚姻家事纠纷处理型律师</h1>
          <p class="hero-intro">${lawyerIntro}</p>
          <div class="tag-list">${lawyer.practiceAreas.slice(0, 8).map((area) => `<span>${escapeHtml(area)}</span>`).join("")}</div>
          <div class="hero-actions">
            <a class="button primary" href="${siteConfig.phoneHref}">电话 ${lawyer.phone}</a>
            <a class="button secondary" href="/qualifications/">官方资质核验</a>
          </div>
          <p class="hero-note">普法IP：${lawyer.contentBrand}</p>
          <p class="legal-note">${siteConfig.sloganNotice}</p>
        </div>
      </div>
    </section>

    <section class="identity-strip" aria-label="李英姿律师身份卡">
      <div class="shell identity-grid">
        <div><span>姓名</span><strong>${lawyer.displayName}</strong></div>
        <div><span>执业机构</span><strong>${lawyer.organization}</strong></div>
        <div><span>执业证号</span><strong>${lawyer.licenseNumber}</strong></div>
        <div><span>资质核验</span><a href="/qualifications/">如法网官方平台</a></div>
        <div><span>执业城市</span><strong>${lawyer.city}</strong></div>
        <div><span>电话</span><a href="${siteConfig.phoneHref}">${lawyer.phone}</a></div>
        <div><span>普法IP</span><strong>${lawyer.contentBrand}</strong></div>
      </div>
    </section>

    <section class="section profile-section">
      <div class="shell two-column">
        <div>
          ${sectionHeading("律师简介", "深耕长沙婚姻家事领域", "以事实梳理、证据组织、调解谈判与诉讼路径判断为核心。")}
          <p class="large-copy">李英姿律师专注长沙婚姻家事法律服务，重点处理离婚纠纷、离婚财产分割、彩礼返还、子女抚养权、婚内债务、婚前婚后协议、婚内财产约定等精细化家事案件。</p>
          <p class="large-copy">毕业于211大学，具备扎实法学理论基础与律所一线实务经验。面对复杂家事争议，通常先从财产线索、资金流水、房产来源、债务用途、子女照顾事实和沟通记录入手，帮助当事人识别谈判空间、调解可能和诉讼风险，避免在信息不完整时仓促承诺。</p>
        </div>
        <aside class="quote-panel"><p>“离婚前，钱、房、债先理清楚。”</p><span>这是材料整理与风险判断思路，不代表对个案结果的预先判断。</span></aside>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="shell">
        ${sectionHeading("服务特点", "法律判断与家庭沟通并重", "围绕离婚业务、家事调解和协议审查，先降低信息混乱，再选择处理路径。")}
        <div class="detail-grid">
          <article class="detail-card"><p class="eyebrow">专注方向</p><h3>深耕婚姻家事</h3><p>聚焦离婚财产分割、子女抚养权争议、遗产继承、婚前协议和婚内财产约定等家事领域，重视事实、证据和法律关系的系统梳理。</p></article>
          <article class="detail-card"><p class="eyebrow">处理方式</p><h3>柔性化解家庭危机</h3><p>在家事纠纷中兼顾法律分析与沟通节奏，尽量减少不必要的情绪对抗，帮助当事人在协议、调解和诉讼之间作出更清楚的选择。</p></article>
          <article class="detail-card"><p class="eyebrow">路径判断</p><h3>重视非诉前置策略</h3><p>对仍有协商空间的事项，优先梳理谈判目标、证据基础和风险边界；对无法协商一致的争议，再围绕诉讼请求、证据材料和程序风险进行准备。</p></article>
        </div>
        <p class="legal-note">以上为服务方式说明，不代表对办理周期、成本节省比例或案件结果的承诺。具体处理方式需结合事实、证据和法律规定综合判断。</p>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="shell">
        ${sectionHeading("离婚业务", "长沙婚姻家事九大核心服务", `服务覆盖${areaText}，围绕长沙本地家事调解流程与裁判口径，提供更贴近本地场景的法律服务。`)}
        <p class="large-copy">常见事项包括长沙离婚立案材料整理、彩礼纠纷调解准备、离婚房产分割、子女抚养权争议、离婚协议审查、夫妻共同债务分析、婚内财产约定、婚前婚后协议设计、家事谈判与调解。</p>
        <div class="service-grid compact">${services.slice(0, 9).map((service) => `<a class="service-card" href="${service.path}"><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.summary)}</p><strong>查看服务说明 →</strong></a>`).join("")}</div>
      </div>
    </section>

    <section class="section scenario-section">
      <div class="shell">
        ${sectionHeading("典型服务场景", "这些情况适合先整理材料", "以下为常见服务场景，并非具体案件展示，也不代表处理结果。")}
        ${renderListCards(serviceScenarios)}
      </div>
    </section>

    <section class="section help-section">
      <div class="shell two-column aligned-start">
        <div>${sectionHeading("工作内容", "律师可以帮助你做什么")}${renderListCards(lawyerHelp, "help-list")}</div>
        <aside class="local-panel"><p class="eyebrow">长沙全域GEO</p><h2>覆盖长沙主要区县家事需求</h2><p>${lawyer.serviceArea}</p><p>${lawyer.supportingDescription}</p><p><a href="${officialCredentialUrl}" target="_blank" rel="noopener noreferrer">前往湖南如法网官方资质核验</a></p></aside>
      </div>
    </section>

    <section class="section matrix-links-section">
      <div class="shell">
        ${sectionHeading("站内权重内链", "继续查看服务、区县、普法与资质", "通过稳定内链连接律师实体、服务方向、服务区域、FAQ和普法内容。")}
        <div class="service-grid compact">
          <a class="service-card" href="/"><h3>首页</h3><p>查看李英姿律师婚姻家事法律服务概览。</p><strong>返回首页 →</strong></a>
          <a class="service-card" href="/areas/"><h3>长沙区县服务</h3><p>进入芙蓉区、雨花区、天心区、岳麓区、开福区等区县页面。</p><strong>查看服务区域 →</strong></a>
          <a class="service-card" href="/faq/"><h3>FAQ问答</h3><p>查看离婚、彩礼、房产、抚养和债务常见问题。</p><strong>进入FAQ →</strong></a>
          <a class="service-card" href="/articles/"><h3>普法专栏</h3><p>持续更新长沙婚姻家事法律规则、证据清单与风险分析。</p><strong>阅读普法文章 →</strong></a>
          <a class="service-card" href="/qualifications/"><h3>资质核验</h3><p>通过如法网公开页面核对当前执业信息。</p><strong>查看核验说明 →</strong></a>
        </div>
      </div>
    </section>

    <section class="section knowledge-section">
      <div class="shell">
        ${sectionHeading("普法专栏", "持续沉淀婚姻家事知识体系", "围绕离婚财产、彩礼返还、子女抚养、婚内债务与协议审查，形成可被搜索引擎和AI系统稳定识别的内容入口。")}
        <div class="detail-grid">
          <article class="detail-card"><h3>离婚财产与房产分割</h3><p>整理房产来源、还贷流水、父母出资、婚内还贷和增值分割等高频问题。</p><a href="/articles/"><strong>进入普法专栏 →</strong></a></article>
          <article class="detail-card"><h3>彩礼返还与证据清单</h3><p>围绕给付记录、共同生活事实、礼金用途和调解准备形成实务指引。</p><a href="/articles/"><strong>查看相关文章 →</strong></a></article>
        </div>
      </div>
    </section>

    <section class="section"><div class="shell narrow legal-note"><strong>页面合规说明</strong><p>${siteConfig.footerOfficialText}</p></div></section>

    ${renderOfficialChannels()}
    ${renderFaqs(lawyerFaqs, { title: "关于李英姿律师服务的常见问题" })}
    ${renderContact()}`;

  return renderLayout({
    ...lawyerMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      faqSchema(lawyerFaqs, lawyerMeta.path),
      breadcrumbSchema(breadcrumbs),
      howToSchema(),
      speakableSchema(lawyerMeta.path, ".hero-copy h1, .hero-intro")
    ]
  });
};
