import { DataSource, DataSourceOptions } from "typeorm";
import {
  GetDBHostKey,
  GetDBNameKey,
  GetDBPasswordKey,
  GetDBPortKey,
  GetDBUserNameKey,
} from "wgo-settings";
import {
  RoleEntity,
  UserEntity,
  getAuthenticationMigrations,
} from "../authentication";
import { ContactMeEntity, getContactMigrations } from "../contact";
import { HistoricEntity, getHistoricMigrations } from "../historic";
import { LanguageEntity, getLanguageMigrations } from "../language";
import { SettingsEntity, getSettingsMigrations } from "../settings";
import { StorageEntity, getStorageMigrations } from "../storage";
import { TemplateEntity, getTemplateMigrations } from "../template";
import { TranslationEntity, getTranslationMigrations } from "../translation";
import { MediaEntity } from "../core";

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
];

/** Migrations */
const migrations = getAuthenticationMigrations()
  .concat(getContactMigrations())
  .concat(getHistoricMigrations())
  .concat(getLanguageMigrations())
  .concat(getSettingsMigrations())
  .concat(getStorageMigrations())
  .concat(getTemplateMigrations())
  .concat(getTranslationMigrations());

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
