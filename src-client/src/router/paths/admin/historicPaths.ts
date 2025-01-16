import { AdminHistoricPaths } from "@wisegar-org/wgo-base-models/build/historic/router";
import { RouteRecordRaw } from "vue-router";

export const HistoricPathRouter: RouteRecordRaw = {
  path: AdminHistoricPaths.adminHistoric.path,
  name: AdminHistoricPaths.adminHistoric.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AdminHistoricPaths.adminHistoric.path,
      component: () => import("pages/Admin/Historic/HistoricPage.vue"),
      meta: {
        auth: AdminHistoricPaths.adminHistoric.auth,
        role: AdminHistoricPaths.adminHistoric.role,
      },
    },
  ],
};
