import {
  ILanguageModel,
  ILanguagePostArg,
} from "@wisegar-org/wgo-base-models/build/language";
import { TranslationStore } from "../../translation/store/TranslationStore";
import { LANGUAGE_ID } from "@wisegar-org/wgo-base-models/build/language/constants";
import { LanguageService } from "../service/LanguageService";
import { LocalStorage } from "../../../services/LocalStorage";

export class LanguageStore {
  allLangs: ILanguageModel[];
  selectedLang: ILanguageModel;
  defaultLang: ILanguageModel;
  translationStore: TranslationStore;

  /**
   *
   */
  constructor(translationStore?: TranslationStore) {
    this.allLangs = [];
    this.selectedLang = {} as ILanguageModel;
    this.defaultLang = {} as ILanguageModel;
    this.translationStore = translationStore
      ? translationStore
      : new TranslationStore();
  }

  async loadAllLanguage() {
    const languageService = new LanguageService();
    const languages = await languageService.getAllLanguage();
    if (languages.length > 0) {
      const languageDefaults = languages.filter((lang) => lang.default);
      const langDefault =
        languageDefaults.length > 0 ? languageDefaults[0] : languages[0];
      const selected =
        this.selectedLang &&
        languages.findIndex((item) => item.code === this.selectedLang.code) !==
          -1
          ? this.selectedLang
          : langDefault;
      await this.setSelectedLang(selected);
      this.defaultLang = langDefault;
      this.allLangs = languages;
    } else {
      this.allLangs = [];
      this.selectedLang = {} as ILanguageModel;
      this.defaultLang = {} as ILanguageModel;
    }
  }

  async setSelectedLang(langSelected: ILanguageModel) {
    if (this.selectedLang.id !== langSelected.id) {
      await this.translationStore.setLanguageId(langSelected.id);
    }
    LocalStorage.setItem(LANGUAGE_ID, `${langSelected.id}`);
    this.selectedLang = langSelected;
  }

  async addLanguage(lang: ILanguagePostArg) {
    const languageService = new LanguageService();
    const langResult = await languageService.postLanguage(lang);
    if (!!langResult) {
      await this.loadAllLanguage();
    }

    return !!langResult;
  }

  async editLanguage(lang: ILanguageModel) {
    const languageService = new LanguageService();
    const langResult = await languageService.putLanguage(lang);
    if (!!langResult) {
      await this.loadAllLanguage();
    }

    return !!langResult;
  }

  allLanguage() {
    return this.allLangs.filter((lang) => lang.enabled);
  }

  setTranslationStore(translationStore: TranslationStore) {
    this.translationStore = translationStore;
  }
}
