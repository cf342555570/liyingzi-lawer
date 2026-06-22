import { siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { homeFaqs } from "../data/faqs.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact, renderFaqs, renderOfficialChannels, sectionHeading } from "../components/sections.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  legalServiceSchema,
  organizationSchema,
  personSchema,
  servicePathHowToSchemas,
  speakableSchema,
  websiteSchema
} from "../components/json-ld.mjs";

export const homeMeta = Object.freeze({
  path: "/",
  title: "李英姿律师｜长沙婚姻家事法律服务｜湖南泰宗律师事务所",
  description:
    "李英姿律师，长沙婚姻家事律师，普法IP英姿律见，现执业于湖南泰宗律师事务所。离婚前先理清钱、房、债和子女安排，围绕协议审查、调解谈判、诉讼应对提供法律服务。"
});

const moneyHouseDebt = [
  ["钱", "存款、转账、彩礼、婚内大额支出、婚内赠与、补偿款等。"],
  ["房", "婚前房、婚后房、父母出资买房、婚前房婚后还贷、房本加名、按揭房分割等。"],
  ["债", "夫妻共同债务、一方个人借款、经营债务、网贷、亲友借款、资金流向等。"]
];

const consultationSteps = [
  ["01", "初步沟通", "了解婚姻状态、争议类型、当前阶段和主要担忧。"],
  ["02", "争议拆分", "判断是否涉及房产、彩礼、债务、子女抚养、协议或大额转账。"],
  ["03", "材料清单", "按钱、房、债、孩子和时间线整理现有材料，标记材料缺口。"],
  ["04", "路径选择", "再判断适合协议审查、调解谈判，还是诉讼应对。"]
];

const processTracks = [
  {
    title: "协议审查路径",
    intro: "适合已经有协议草稿或双方基本有沟通基础的情况，重点看条款是否清楚、完整、可执行。",
    steps: ["核对协议主体和基本信息", "审查房产、债务、抚养、探望、补偿条款", "标记模糊、遗漏或难履行的条款", "形成修改意见和后续履行提示"]
  },
  {
    title: "调解谈判路径",
    intro: "适合双方存在分歧但仍有沟通空间的情况，重点是先确定争议范围、材料基础和谈判底线。",
    steps: ["明确谈判目标和核心争议", "区分可协商事项和需保留证据事项", "准备彩礼、房产、债务、抚养等材料底稿", "固定协商成果并提示履行风险"]
  },
  {
    title: "诉讼应对路径",
    intro: "适合无法协商一致或已经进入诉讼程序的情况，重点是围绕事实、证据、请求和程序风险做准备。",
    steps: ["整理起诉或应诉基础材料", "梳理诉讼请求、答辩思路和争议焦点", "组织财产、债务、子女抚养等证据清单", "根据程序节点补充材料并提示后续安排"]
  }
];

const serviceModes = [
  {
    title: "协议审查",
    text: "协议不是能签字就可以。适用于双方已有沟通基础，希望通过协议处理离婚、财产、债务、子女抚养等事项的情况，重点看条款是否清楚、完整、可执行。",
    points: ["离婚协议审查", "婚前协议", "婚内财产约定", "抚养协议", "离婚后补充协议", "房产和债务条款审查"]
  },
  {
    title: "调解谈判",
    text: "谈判不是只靠让步。适用于双方存在分歧但仍有协商空间的婚姻家事问题，重点是先梳理争议范围、材料基础和谈判底线。",
    points: ["离婚谈判", "彩礼返还协商", "房产分割协商", "抚养权沟通", "夫妻共同债务协商", "婚内大额转账与赠与返还争议沟通"]
  },
  {
    title: "诉讼应对",
    text: "诉讼不是临时上场。适用于无法协商一致，或已经进入诉讼程序的离婚及婚姻家事争议，重点是围绕事实、证据、诉讼请求和程序风险准备。",
    points: ["诉讼离婚", "离婚财产分割", "彩礼返还", "子女抚养权争议", "夫妻共同债务", "离婚协议履行争议"]
  }
];

const typicalScenarios = [
  ["准备离婚，但不清楚财产、房产、债务如何整理", "先不要只问能不能离，先围绕钱、房、债形成清单，再判断协议、调解或诉讼路径。"],
  ["父母出资买房，离婚时房产归属有争议", "房本登记不是唯一因素，需要整理购房合同、出资流水、还贷记录、登记情况和双方约定。"],
  ["彩礼金额较高，双方对是否返还存在分歧", "彩礼争议不能只看是否领证，需要结合共同生活、转账凭证、礼金用途和双方情况判断。"],
  ["双方有子女，抚养权和探望安排谈不拢", "抚养权不是简单比较收入，需要梳理孩子实际照顾、生活稳定性、教育医疗和陪伴事实。"],
  ["一方婚内向婚外异性或第三方大额转账", "能否主张返还，关键看资金来源、转账性质、双方关系、用途和证据链是否能对应。"],
  ["离婚协议已经拟好，但条款写得不清楚", "协议条款模糊容易留下后续争议，应重点审查房产、债务、抚养费、探望、补偿和履行期限。"]
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
          <p class="hero-subtitle">协议能不能签、房子怎么列、债务谁来担，先把风险看清楚。</p>
          <p class="hero-intro">${lawyer.displayName}现执业于${lawyer.organization}。围绕长沙离婚业务和婚姻家事法律服务，重点处理离婚纠纷、彩礼返还、财产分割、子女抚养权、离婚协议审查、夫妻共同债务等问题。</p>
          <div class="hero-actions">
            <a class="button primary" href="${siteConfig.phoneHref}">电话 ${siteConfig.phone}</a>
            <a class="button secondary" href="#service-paths">先看服务路径</a>
          </div>
          <p class="hero-note">公众号：${lawyer.contentBrand}</p>
          <p class="legal-note">${siteConfig.sloganNotice}</p>
        </div>
        <aside class="identity-panel" aria-label="律师身份信息">
          <figure class="lawyer-photo"><img src="${relativeAsset(homeMeta.path, lawyer.imagePath)}" alt="${siteConfig.imageAlt}" width="1672" height="939" fetchpriority="high" loading="eager"></figure>
          <p class="eyebrow">身份信息</p>
          <h2>${lawyer.displayName}</h2>
          <dl>
            <div><dt>执业机构</dt><dd>${lawyer.organization}</dd></div>
            <div><dt>资质核验</dt><dd><a href="/qualifications/">湖南如法网官方平台</a></dd></div>
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

    <section class="section service-mode-section" id="service-paths">
      <div class="shell">
        ${sectionHeading("我们的服务", "不是只给结论，而是先判断路径", "围绕协议审查、调解谈判与诉讼应对，先理清钱、房、债和子女安排，再判断下一步怎么走。")}
        <div class="service-mode-grid">
          ${serviceModes.map((mode, index) => `<article class="service-mode-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(mode.title)}</h3><p>${escapeHtml(mode.text)}</p><ul>${mode.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></article>`).join("")}
        </div>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="shell">
        ${sectionHeading("核心业务", "婚姻家事服务方向", "每类问题的事实、证据和处理重点不同，先进入对应主题了解需要整理什么、注意什么。")}
        <div class="service-grid">
          ${services.slice(0, 9).map((service, index) => `<a class="service-card" href="${service.path}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.summary)}</p><strong>了解服务方向 →</strong></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section process-section">
      <div class="shell">
        ${sectionHeading("服务流程", "避免糊涂签、盲目谈、仓促诉", "先完成前期准备，再根据事实、证据和沟通基础进入协议审查、调解谈判或诉讼应对路径。")}
        <ol class="step-grid">${consultationSteps.map(([number, title, text]) => `<li><span>${number}</span><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol>
        <div class="process-path-grid">
          ${processTracks.map((track) => `<article class="process-path-card"><h3>${escapeHtml(track.title)}</h3><p>${escapeHtml(track.intro)}</p><ol>${track.steps.map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}
        </div>
        <p class="phase-note">以上流程为一般服务流程说明，不构成对案件结果的承诺。具体处理方式需结合事实、证据、双方情况和法律规定综合判断。</p>
      </div>
    </section>

    <section class="section scenario-section">
      <div class="shell">
        ${sectionHeading("典型服务场景", "把问题说清楚，才好判断下一步", "以下为常见婚姻家事问题场景，不代表具体案件结果。")}
        <div class="detail-grid">${typicalScenarios.map(([title, text]) => `<article class="detail-card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>
      </div>
    </section>

    <section class="section knowledge-section" id="legal-knowledge">
      <div class="shell">
        ${sectionHeading("普法专栏", "婚姻家事知识与实务指引", "围绕法律规则、证据清单和处理风险整理内容，帮助当事人在咨询前形成更清楚的问题框架。")}
        <div class="detail-grid">
          <article class="detail-card"><p class="eyebrow">法律规则与风险分析</p><h3><a href="/articles/">婚姻家事普法文章</a></h3><p>阅读离婚财产、彩礼、房产、抚养和债务等问题的法律规则与实务分析。</p><a href="/articles/"><strong>进入普法栏目 →</strong></a></article>
          <article class="detail-card"><p class="eyebrow">证据准备</p><h3><a href="/materials/">婚姻家事材料清单</a></h3><p>按争议类型查看需要整理的合同、流水、沟通记录和其他基础材料。</p><a href="/materials/"><strong>查看材料清单 →</strong></a></article>
          <article class="detail-card"><p class="eyebrow">咨询与办理准备</p><h3><a href="/guide/">婚姻家事实务指南</a></h3><p>了解咨询前的问题梳理、律师匹配判断和常见流程，减少无效准备。</p><a href="/guide/"><strong>查看实务指南 →</strong></a></article>
        </div>
      </div>
    </section>

    ${renderOfficialChannels()}
    ${renderFaqs(homeFaqs, { title: "长沙婚姻家事咨询常见问题" })}
    ${renderContact()}`;

  return renderLayout({
    ...homeMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      faqSchema(homeFaqs, "/"),
      breadcrumbSchema(breadcrumbs),
      howToSchema(),
      ...servicePathHowToSchemas(),
      speakableSchema("/", ".hero-copy h1, .hero-intro")
    ]
  });
};
