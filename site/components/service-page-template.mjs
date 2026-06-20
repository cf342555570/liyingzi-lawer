import { servicePageBySlug } from "../data/service-pages.mjs";
import { serviceFaqs } from "../data/service-faqs.mjs";
import { renderLayout } from "./layout.mjs";
import { renderServiceBody } from "./service-sections.mjs";
import { breadcrumbSchema, faqSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, servicePageSchema, websiteSchema } from "./json-ld.mjs";

export const renderServicePage = (service) => {
  const faqs = serviceFaqs[service.slug];
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "婚姻家事服务", path: "/#services" }, { name: service.name, path: service.path }];
  const related = service.related.map((slug) => servicePageBySlug[slug]);
  return renderLayout({
    title: service.title, description: service.description, path: service.path,
    body: renderServiceBody({ service, faqs, breadcrumbs, related }),
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), servicePageSchema(service), websiteSchema(), faqSchema(faqs, service.path), breadcrumbSchema(breadcrumbs), howToSchema()]
  });
};
