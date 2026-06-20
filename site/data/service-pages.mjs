import { divorceAndBetrothal } from "./service-groups/divorce-and-betrothal.mjs";
import { propertyAndCustody } from "./service-groups/property-and-custody.mjs";
import { agreementAndDebt } from "./service-groups/agreement-and-debt.mjs";
import { transferAndNegotiation } from "./service-groups/transfer-and-negotiation.mjs";
import { shewaiHunyin } from "./service-groups/shewai-hunyin.mjs";

export const servicePages = Object.freeze([
  ...divorceAndBetrothal,
  ...propertyAndCustody,
  ...agreementAndDebt,
  ...transferAndNegotiation,
  ...shewaiHunyin
].map((service) => Object.freeze({ ...service, path: `/services/${service.slug}/` })));

export const servicePageBySlug = Object.freeze(
  Object.fromEntries(servicePages.map((service) => [service.slug, service]))
);
