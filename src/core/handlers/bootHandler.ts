import "reflect-metadata";
import express from "express";
import { IServerOptions } from "../interfaces/IServerOptions";
import { UseJwtMiddleware } from "../middlewares/JwtMiddleware";
import { UseCorsMiddleware } from "../middlewares/CorsMiddleware";
import { UseGqlServer } from "../middlewares/GqlServerMiddleware";
import { ExpirationFreqEnum } from "../services/JwtAuthService";
import { UseRestMiddleware } from "../middlewares/RestMiddleware";
import { IsNullOrUndefined } from "wgo-extensions";

export type BootFunc = (options: IServerOptions) => void;

export const boot = async (options: IServerOptions, onStart?: BootFunc) => {
  options.app = options.app ? options.app : express();

  options.app.use(express.json());

  options.expirationFreq = options.expirationFreq
    ? options.expirationFreq
    : ExpirationFreqEnum.Normal;

  console.debug("Registering Cors middleware");
  UseCorsMiddleware(options);

  console.debug("Registering Jwt middleware");
  UseJwtMiddleware(options);

  if (options.controllers && options.controllers.length > 0) {
    console.debug("Registering Rest middleware");
    UseRestMiddleware(options);
  }

  if (options.resolvers && options.resolvers.length > 0) {
    console.debug("Registering Graphql middleware");
    UseGqlServer(options);
  }

  if (options.middlewares) {
    console.debug("Registering Extras middleware");
    options.middlewares(options.app);
  }

  options.app?.listen(options.port, () => {
    if (onStart) onStart(options);
    console.log(`> Listening on port ${options.port}`);
  });

  process.on("SIGINT", function () {
    process.exit(0);
  });
};

export const bootOnly = async (
  options: IServerOptions,
  onSetup: BootFunc,
  onStart?: BootFunc
) => {
  options.app = options.app ? options.app : express();
  options.app.use(express.json());
  options.expirationFreq = options.expirationFreq
    ? options.expirationFreq
    : ExpirationFreqEnum.Normal;

  if (IsNullOrUndefined(onSetup)) throw new Error("Invalid onSetup parameter");
  onSetup(options);

  options.app?.listen(options.port, () => {
    if (onStart) onStart(options);
    console.log(`> Listening on port ${options.port}`);
  });

  process.on("SIGINT", function () {
    process.exit(0);
  });
};
