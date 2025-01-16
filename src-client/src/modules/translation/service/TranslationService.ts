import { ApiService } from "../../core/services/ApiService";
import {
  Q_TRANSLATION_GETALL,
  Q_TRANSLATION_GETALLBYKEYS,
  M_TRANSLATION_SETTRANSLATION,
  Q_TRANSLATION_EXPORT_TRANSLATIONS,
  M_TRANSLATION_INPORT_TRANSLATIONS,
  M_TRANSLATION_DELETE_TRANSLATIONS,
} from "./TranslationServiceQueries";
import {
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_SET_TRANSLATION,
  TRANSLATION_PATH_EXPORT_TRANSLATION,
  TRANSLATION_PATH_IMPORT_TRANSLATION,
  TRANSLATION_PATH_DELETE_TRANSLATION,
} from "@wisegar-org/wgo-base-models/build/translation/server";
import {
  IExportTranslationsArg,
  IGetAllTranslationArg,
  IGetAllTranslationsByKeyArg,
  ISetTranslationArg,
  ITranslationDeleteArg,
  ITranslationModel,
} from "@wisegar-org/wgo-base-models/build/translation";

export class TranslationService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllTranslation(
    data: IGetAllTranslationArg
  ): Promise<ITranslationModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TRANSLATION_GETALL,
        fetchPolicy: "no-cache",
        variables: {
          data: data,
        },
      })) as {
        data: { [TRANSLATION_PATH_GET_ALL_TRANSLATION]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_GET_ALL_TRANSLATION];
      }

      return [];
    } catch (error) {
      console.log("TranslationService getAllTranslation error: ", error);
      return [];
    }
  }

  async getAllTranslationByKey(
    data: IGetAllTranslationsByKeyArg
  ): Promise<ITranslationModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TRANSLATION_GETALLBYKEYS,
        fetchPolicy: "no-cache",
        variables: {
          data: data,
        },
      })) as {
        data: { [TRANSLATION_PATH_GET_ALL_BY_KEYS]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_GET_ALL_BY_KEYS];
      }

      return [];
    } catch (error) {
      console.log("TranslationService getAllTranslationByKey error: ", error);
      return [];
    }
  }

  async setTranslation(lang: ISetTranslationArg) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TRANSLATION_SETTRANSLATION,
        variables: {
          data: lang,
        },
      })) as {
        data: { [TRANSLATION_PATH_SET_TRANSLATION]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_SET_TRANSLATION];
      }

      return [];
    } catch (error) {
      console.log("TranslationService setTranslation error: ", error);
      return [];
    }
  }

  async deleteTranslation(translation: ITranslationDeleteArg) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TRANSLATION_DELETE_TRANSLATIONS,
        variables: {
          data: translation,
        },
      })) as {
        data: { [TRANSLATION_PATH_DELETE_TRANSLATION]: ITranslationModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_DELETE_TRANSLATION];
      }

      return [];
    } catch (error) {
      console.log("TranslationService deleteTranslation error: ", error);
      return [];
    }
  }

  async importTranslations(data: any) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TRANSLATION_INPORT_TRANSLATIONS,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
        context: {
          hasUpload: true,
        },
      })) as {
        data: { [TRANSLATION_PATH_IMPORT_TRANSLATION]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_IMPORT_TRANSLATION];
      }

      return false;
    } catch (error) {
      console.log("TranslationService setTranslation error: ", error);
      return false;
    }
  }

  async exportTranslations(data: IExportTranslationsArg) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TRANSLATION_EXPORT_TRANSLATIONS,
        fetchPolicy: "no-cache",
        variables: {
          data: data,
        },
      })) as {
        data: { [TRANSLATION_PATH_EXPORT_TRANSLATION]: string };
      };
      if (response && response.data) {
        const { data } = response;
        return data[TRANSLATION_PATH_EXPORT_TRANSLATION];
      }

      return "";
    } catch (error) {
      console.log("TranslationService exportTranslations error: ", error);
      return "";
    }
  }
}
