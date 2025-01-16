import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { Paths } from "../router/paths";

const listItems: MenuListItem[] = [
  {
    label: Paths.home.label,
    id: Paths.home.name,
    icon: "home",
    link: Paths.home.path,
    role: Paths.home.role,
    auth: Paths.home.auth,
    color: "blue",
    type: "item",
  },
];

export const LinksList: MenuListItem[] = listItems; //.concat(TestMenu);
