import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "wgo-settings";
import AGVEventEntity from "../agv/database/entities/AGVEventEntity";
import { AGVInscriptionEntity } from "../agv/database/entities/AGVInscriptionEntity";
import { AGVNewsletterInscriptionEntity } from "../agv/database/entities/AGVNewsletterInscriptionEntity";
import { AGVNewsletterMessageEntity } from "../agv/database/entities/AGVNewsletterMessageEntity";
import AGVPollEntity from "../agv/database/entities/AGVPollEntity";
import { getAgvMigrations } from "../agv/database/migrations";
import {
  RoleEntity,
  UserEntity,
  getAuthenticationMigrations,
} from "../authentication";
import { ContactMeEntity, getContactMigrations } from "../contact";
import { HistoricEntity, getHistoricMigrations } from "../historic";
import { LanguageEntity, getLanguageMigrations } from "../language";
import { SettingsEntity, getSettingsMigrations } from "../settings";
import { MediaEntity, StorageEntity, getStorageMigrations } from "../storage";
import { TemplateEntity, getTemplateMigrations } from "../template";
import { TranslationEntity, getTranslationMigrations } from "../translation";

/** Entities */
const entities = [
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
];

/** Migrations */
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
  entities: entities,
  migrations: migrations,
  subscribers: [],
};

export const PostgresDataSource = new DataSource(dataSourceOptions);
