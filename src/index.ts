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
import { dataSourceOptions, PostgresDataSource } from "./wgo/dataSources";
import { settingsSeeder } from "./wgo/database/seeders/SettingsSeeder";
import { getResolvers } from "./wgo/resolvers";
import express from "express";
import { UseStaticMediaFilesMiddleware } from "./wgo/middlewares/StaticMediaFilesMiddleware";
import {
  ExpirationFreqEnum,
  IServerOptions,
  UseCorsMiddleware,
  UseGqlServer,
  UseJwtMiddleware,
  UseRestMiddleware,
} from "./core";

export { Express } from "express";
export * from "type-graphql";
export * from "graphql-upload";

export * from "./authentication";
export * from "./contact";
export * from "./core";
export * from "./email";
export * from "./historic";
export * from "./language";
export * from "./settings";
export * from "./storage";
export * from "./template";
export * from "./translation";
// export * from "./wgo";

// export async function run(app: any) {
//   const port = GetPortKey();

//   const options: IServerOptions = {
//     app: app,
//     authenticator: AuthenticationHandler,
//     context: AppContextHandler,
//     formatError: errorHandler,
//     controllers: getControllers(),
//     port: parseInt(port),
//     maxFileSize: 5000000000,
//     maxFiles: 10,
//     useCors: true,
//     middlewares: (app: any) => {
//       // UseHostAdminMiddleware(app);
//       // UseTemplatingMiddleware(app);
//       UseStaticMediaFilesMiddleware(app);
//       UseRestMiddleware(options);
//     },
//     resolvers: getResolvers(),
//     privateKey: GetPrivateKey(),
//     publicKey: GetPublicKey(),
//     expiresIn: GetExpiresInKey(),
//     expirationFreq: ExpirationFreqEnum.Low,
//     gqlValidateSettings: {
//       forbidUnknownValues: false,
//     },
//   };

//   options.app.use(express.json());

//   options.expirationFreq = options.expirationFreq
//     ? options.expirationFreq
//     : ExpirationFreqEnum.Normal;

//   console.debug("Registering Cors middleware");
//   UseCorsMiddleware(options);

//   console.debug("Registering Jwt middleware");
//   UseJwtMiddleware(options);

//   if (options.controllers && options.controllers.length > 0) {
//     console.debug("Registering Rest middleware");
//     UseRestMiddleware(options);
//   }

//   if (options.resolvers && options.resolvers.length > 0) {
//     console.debug("Registering Graphql middleware");
//     UseGqlServer(options);
//   }

//   if (options.middlewares) {
//     console.debug("Registering Extras middleware");
//     options.middlewares(options.app);
//   }

//   await createDatabase({
//     ifNotExist: true,
//     options: {
//       ...dataSourceOptions,
//       migrationsRun: false,
//       entities: [],
//       migrations: [],
//     },
//   });
//   const dataSource = await PostgresDataSource.initialize();
//   if (!dataSourceOptions.migrationsRun) {
//     dataSource.runMigrations();
//   }

//   //Init db settings
//   await settingsSeeder(dataSource);

//   //Core Seeders
//   await roleSuperAdminSeeder(dataSource); //create superadmin rol
//   await userAdminSeeder(dataSource); //create admin user with superadmin rol
//   await languageDefaultSeeder(dataSource); //create default language
//   await mediaPublicSeeder({ ...ctx, dataSource }); //export public media files

//   // Loop function
//   setTimeout(async () => {
//     // loopUpdateIssues();
//   }, 0);
// }
