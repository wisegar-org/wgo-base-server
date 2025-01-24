import "reflect-metadata";
import {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "wgo-settings";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { AppContextHandler, ctx } from "./handlers/AppContextHandler";
import { errorHandler } from "./handlers/ErrorHandler";
import { Express } from "express";
import { dataSourceOptions, PostgresDataSource } from "../data-source";
import { createDatabase } from "typeorm-extension";
import {
  UseAssetsHBHostMiddleware,
  UseClientSPAHostMiddleware,
  UsePublicMediaHostMiddleware,
} from "./middlewares/HostClientMiddleware";
import { settingsSeeder } from "./database/seeders/SettingsSeeder";
import { agvTemplateSeeder } from "./database/seeders/TemplateSeeder";
import { agvAdminUserSeeder } from "./database/seeders/AdminUserSeeder";

import { UseHandlebarsRenderMiddleware } from "./middlewares/HandlebarsRenderMiddleware";
import { getControllersList } from "./controllers";
import { PublicMediaResolver } from "./resolvers/Media/MediaResolver";
import { AGVEventResolver } from "./resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "./resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./resolvers/Inscription/AGVInscriptionResolver";
import { EmailResolver } from "./models/email";
import {
  boot,
  CoreResolver,
  ExpirationFreqEnum,
  IServerOptions,
  UseRestMiddleware,
} from "../core";
import {
  AuthResolver,
  ContactMeResolver,
  HistoricResolver,
  languageDefaultSeeder,
  LanguageResolver,
  mediaPublicSeeder,
  roleSuperAdminSeeder,
  SettingsResolver,
  TemplateResolver,
  TranslationsResolver,
  userAdminSeeder,
} from "..";

const port = GetPortKey();

const serverOptions: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  formatError: errorHandler,
  controllers: getControllersList(),
  resolvers: [
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
  ],
  port: parseInt(port),
  maxFileSize: 5000000000,
  maxFiles: 10,
  useCors: true,
  middlewares: (app: Express) => {
    UseHandlebarsRenderMiddleware(app);
    UseClientSPAHostMiddleware(app);
    UsePublicMediaHostMiddleware(app);
    UseAssetsHBHostMiddleware(app);
    UseRestMiddleware(serverOptions);
  },

  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  expiresIn: GetExpiresInKey(),
  expirationFreq: ExpirationFreqEnum.Low,
  gqlValidateSettings: {
    forbidUnknownValues: false,
  },
};
boot(serverOptions, async () => {
  console.log("Start other services here. ex. database connections");

  await createDatabase({
    ifNotExist: true,
    options: {
      ...dataSourceOptions,
      migrationsRun: false,
      entities: [],
      migrations: [],
    },
  });
  const dataSource = await PostgresDataSource.initialize();
  if (!dataSourceOptions.migrationsRun) {
    dataSource.runMigrations();
  }

  //Init db settings
  await settingsSeeder(dataSource);

  //Core Seeders
  await roleSuperAdminSeeder(dataSource); //create superadmin rol
  await userAdminSeeder(dataSource); //create admin user with superadmin rol
  await languageDefaultSeeder(dataSource); //create default language
  await mediaPublicSeeder({ ...ctx, dataSource }); //export public media files

  //App seeders
  await agvTemplateSeeder(dataSource);
  await agvAdminUserSeeder(dataSource);

  // Loop function
  setTimeout(async () => {}, 0);
});
