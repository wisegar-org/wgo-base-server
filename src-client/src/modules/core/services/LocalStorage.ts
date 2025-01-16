import { get, set, clear } from "local-storage";
import { LocalStorageService } from "./LocalStorageService";
import { ServiceProvider } from "./ServiceProvider";

export const LocalStorage = {
  getItem: (key: string): string => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key) || "";
      return value;
    } else {
      try {
        const value = get<string>(key) || "";
        return value;
      } catch (err) {
        return "";
      }
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    } else {
      return set(key, value);
    }
    const localStorageService = ServiceProvider.GetScoped(LocalStorageService);
    localStorageService.setKeyLocalStore(key, `${value}`);
    return true;
  },
  clear: () => {
    if (typeof window !== "undefined") localStorage.clear();
    else clear();
    const localStorageService = ServiceProvider.GetScoped(LocalStorageService);
    localStorageService.clearLocalStorage();
  },
};
