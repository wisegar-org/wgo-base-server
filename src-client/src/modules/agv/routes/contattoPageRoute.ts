import { WRouteRecordRaw } from "src/models/WRouteRecordRaw";

export const contattoPageRoute: WRouteRecordRaw = {
  path: "/contatto",
  name: "contatto",
  label: "WGO_CONTATTO",
  component: () => import("src/modules/agv/pages/ContattoPage.vue"),
};
