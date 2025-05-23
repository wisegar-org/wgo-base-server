import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AdminBasePath,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";
import { AGV_ADMIN_ROLE } from "src/models/models";
import { RouteRecordRaw } from "vue-router";

export const AGVEventsAdminPaths: IRouteObject = {
  events: {
    path: `${AdminBasePath}/events`,
    name: "agv_admin_events",
    label: "WGO_EVENTS_ADMIN",
  },
  eventEditor: {
    path: `${AdminBasePath}/events/editor`,
    name: "agv_admin_events_editor",
    label: "WGO_EVENTS_ADMIN_EDITOR",
  },
};

export const AGVEventsPathRouter: RouteRecordRaw = {
  path: AGVEventsAdminPaths.events.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVEventsAdminPaths.events.path,
      component: () => import("pages/Admin/Events/AdminEventsPage.vue"),
      props: (route) => {
        return {
          page: parseInt(`${route.query.page || 0}`),
        };
      },
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
    {
      path: AGVEventsAdminPaths.eventEditor.path,
      component: () => import("pages/Admin/Events/AdminEventEditorPage.vue"),
      props: (route) => {
        return {
          event: parseInt(`${route.query.event || 0}`),
          page: parseInt(`${route.query.page || 0}`),
        };
      },
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
  ],
};

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
      component: () =>
        import("pages/Admin/Events/AdminEventInscriptionsPage.vue"),
      meta: {
        auth: true,
        role: [SUPERADMIN, AGV_ADMIN_ROLE],
      },
    },
  ],
};
