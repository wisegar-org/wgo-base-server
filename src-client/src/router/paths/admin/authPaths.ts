import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { RouteRecordRaw } from "vue-router";

export const AuthAdminPathRouter: RouteRecordRaw = {
  path: AuthPaths.authUsers.path,
  name: AuthPaths.authUsers.name,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AuthPaths.authUsers.path,
      component: () => import("pages/Admin/AuthUser/AuthUserPage.vue"),
      meta: {
        auth: AuthPaths.authUsers.auth,
        role: AuthPaths.authUsers.role,
      },
    },
  ],
};
