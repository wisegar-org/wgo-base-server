//Translations base components

import { getAuthTranslationsKeys } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { getContactTranslationsKeys } from "@wisegar-org/wgo-base-models/build/contact/translations";
import { getCoreTranslationsKeys } from "@wisegar-org/wgo-base-models/build/core";
import { getLanguageTranslationsKeys } from "@wisegar-org/wgo-base-models/build/language/translations";
import { getSettingsTranslationsKeys } from "@wisegar-org/wgo-base-models/build/settings/translations";
import { getTranslationTranslationsKeys } from "@wisegar-org/wgo-base-models/build/translation/translations";
import { getHistoricTranslationsKeys } from "@wisegar-org/wgo-base-models/build/historic/translations";
import { getAGVContentTranslationsKeys } from "src/models/translations/content";
import { getAGVEventsTranslationsKeys } from "src/models/translations/events";
import { getAGVInscriptionsTranslationsKeys } from "src/models/translations/inscriptions";
import { getAGVNewsletterTranslationsKeys } from "src/models/translations/newsletter";
import { getAGVTemplateTranslationsKeys } from "src/models/translations/template";

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys())
  .concat(getHistoricTranslationsKeys())
  .concat(getContactTranslationsKeys())
  .concat(getAGVContentTranslationsKeys())
  .concat(getAGVEventsTranslationsKeys())
  .concat(getAGVInscriptionsTranslationsKeys())
  .concat(getAGVNewsletterTranslationsKeys())
  .concat(getAGVTemplateTranslationsKeys());
export const Translations = tanslations;
