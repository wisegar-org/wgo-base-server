import { pollDataPageRoute } from "./pollDataPageRoute";
import { pollRulesPageRoute } from "./pollRulesPageRoute";
import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";
import { homePageRoute } from "./homePageRoute";

export const emptyLayoutContainerRoute: WRouteRecordRaw = {
  path: homePageRoute.path,
  label: "WGO_POLL_HOME",
  name: "agv_poll_empty_layout",
  component: () => import("src/modules/agv/layouts/EmptyLayout.vue"),
  children: [pollRulesPageRoute, pollDataPageRoute],
};
