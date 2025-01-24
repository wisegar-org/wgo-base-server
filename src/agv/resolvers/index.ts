import { PublicMediaResolver } from "./Media/MediaResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";
import { AppResolver } from "./AppResolver";
import { AuthResolver } from "../../authentication";
import { ContactMeResolver } from "../../contact";
import { CoreResolver, NonEmptyArray } from "../../core";
import { HistoricResolver } from "../../historic";
import { LanguageResolver } from "../../language";
import { SettingsResolver } from "../../settings";
import { TemplateResolver } from "../../template";
import { EmailResolver } from "../../email";

export const getResolverList = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
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
  ] as NonEmptyArray<Function>;
};
