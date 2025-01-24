import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { FinanceIssuesResolver } from "./FinanceIssues/FinanceIssuesResolver";
import { FinanceIssuesOptionsResolver } from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
import { CoreResolver } from "../../core";
import { AuthResolver } from "../../authentication";
import { LanguageResolver } from "../../language";
import { SettingsResolver } from "../../settings";
import { ContactMeResolver } from "../../contact";
import { TemplateResolver } from "../../template";
import { TranslationsResolver } from "../../translation";
import { HistoricResolver } from "../../historic";
import { MediaResolver, StorageResolver } from "../../storage";
import { WGEmailResolver } from "../../email";
import { AGVEventResolver } from "../../agv/resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "../../agv/resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "../../agv/resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "../../agv/resolvers/Inscription/AGVInscriptionResolver";
import { EmailResolver } from "../../agv/resolvers/Email/EmailResolver";

export const getResolvers = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    TranslationsResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    TranslationsResolver,
    HistoricResolver,
    MediaResolver,
    WGEmailResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
    CoreResolver,
    AuthResolver,
    TranslationsResolver,
    LanguageResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    HistoricResolver,
    EmailResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as unknown as NonEmptyArray<Function>;
};
