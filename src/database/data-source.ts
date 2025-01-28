import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "wgo-settings";

/** Entities */
import { AGVEventEntity } from "../agv/database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "../agv/database/entities/AGVInscriptionEntity";
import { AGVPollEntity } from "../agv/database/entities/AGVPollEntity";
import { AGVNewsletterInscriptionEntity } from "../agv/database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "../agv/database/entities/AGVNewsletterMessageEntity";

/** Migrations */
import { getAgvMigrations } from "../agv/database/migrations";
import { getAuthenticationMigrations, RoleEntity } from "../authentication";
import { getContactMigrations, ContactMeEntity } from "../contact";
import {
  UserEntity,
  LanguageEntity,
  TranslationEntity,
  MediaEntity,
} from "../core";
import { getHistoricMigrations, HistoricEntity } from "../historic";
import { getLanguageMigrations } from "../language";
import { getSettingsMigrations, SettingsEntity } from "../settings";
import { getStorageMigrations, StorageEntity } from "../storage";
import { getTemplateMigrations, TemplateEntity } from "../template";
import { getTranslationMigrations } from "../translation";

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
    HistoricEntity,
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
  subscribers: [],
  dropSchema: false,
  logging: false,
  logger: "file",
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
