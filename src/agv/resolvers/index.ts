import { PublicMediaResolver } from "./Media/MediaResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";
import { AppResolver } from "./AppResolver";
import { SettingsResolver } from "../../settings";
import { TemplateResolver } from "../../template";
import { AuthResolver } from "../../resolvers/authentication.resolver";
import { EmailResolver } from "../../resolvers/email.resolver";
import { CoreResolver } from "../../core/resolvers/CoreResolver";
import { NonEmptyArray } from "type-graphql";
import { HistoricResolver } from "../../resolvers/history.resolver";
import { LanguageResolver } from "../../resolvers/language.resolver";

export const getResolverList = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
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
  ] as NonEmptyArray<Function>;
};
