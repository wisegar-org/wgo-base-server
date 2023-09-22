import { NonEmptyArray } from "type-graphql";
import { AGVEventResolver } from "./Event/AGVEventResolver";

export const getResolverList = () => {
  return [AGVEventResolver] as NonEmptyArray<Function>;
};

// CoreResolver,
// AuthResolver,
// LanguageResolver,
// PublicTranslationResolver,
// SettingsResolver,
// PublicMediaResolver,
// ContactMeResolver,
// TemplateResolver,
// HistoricResolver,
// TranslationResolver,
// EmailResolver,
// AGVEventResolver,
// AGVContentsResolver,
// AGVNewsletterResolver,
// AGVInscriptionResolver,
