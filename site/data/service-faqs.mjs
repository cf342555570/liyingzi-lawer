import { divorceAndBetrothalFaqs } from "./faq-groups/divorce-and-betrothal-faqs.mjs";
import { propertyAndCustodyFaqs } from "./faq-groups/property-and-custody-faqs.mjs";
import { agreementAndDebtFaqs } from "./faq-groups/agreement-and-debt-faqs.mjs";
import { transferAndNegotiationFaqs } from "./faq-groups/transfer-and-negotiation-faqs.mjs";
import { shewaiHunyinFaqs } from "./faq-groups/shewai-hunyin-faqs.mjs";

export const serviceFaqs = Object.freeze({
  ...divorceAndBetrothalFaqs,
  ...propertyAndCustodyFaqs,
  ...agreementAndDebtFaqs,
  ...transferAndNegotiationFaqs,
  ...shewaiHunyinFaqs
});
