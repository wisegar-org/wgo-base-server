import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "wgo-settings";

/** Migrations */
import { StorageEntity } from "../storage";
import { getTemplateMigrations, TemplateEntity } from "../template";
import { getTranslationMigrations } from "../translation";
import AGVEventEntity from "./entities/AGVEventEntity";
import { AGVInscriptionEntity } from "./entities/AGVInscriptionEntity";
import AGVPollEntity from "./entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "./entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "./entities/AGVNewsletterMessageEntity";
import {
  getAgvMigrations,
  getAuthenticationMigrations,
  getContactMigrations,
  getHistoricMigrations,
  getLanguageMigrations,
  getSettingsMigrations,
  getStorageMigrations,
} from "./migrations";
import { ContactMeEntity } from "../contact";
import { UserEntity } from "./entities/UserEntity";
import { RoleEntity } from "./entities/RoleEntity";
import { TranslationEntity } from "./entities/TranslationEntity";
import { LanguageEntity } from "./entities/LanguageEntity";
import MediaEntity from "./entities/MediaEntity";
import { HistoryEntity } from "./entities/HistoryEntity";
import { SettingsEntity } from "../settings";

const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations())
  .concat(getAgvMigrations());

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: GetDBHostKey() || "localhost",
  port: parseInt(`${GetDBPortKey() || 5432}`),
  username: GetDBUserNameKey() || "postgres",
  password: GetDBPasswordKey() || "postgres",
  database: GetDBNameKey() || "wgo-template",
  useUTC: true,
  migrationsRun: true,
  synchronize: false,
  entities: [
    UserEntity,
    RoleEntity,
    LanguageEntity,
    TranslationEntity,
    SettingsEntity,
    ContactMeEntity,
    HistoryEntity,
    TemplateEntity,
    MediaEntity,
    StorageEntity,
    AGVEventEntity,
    AGVInscriptionEntity,
    AGVPollEntity,
    AGVNewsletterInscriptionEntity,
    AGVNewsletterMessageEntity,
  ],
  migrations: migrations,
  subscribers: ["src/database/subscriber/**/*.ts"],
  dropSchema: false,
  logging: false,
  logger: "file",
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
