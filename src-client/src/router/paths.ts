import {
  translations,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";

export const Paths: IRouteObject = {
  home: {
    path: "/",
    label: translations.HOME,
    name: "home",
    auth: false,
  },
};
