import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const pollDataPageRoute: WRouteRecordRaw = {
  path: "/poll",
  label: "WGO_POLL",
  name: "agv_poll",
  component: () => import("src/modules/agv/pages/PollDataPage.vue"),
};
