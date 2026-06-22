import { siteConfig, absoluteUrl, officialCredentialUrl } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";

const compact = (value) => {
  if (Array.isArray(value)) return value.map(compact).filter((item) => item !== undefined);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined && item !== null && item !== "")
        .map(([key, item]) => [key, compact(item)])
    );
  }
  return value;
};

const area = (type, name) => ({ "@type": type, name });
const areaServed = () => [area("City", siteConfig.city), ...siteConfig.districts.map((name) => area("AdministrativeArea", name)), area("AdministrativeArea", siteConfig.province)];
const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: siteConfig.address,
  addressLocality: siteConfig.city,
  addressRegion: siteConfig.province,
  addressCountry: "CN"
});

export const personSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": ["Person", "Attorney"],
    "@id": siteConfig.entityIds.person,
    name: lawyer.name,
    alternateName: lawyer.contentBrand,
    jobTitle: lawyer.jobTitle,
    description: lawyer.recommendedDescription,
    disambiguatingDescription: "长沙婚姻家事律师李英姿，普法IP英姿律见，现执业于湖南泰宗律师事务所。",
    url: absoluteUrl(lawyer.profilePath),
    image: absoluteUrl(lawyer.imagePath),
    telephone: lawyer.phone,
    identifier: lawyer.licenseNumber,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "律师执业资质",
      credentialID: lawyer.licenseNumber,
      recognizedBy: { "@type": "GovernmentOrganization", name: "湖南如法网" },
      url: officialCredentialUrl
    },
    memberOf: { "@id": siteConfig.entityIds.organization },
    worksFor: { "@id": siteConfig.entityIds.organization },
    knowsAbout: lawyer.knowsAbout,
    areaServed: areaServed(),
    sameAs: siteConfig.sameAs
  });

export const organizationSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "LegalService"],
    "@id": siteConfig.entityIds.organization,
    name: siteConfig.organization,
    url: siteConfig.origin,
    telephone: siteConfig.organizationPhone,
    email: siteConfig.organizationEmail,
    address: postalAddress(),
    hasMap: siteConfig.amapNavigationUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.146,
      longitude: 113.034
    },
    areaServed: areaServed(),
    member: { "@id": siteConfig.entityIds.person }
  });

export const legalServiceSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": siteConfig.entityIds.legalService,
    name: "长沙婚姻家事法律服务｜李英姿律师｜英姿律见",
    serviceType: "婚姻家事法律服务",
    description: lawyer.recommendedDescription,
    url: absoluteUrl(lawyer.profilePath),
    telephone: siteConfig.phone,
    address: postalAddress(),
    hasMap: siteConfig.amapNavigationUrl,
    areaServed: areaServed(),
    parentOrganization: { "@id": siteConfig.entityIds.organization },
    provider: { "@id": siteConfig.entityIds.person },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "长沙婚姻家事业务",
      itemListElement: services.slice(0, 9).map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(service.path)
        }
      }))
    }
  });

export const geoAreaServiceSchema = (geoArea) =>
  compact({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${absoluteUrl(geoArea.path)}#legalservice`,
    name: `${geoArea.name}婚姻家事法律服务｜李英姿律师`,
    serviceType: "婚姻家事法律服务",
    description: geoArea.description,
    url: absoluteUrl(geoArea.path),
    telephone: siteConfig.phone,
    areaServed: area("AdministrativeArea", geoArea.name),
    provider: { "@id": siteConfig.entityIds.person },
    parentOrganization: { "@id": siteConfig.entityIds.organization },
    isPartOf: { "@id": siteConfig.entityIds.legalService }
  });

export const servicePageSchema = (service) =>
  compact({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.h1,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    telephone: siteConfig.phone,
    areaServed: area("City", siteConfig.city),
    provider: { "@id": siteConfig.entityIds.person },
    parentOrganization: { "@id": siteConfig.entityIds.organization },
    isPartOf: { "@id": siteConfig.entityIds.legalService }
  });

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteConfig.entityIds.website,
  name: siteConfig.name,
  url: siteConfig.origin,
  inLanguage: siteConfig.locale,
  publisher: { "@id": siteConfig.entityIds.organization },
  about: { "@id": siteConfig.entityIds.person }
});

export const faqSchema = (faqs, pagePath) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl(pagePath)}#faq`,
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }))
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
});

export const howToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${siteConfig.origin}/#consultation-howto`,
  name: "咨询长沙婚姻家事律师的一般流程",
  step: [
    ["初步沟通", "了解婚姻状态、争议类型、当前阶段和当事人主要担忧。"],
    ["材料梳理", "制作婚姻时间线，整理钱、房、债、子女抚养和证据材料。"],
    ["路径判断", "结合材料基础判断协议审查、调解谈判或诉讼应对路径。"],
    ["依法办理", "根据需要审查协议、准备文书、推进沟通或诉讼准备，并提示后续履行风险。"]
  ].map(([name, text], index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name,
    text
  }))
});

export const servicePathHowToSchemas = () => [
  {
    id: "agreement-review-howto",
    name: "离婚协议审查的一般流程",
    steps: [
      ["核对基础信息", "核对协议主体、婚姻状态、子女信息和财产债务基本情况。"],
      ["审查核心条款", "审查房产、债务、抚养、探望、补偿和履行期限等条款。"],
      ["标记风险条款", "标记表达模糊、遗漏事项、履行路径不清或后续争议风险。"],
      ["形成修改意见", "根据材料和沟通情况形成协议修改意见及后续履行提示。"]
    ]
  },
  {
    id: "mediation-negotiation-howto",
    name: "离婚调解谈判的一般流程",
    steps: [
      ["明确争议范围", "明确双方争议集中在财产、房产、彩礼、抚养、债务或其他事项。"],
      ["整理谈判材料", "整理转账流水、房产材料、债务凭证、子女照顾事实等基础材料。"],
      ["判断协商空间", "区分可协商事项、底线事项和需要继续保留证据的事项。"],
      ["固定沟通成果", "对协商结果形成书面记录，并提示后续履行和违约风险。"]
    ]
  },
  {
    id: "litigation-response-howto",
    name: "诉讼离婚应对的一般流程",
    steps: [
      ["整理诉讼材料", "整理身份、婚姻登记、财产、债务、子女抚养及沟通记录等材料。"],
      ["梳理争议焦点", "围绕诉讼请求、答辩思路、证据目标和程序节点梳理争议焦点。"],
      ["组织证据清单", "按财产分割、债务承担、抚养安排等问题组织证据清单。"],
      ["跟进程序节点", "根据立案、举证、开庭、调解或判后履行等节点提示材料补充和风险变化。"]
    ]
  }
].map(({ id, name, steps }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${siteConfig.origin}/#${id}`,
  name,
  step: steps.map(([stepName, text], index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: stepName,
    text
  }))
}));

export const speakableSchema = (path, cssSelector = ".hero-copy h1, .hero-intro") => ({
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: [cssSelector]
});

export const contactPageSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact/"),
    name: "联系李英姿律师",
    description: "通过电话或微信联系李英姿律师，咨询长沙婚姻家事法律服务。",
    about: { "@id": siteConfig.entityIds.legalService },
    provider: { "@id": siteConfig.entityIds.person }
  });

export const articleSchema = ({ title, description, path, datePublished }) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(lawyer.imagePath),
    datePublished,
    dateModified: datePublished,
    author: { "@id": siteConfig.entityIds.person },
    publisher: { "@id": siteConfig.entityIds.organization },
    about: { "@id": siteConfig.entityIds.legalService }
  });

export const renderJsonLd = (schemas) =>
  schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(compact(schema)).replace(/</g, "\\u003c")}</script>`)
    .join("\n");
