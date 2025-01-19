import { AdminBasePath } from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";
import { AuthAdminPathRouter } from "./paths/admin/authPaths";
import { ContactPathRouter } from "./paths/admin/contactPaths";
import { HistoricPathRouter } from "./paths/admin/historicPaths";
import { LanguagePathRouter } from "./paths/admin/languagePaths";
import { SettingsPathRouter } from "./paths/admin/settingsPaths";
import { TranslationPathRouter } from "./paths/admin/translationPaths";
import {
  AGVEventsAdminPaths,
  AGVEventsPathRouter,
} from "./paths/adminAgv/eventsPaths";
import { AGVTemplatePathRouter } from "./paths/adminAgv/templatePaths";
import { AuthPathRouter } from "./paths/authPaths";
import { emptyLayoutContainerRoute } from "src/modules/agv/routes/emptyLayoutContainerRoute";
import { AGVContentPathRouter } from "./paths/adminAgv/contentPaths";
import { AGVInscriptionsPathRouter } from "./paths/adminAgv/inscriptionsPaths";
import { AGVNewslettersPathRouter } from "./paths/adminAgv/newslettersPaths";

const routes: RouteRecordRaw[] = [
  // mainLayoutContainerRoute,
  {
    path: "/",
    redirect: "/admin",
  },
  emptyLayoutContainerRoute,
  AuthPathRouter,
  {
    path: AdminBasePath,
    redirect: AGVEventsAdminPaths.events.path,
  },
  AGVContentPathRouter,
  AGVEventsPathRouter,
  AGVInscriptionsPathRouter,
  AGVNewslettersPathRouter,
  AuthAdminPathRouter,
  LanguagePathRouter,
  ContactPathRouter,
  TranslationPathRouter,
  SettingsPathRouter,
  HistoricPathRouter,
  AGVTemplatePathRouter,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
