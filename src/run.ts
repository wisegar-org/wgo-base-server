import "reflect-metadata";
import {
  GetPortKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "wgo-settings";
import { AuthenticationHandler } from "./wgo/handlers/AuthenticationHandler";
import { AppContextHandler, ctx } from "./wgo/handlers/AppContextHandler";
import { errorHandler } from "./wgo/handlers/ErrorHandler";
import { getControllers } from "./wgo/controllers";

import { createDatabase } from "typeorm-extension";
import { roleSuperAdminSeeder, userAdminSeeder } from "./authentication";
import { languageDefaultSeeder } from "./language";
import { mediaPublicSeeder } from "./storage";
import { settingsSeeder } from "./wgo/database/seeders/SettingsSeeder";
import { getResolvers } from "./wgo/resolvers";
import {
  boot,
  ExpirationFreqEnum,
  IServerOptions,
  UseRestMiddleware,
} from "./core";
import { UseHandlebarsRenderMiddleware } from "./agv/middlewares/HandlebarsRenderMiddleware";
import {
  UseAssetsHBHostMiddleware,
  UseClientSPAHostMiddleware,
  UsePublicMediaHostMiddleware,
} from "./agv/middlewares/HostClientMiddleware";
import { dataSourceOptions, PostgresDataSource } from "./database/data-source";

const port = GetPortKey();

const serverOptions: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  formatError: errorHandler,
  controllers: getControllers(),
  port: parseInt(port),
  maxFileSize: 5000000000,
  maxFiles: 10,
  useCors: true,
  middlewares: (app: any) => {
    UseHandlebarsRenderMiddleware(app);
    UseClientSPAHostMiddleware(app);
    UsePublicMediaHostMiddleware(app);
    UseAssetsHBHostMiddleware(app);
    UseRestMiddleware(serverOptions);
  },
  resolvers: getResolvers(),
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

  // Loop function
  setTimeout(async () => {}, 0);
});
