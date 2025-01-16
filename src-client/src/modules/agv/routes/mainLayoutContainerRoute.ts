import { WRouteRecordRaw } from "../../../models/WRouteRecordRaw";
import { comitatoPageRoute } from "./comitatoPageRoute";
import { contattoPageRoute } from "./contattoPageRoute";
import { corsiItemDetailsPageRoute } from "./corsiItemDetailsPageRoute";
import { corsiPageRoute } from "./corsiPageRoute";
import { donationPageRoute } from "./donationPageRoute";
import { eventiItemDetailsPageRoute } from "./eventiItemDetailsPageRoute";
import { eventiPageRoute } from "./eventiPageRoute";
import { homePageRoute } from "./homePageRoute";
import { linkUtiliPageRoute } from "./linkUtiliPageRoute";

export const mainLayoutContainerRoute: WRouteRecordRaw = {
  path: homePageRoute.path,
  label: homePageRoute.label,
  name: homePageRoute.name,
  component: () => import("src/modules/agv/layouts/MainLayout.vue"),
  children: [
    homePageRoute,
    comitatoPageRoute,
    corsiPageRoute,
    eventiPageRoute,
    linkUtiliPageRoute,
    contattoPageRoute,
    donationPageRoute,
    corsiItemDetailsPageRoute,
    eventiItemDetailsPageRoute,
  ],
};
