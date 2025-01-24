import express from "express"; // Importar express
import { engine } from "express-handlebars";
import { join } from "path";
import { GetWebRootKey } from "./HostClientMiddleware";

export const UseHandlebarsRenderMiddleware = (app: any) => {
  app.engine(
    ".hbs",
    engine({ extname: ".hbs", helpers: require("./handlebarsHelpers") })
  );
  app.set("view engine", ".hbs");
  app.set("views", join(GetWebRootKey(), "handlebars/views"));

  // Set the 'handlebars' folder to static to serve files like images, CSS, etc..
  app.use(express.static(join(GetWebRootKey(), "handlebars")));
};
