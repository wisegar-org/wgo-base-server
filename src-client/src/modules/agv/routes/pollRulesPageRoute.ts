import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";

export const pollRulesPageRoute: WRouteRecordRaw = {
  path: "/rules",
  label: "WGO_RULES",
  name: "agv_rules",
  component: () => import("src/modules/agv/pages/PollRulesPage.vue"),
};
