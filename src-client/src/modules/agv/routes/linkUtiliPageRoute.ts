import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const linkUtiliPageRoute: WRouteRecordRaw = {
  path: "/links",
  label: "WGO_LINK_UTILI",
  name: "agv_links",
  component: () => import("src/modules/agv/pages/LinkUtiliPage.vue"),
};
