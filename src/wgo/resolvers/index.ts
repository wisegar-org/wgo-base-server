import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { FinanceIssuesResolver } from "./FinanceIssues/FinanceIssuesResolver";
import { FinanceIssuesOptionsResolver } from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
import { CoreResolver } from "../../core";
import { LanguageResolver } from "../../language";
import { SettingsResolver } from "../../settings";
import { TemplateResolver } from "../../template";
import { TranslationsResolver } from "../../translation";
import { HistoricResolver } from "../../historic";
import { MediaResolver, StorageResolver } from "../../storage";

import { AGVEventResolver } from "../../agv/resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "../../agv/resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "../../agv/resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "../../agv/resolvers/Inscription/AGVInscriptionResolver";
import { EmailResolver } from "../../email";
import { AuthResolver } from "../../resolvers/authentication.resolver";

export const getResolvers = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    TranslationsResolver,
    SettingsResolver,
    PublicMediaResolver,
    TemplateResolver,
    TranslationsResolver,
    HistoricResolver,
    MediaResolver,
    EmailResolver,
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
    TemplateResolver,
    HistoricResolver,
    EmailResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as unknown as NonEmptyArray<Function>;
};
