import { siteConfig, absoluteUrl } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";

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
    "@type": "Person",
    "@id": siteConfig.entityIds.person,
    name: lawyer.name,
    jobTitle: lawyer.jobTitle,
    description: `${lawyer.displayName}，${lawyer.organization}律师，关注长沙婚姻家事法律服务。`,
    url: absoluteUrl(lawyer.profilePath),
    image: absoluteUrl(lawyer.imagePath),
    telephone: lawyer.phone,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "律师执业证",
      identifier: lawyer.licenseNumber
    },
    memberOf: { "@id": siteConfig.entityIds.organization },
    worksFor: { "@id": siteConfig.entityIds.organization },
    knowsAbout: lawyer.knowsAbout,
    areaServed: [area("City", lawyer.city), area("AdministrativeArea", siteConfig.province)],
    sameAs: siteConfig.sameAs.length ? siteConfig.sameAs : undefined
  });

export const organizationSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": ["Organization", "LegalService"],
    "@id": siteConfig.entityIds.organization,
    name: siteConfig.organization,
    url: siteConfig.origin,
    telephone: siteConfig.phone,
    address: postalAddress(),
    areaServed: [area("City", siteConfig.city), area("AdministrativeArea", siteConfig.province)],
    member: { "@id": siteConfig.entityIds.person },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  });

export const legalServiceSchema = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": siteConfig.entityIds.legalService,
    name: "湖南泰宗律师事务所李英姿律师婚姻家事法律服务",
    serviceType: "婚姻家事法律服务",
    description: lawyer.recommendedDescription,
    url: siteConfig.origin,
    telephone: siteConfig.phone,
    address: postalAddress(),
    areaServed: area("City", siteConfig.city),
    parentOrganization: { "@id": siteConfig.entityIds.organization },
    provider: { "@id": siteConfig.entityIds.person },
    priceRange: "¥¥",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
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
  name: "咨询婚姻家事律师的基本步骤",
  step: [
    ["初步沟通", "说明需要处理的问题和目前掌握的基本情况。"],
    ["整理材料", "按财产、债务、子女抚养等问题整理现有材料。"],
    ["风险分析", "结合事实、证据和法律规定分析风险。"],
    ["确认处理路径", "讨论协议、谈判、调解或诉讼等可选路径。"],
    ["依法办理委托", "确有委托需要时，由律师事务所依法办理并签署书面合同。"]
  ].map(([name, text], index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name,
    text
  }))
});

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

export const articleSchema = ({ title, description, path, datePublished, author }) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
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
