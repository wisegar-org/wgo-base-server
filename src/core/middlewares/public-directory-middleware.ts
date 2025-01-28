import { IsNullOrUndefined } from "wgo-extensions";
import { IServerOptions } from "../interfaces/IServerOptions";
import express from "express";
import { Express } from "express";
import { GetOpenCRMPathRoot, GetWebRootPath } from "../services/EnvService";
import path, { join } from "path";
import { existsSync, mkdirpSync } from "fs-extra";
import { mkdirSync } from "fs";

export const PublicDirectoryMiddleware = (options: IServerOptions) => {
  if (IsNullOrUndefined(options)) throw new Error("Invalid options parameter");
  if (IsNullOrUndefined(options.app))
    throw new Error("Invalid options app parameter");

  const publicFolderPath = join(GetWebRootPath(), "public");
  if (!existsSync(publicFolderPath)) {
    mkdirSync(publicFolderPath);
  }
  options?.app?.use("/", express.static(publicFolderPath));

  const OpenCRMWebRootPath = GetOpenCRMPathRoot();
  const assetsFolderPath = join(OpenCRMWebRootPath, "assets");
  if (!existsSync(assetsFolderPath)) {
    mkdirSync(assetsFolderPath);
  }
  options?.app?.use("/assets", express.static(assetsFolderPath));
};

export const GetClientWebRootKey = () => {
  if (!process.env.APP_WEB_ROOT)
    throw "Impossible to get value from APP_SPA_WEB_ROOT environment key";
  if (process.env.NODE_ENV === "development")
    return path.join(process.env.APP_WEB_ROOT, "build", "client");
  return path.join(process.env.APP_WEB_ROOT, "client");
};

export const GetWebRootKey = () => {
  if (process.env.APP_WEB_ROOT) return process.env.APP_WEB_ROOT;
  throw "Impossible to get value from APP_WEB_ROOT environment key";
};

export const UseClientSPAHostMiddleware = (App: Express) => {
  if (!existsSync(GetClientWebRootKey())) {
    console.error("Host client folder do not exist!");
    mkdirpSync(GetClientWebRootKey());
  }
  App.use("/", express.static(GetClientWebRootKey()));
};

export const UsePublicMediaHostMiddleware = (App: Express) => {
  const root_path = GetWebRootKey();
  const public_media_path = join(root_path, "public", "media");
  if (!existsSync(public_media_path)) {
    console.error("Public media folder do not exist!");
    mkdirpSync(public_media_path);
  }
  App.use("/media", express.static(public_media_path));
};
