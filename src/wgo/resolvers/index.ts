import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";

import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { FinanceIssuesResolver } from "./FinanceIssues/FinanceIssuesResolver";
import { FinanceIssuesOptionsResolver } from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
import { CoreResolver } from "../../core";
import { AuthResolver } from "../../authentication";
import { LanguageResolver } from "../../language";
import { SettingsResolver } from "../../settings";
import { ContactMeResolver } from "../../contact";
import { TemplateResolver } from "../../template";
import { TranslationResolver } from "../../translation";
import { HistoricResolver } from "../../historic";
import { MediaResolver, StorageResolver } from "../../storage";
import { EmailResolver } from "../../email";
import { AGVEventResolver } from "../../agv/resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "../../agv/resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "../../agv/resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "../../agv/resolvers/Inscription/AGVInscriptionResolver";

export const getResolvers = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    TranslationResolver,
    HistoricResolver,
    MediaResolver,
    EmailResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as unknown as NonEmptyArray<Function>;
};
