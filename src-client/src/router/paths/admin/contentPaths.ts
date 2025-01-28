import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AdminBasePath,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";
import { AGV_ADMIN_ROLE } from "src/models/models";
import { RouteRecordRaw } from "vue-router";

export const AGVContentAdminPaths: IRouteObject = {
  content: {
    path: `${AdminBasePath}/content`,
    name: "agv_admin_content",
    label: "WGO_SITE_CONTENT_ADMIN",
  },
  contentSocialMedia: {
    path: `${AdminBasePath}/content/retiSociali`,
    name: "agv_admin_content_retiSociali",
    label: "WGO_SITE_CONTENT_RETISOCIALI_ADMIN",
  },
};

export const AGVContentPathRouter: RouteRecordRaw = {
  path: AGVContentAdminPaths.content.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVContentAdminPaths.contentSocialMedia.path,
      component: () =>
        import("pages/Admin/SocialMedia/AdminSocialMediaContentPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
  ],
};
