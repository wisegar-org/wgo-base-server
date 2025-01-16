import { WRouteRecordRaw } from "src/models/WRouteRecordRaw";

export const donationPageRoute: WRouteRecordRaw = {
  path: "/donazione",
  name: "donazione",
  label: "WGO_DONAZIONE",
  component: () => import("src/modules/agv/pages/DonationPage.vue"),
};
