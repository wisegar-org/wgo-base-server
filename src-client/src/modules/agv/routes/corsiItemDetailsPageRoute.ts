import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const corsiItemDetailsPageRoute: WRouteRecordRaw = {
  path: "/corsi/details",
  name: "agv_corsi_details",
  label: "WGO_CORSI_DETAILS",
  props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
  component: () => import("src/modules/agv/pages/ItemDetailsPage.vue"),
};
