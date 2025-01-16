import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const corsiPageRoute: WRouteRecordRaw = {
  path: "/corsi",
  label: "WGO_CORSI",
  name: "agv_corsi",
  component: () => import("src/modules/agv/pages/CorsiPage.vue"),
};
