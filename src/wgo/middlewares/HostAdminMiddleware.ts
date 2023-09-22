import express, { Express } from "express";
import { existsSync, mkdirpSync } from "fs-extra";
import path from "path";

export const GetBackofficeRootKey = () => {
  if (process.env.WEB_ROOT)
    return path.join(process.env.WEB_ROOT, "backoffice", "dist", "spa");
  throw "Impossible to get value from CLIENT_WEB_ROOT environment key";
};

export const GetWebRootKey = () => {
  if (process.env.WEB_ROOT) return process.env.WEB_ROOT;
  throw "Impossible to get value from WEB_ROOT environment key";
};
export const GetHandlebarStaticsKey = () => {
  if (process.env.WEB_ROOT) return path.join(process.env.WEB_ROOT, "public");

  throw "Impossible to get value from WEB_ROOT environment key";
};
export const GetHandlebarRootKey = () => {
  if (process.env.WEB_ROOT) return path.join(process.env.WEB_ROOT, "views");

  throw "Impossible to get value from WEB_ROOT environment key";
};

export const UseHostAdminMiddleware = (app: Express) => {
  if (!existsSync(GetBackofficeRootKey())) {
    console.error("Host client folder do not exist!");
    mkdirpSync(GetBackofficeRootKey());
  }
  app.use("/backoffice", express.static(GetBackofficeRootKey()));
};
