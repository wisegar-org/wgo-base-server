import { ApiService } from "src/services/ApiService";
import { boot } from "quasar/wrappers";
import { getApiServiceOptions } from "src/api/ApiOptions";
import { useAuthStore } from "src/stores/authStore";
import { useLanguageStore } from "src/stores/languageStore";
import { useTranslationStore } from "src/stores/translationStore";
import { Translations } from "../settings/translations";
import { LanguageStore } from "src/modules/language/store/LanguageStore";
import { LocalStorageService } from "src/services/LocalStorageService";
import { LocalStorage } from "src/services/LocalStorage";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import fetch from "cross-fetch";
globalThis.fetch = fetch;

export default boot(({ app, store }) => {
  if (!ApiService.isDefineInstance()) {
    const apiServiceOptions = getApiServiceOptions(store);
    ApiService.GetInstance(apiServiceOptions);
  }

  //init store values
  const promises: Promise<boolean>[] = [];

  //Authentication store
  const authStore = useAuthStore(store);
  app.config.globalProperties.$authStore = authStore;

  //Translation store
  const translationStore = useTranslationStore();
  app.config.globalProperties.$translationStore = translationStore;

  //Language store
  const langStore = useLanguageStore(store);
  const lngstore = new LanguageStore();
  langStore.setLanguageStore(lngstore);
  translationStore.setTranslationStore(lngstore.translationStore);
  app.config.globalProperties.$langStore = langStore;

  const localStorageService = new LocalStorageService();

  promises.push(
    localStorageService.getLocalStore().then((json: ObjectDictionary) => {
      Object.keys(json).forEach((key) => LocalStorage.setItem(key, json[key]));
      return Promise.all([
        authStore.authStore.me(),
        langStore
          .loadAllLanguages()
          .then(() =>
            translationStore.getAndRegisterTranslations(Translations)
          ),
      ]).then(() => true);
    })
  );

  return Promise.all(promises).then(() => {
    console.log("All boots ready");
  });
});
