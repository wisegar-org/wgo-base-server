import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const homePageRoute: WRouteRecordRaw = {
  path: "/",
  name: "agv_home",
  label: "WGO_HOME",
  component: () => import("src/modules/agv/pages/IndexPage.vue"),
};
