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
import { EmailResolver } from "../../email";

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
    EmailResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
  ] as unknown as NonEmptyArray<Function>;
};
