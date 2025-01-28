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
  AGVInscriptionsPathRouter,
} from "./paths/admin/eventsPaths";
import { AGVTemplatePathRouter } from "./paths/admin/templatePaths";
import { AuthPathRouter } from "./paths/authPaths";
import { emptyLayoutContainerRoute } from "src/modules/agv/routes/emptyLayoutContainerRoute";
import { AGVContentPathRouter } from "./paths/admin/contentPaths";
import { AGVNewslettersPathRouter } from "./paths/admin/newslettersPaths";

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
