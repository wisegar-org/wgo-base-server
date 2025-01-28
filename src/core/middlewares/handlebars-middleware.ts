import express from "express";
import { Express } from "express";
import { engine } from "express-handlebars";
import { join } from "path";
import { existsSync, mkdirpSync } from "fs-extra";
import { GetWebRootKey } from "./public-directory-middleware";

export const UseHandlebars = (app: any) => {
  app.engine(
    ".hbs",
    engine({ extname: ".hbs", helpers: require("./handlebars-helpers") })
  );
  app.set("view engine", ".hbs");
  app.set("views", join(GetWebRootKey(), "handlebars/views"));

  // Set the 'handlebars' folder to static to serve files like images, CSS, etc..
  app.use(express.static(join(GetWebRootKey(), "handlebars")));
};

export const UseAssetsHBHostMiddleware = (App: Express) => {
  const root_path = GetWebRootKey();
  const public_media_path = join(root_path, "handlebars", "assets");
  if (!existsSync(public_media_path)) {
    console.error("Public media folder do not exist!");
    mkdirpSync(public_media_path);
  }
  App.use("/handlebars/assets", express.static(public_media_path));
};
