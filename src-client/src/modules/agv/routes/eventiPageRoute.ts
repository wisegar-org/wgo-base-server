import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const eventiPageRoute: WRouteRecordRaw = {
  path: "/eventi",
  label: "WGO_EVENTI",
  name: "agv_eventi",
  component: () => import("src/modules/agv/pages/EventiPage.vue"),
};
