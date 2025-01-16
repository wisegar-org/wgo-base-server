import { AdminLanguagePaths } from "@wisegar-org/wgo-base-models/build/language/router";
import { AGV_ADMIN_ROLE } from "src/models/models";
import { RouteRecordRaw } from "vue-router";

export const LanguagePathRouter: RouteRecordRaw = {
  path: AdminLanguagePaths.adminLanguage.path,
  name: AdminLanguagePaths.adminLanguage.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AdminLanguagePaths.adminLanguage.path,
      component: () => import("pages/Admin/Language/LanguagePage.vue"),
      meta: {
        auth: AdminLanguagePaths.adminLanguage.auth,
        role: AdminLanguagePaths.adminLanguage.role?.concat(AGV_ADMIN_ROLE),
      },
    },
  ],
};
