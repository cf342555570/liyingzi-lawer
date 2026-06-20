import { renderServicePrimary } from "./service-primary-sections.mjs";
import { renderServiceSecondary } from "./service-secondary-sections.mjs";

export const renderServiceBody = (context) => `${renderServicePrimary(context)}${renderServiceSecondary(context)}`;
