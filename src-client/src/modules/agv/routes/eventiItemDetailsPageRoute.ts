import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const eventiItemDetailsPageRoute: WRouteRecordRaw = {
  path: "/eventi/details",
  name: "agv_eventi_details",
  label: "WGO_EVENTI_DETAILS",
  props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
  component: () => import("src/modules/agv/pages/ItemDetailsPage.vue"),
};
