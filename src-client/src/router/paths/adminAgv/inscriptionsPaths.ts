import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AdminBasePath,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";
import { AGV_ADMIN_ROLE } from "src/models/models";
import { RouteRecordRaw } from "vue-router";

export const AGVInscriptionsAdminPaths: IRouteObject = {
  inscriptions: {
    path: `${AdminBasePath}/inscriptions`,
    name: "agv_admin_inscriptions",
    label: "WGO_INSCRIPTION_ADMIN",
  },
};

export const AGVInscriptionsPathRouter: RouteRecordRaw = {
  path: AGVInscriptionsAdminPaths.inscriptions.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVInscriptionsAdminPaths.inscriptions.path,
      component: () => import("pages/AdminAgv/AdminInscriptionsPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
  ],
};
