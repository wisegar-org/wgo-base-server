import { openURL } from "quasar";
import { EventClassOption } from "src/models/Events";

export const UtilService = {
  openNewTab(evt: Event, url: string) {
    evt.preventDefault();
    if (location.href.includes("/#")) {
      openURL(`/#${url}`);
    } else {
      openURL(url);
    }
  },
  openNewTabUrl(url: string) {
    if (location.href.includes("/#")) {
      openURL(`/#${url}`);
    } else {
      openURL(url);
    }
  },
  getDefaultClass() {
    const date = new Date();
    const year = `${date.getFullYear() + (date.getMonth() > 7 ? 0 : -1)}`;
    const filterYears = EventClassOption.filter((cls) => cls.startsWith(year));
    return filterYears.length > 0 ? filterYears[0] : EventClassOption[0];
  },
};
