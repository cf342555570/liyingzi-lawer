import { siteConfig } from "../../data/site-config.mjs";
import { lawyer } from "../../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { renderContact, sectionHeading } from "../../components/sections.mjs";
import { articleSchema, breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

export const guideMeta = Object.freeze({
  path: "/guide/5-questions-before-hiring/",
  title: "找离婚律师前需要问清楚的5个问题｜英姿律见",
  description: "找离婚律师前，可以先问清楚律师的业务方向、处理思路、收费方式、沟通安排和委托流程。帮助判断律师是否适合处理你的案件。"
});

export const renderGuide = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "指南", path: "/guide/" },
    { name: "找律师前要问清的5个问题", path: guideMeta.path }
  ];
  const datePublished = "2026-06-20";

  const questions = [
    [
      "律师主要关注哪些业务方向？",
      "不同律师关注的方向不同。可以先了解律师是否主要处理婚姻家事案件，对离婚纠纷、彩礼返还、房产分割、子女抚养、夫妻共同债务等问题是否熟悉。如果案件涉及公司股权、涉外因素或大额财产，可以对应了解律师是否处理过类似情况。这能帮助判断律师的业务方向和能力是否与案件匹配。"
    ],
    [
      "律师如何看待我的案子，处理思路是什么？",
      "可以先向律师说明案件基本情况，请律师从专业角度分析争议焦点、可能的风险和不同的处理路径。注意区分律师的风险分析（基于事实和法律规定判断）和结果承诺（声称可以确保案件走向）。律师行业规范不允许承诺案件结果，如果某位律师做出明确结果承诺，应慎重考虑。"
    ],
    [
      "法律服务费用如何确定和收取？",
      "不同案件的工作量差异较大，律师通常需要了解案件基本情况后说明费用结构。你可以问清楚：是按件收费、按小时收费还是阶段收费；费用包含了哪些工作内容；是否还需要额外支付诉讼费、鉴定费等。具体费用以律所沟通及委托合同约定为准。"
    ],
    [
      "案件由哪位律师主办，沟通方式是怎样的？",
      "有些案件可能由主办律师与团队成员协作处理。可以先了解主要联系人和沟通频率，以及重要事项的反馈时效。对于材料提交、证据整理和庭前准备，提前明确双方配合方式有助于顺畅推进。"
    ],
    [
      "委托流程是怎样的，什么时候签合同？",
      "正式委托一般需要签署书面委托合同，由律师事务所统一接受委托。可以先了解需要携带哪些身份和案件材料，委托合同的主要内容是什么。初步咨询不等于形成委托关系，不要因为一次沟通就认为自己已经委托了律师。"
    ]
  ];

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <article class="section" aria-labelledby="guide-title">
      <div class="shell narrow">
        <p class="eyebrow">实用指南</p>
        <h1 id="guide-title">找离婚律师前需要问清楚的5个问题</h1>
        <p style="color:#666;font-size:0.875rem;">发布日期：${datePublished} · ${lawyer.displayName} · ${lawyer.organization}</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>

        <p class="large-copy">找律师处理离婚、财产分割或子女抚养问题，不只是找一个法律服务者，也是在为一段重要的人生选择寻找专业支持。初次沟通时问清以下5个问题，有助于判断律师是否适合你的情况。</p>

        ${questions.map(([q, a], i) => `
          <h2>问题${i + 1}：${escapeHtml(q)}</h2>
          <p>${escapeHtml(a)}</p>
        `).join("")}

        <h2>补充建议</h2>
        <ul>
          <li>第一次咨询前，先把自己的问题、时间线和已有材料大致列出，提高沟通效率。</li>
          <li>可以同时了解几位律师的服务方向和处理思路，选择自己觉得风格契合、沟通顺畅的律师。</li>
          <li>不要仅凭搜索结果或广告宣传做决定，亲自沟通后的感受比网页上的介绍更可靠。</li>
          <li>任何法律服务都应签署书面委托合同，口头承诺不等于正式委托。</li>
        </ul>

        <div class="privacy-card" style="background:#f8f6f0;padding:1.5rem;border-radius:8px;margin:2rem 0;">
          <p class="eyebrow">说明</p>
          <p>本文不针对任何具体律师或律所，仅提供一般性建议，不构成对任何法律服务或结果的推荐或承诺。选择律师时请结合自身情况和实际沟通判断。</p>
          <p>${siteConfig.disclaimer}</p>
        </div>
      </div>
    </article>
    ${renderContact()}`;

  return renderLayout({
    ...guideMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      articleSchema({
        title: guideMeta.title,
        description: guideMeta.description,
        path: guideMeta.path,
        datePublished,
        author: lawyer.displayName
      }),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
