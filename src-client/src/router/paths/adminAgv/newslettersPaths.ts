import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AdminBasePath,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";
import { AGV_ADMIN_ROLE } from "src/models/models";
import { RouteRecordRaw } from "vue-router";

export const AGVNewslettersAdminPaths: IRouteObject = {
  newsletter: {
    path: `${AdminBasePath}/newsletter`,
    name: "agv_admin_newsletter",
    label: "WGO_NEWSLETTER_ADMIN",
  },
  newsletterInscriptions: {
    path: `${AdminBasePath}/newsletter/inscriptions`,
    name: "agv_admin_newsletter_inscriptions",
    label: "WGO_NEWSLETTER_INSCRIPTIONS_ADMIN",
  },
  newsletterMessages: {
    path: `${AdminBasePath}/newsletter/messages`,
    name: "agv_admin_newsletter_messages",
    label: "WGO_NEWSLETTER_MESSAGES_ADMIN",
  },
  newsletterMessagesEditor: {
    path: `${AdminBasePath}/newsletter/messages/edit`,
    name: "agv_admin_newsletter_messages_edit",
    label: "WGO_NEWSLETTER_MESSAGES_EDIT_ADMIN",
  },
};

export const AGVNewslettersPathRouter: RouteRecordRaw = {
  path: AGVNewslettersAdminPaths.newsletter.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVNewslettersAdminPaths.newsletter.path,
      redirect: AGVNewslettersAdminPaths.newsletterInscriptions.path,
    },
    {
      path: AGVNewslettersAdminPaths.newsletterInscriptions.path,
      component: () =>
        import("pages/AdminAgv/AdminNewsletterInscriptionsPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
    {
      path: AGVNewslettersAdminPaths.newsletterMessages.path,
      component: () => import("pages/AdminAgv/AdminNewsletterMessagesPage.vue"),
      props: (route) => ({
        page: parseInt((route.query.page as string) || "0"),
      }),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
    {
      path: AGVNewslettersAdminPaths.newsletterMessagesEditor.path,
      props: (route) => ({
        id: parseInt((route.query.id as string) || "0"),
        page: parseInt((route.query.page as string) || "0"),
      }),
      component: () =>
        import("pages/AdminAgv/AdminNewsletterMessageEditorPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
  ],
};
