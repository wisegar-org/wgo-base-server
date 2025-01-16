import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const comitatoPageRoute: WRouteRecordRaw = {
  path: "/comitato",
  label: "WGO_COMITATO",
  name: "agv_comitato",
  component: () => import("src/modules/agv/pages/ComitatoPage.vue"),
};
