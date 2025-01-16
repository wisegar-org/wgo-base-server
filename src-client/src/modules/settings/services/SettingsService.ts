import {
  ISetSettingsParam,
  ISettingsModel,
} from "@wisegar-org/wgo-base-models/build/settings";
import {
  SETTINGS_PATH_GET_ALL_SETTINGS,
  SETTINGS_PATH_SET_SETTING,
} from "@wisegar-org/wgo-base-models/build/settings/server";
import { ApiService } from "../../core/services/ApiService";
import { M_SETTING_POST, Q_SETTINGS_GETALL } from "./SettingsServiceQueries";

export class SettingsService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllSettings(): Promise<ISettingsModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_SETTINGS_GETALL,
        fetchPolicy: "no-cache",
        variables: {},
      })) as {
        data: { [SETTINGS_PATH_GET_ALL_SETTINGS]: ISettingsModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[SETTINGS_PATH_GET_ALL_SETTINGS];
      }

      return [];
    } catch (error) {
      console.log("SettingsService getAllSettings error: ", error);
      return [];
    }
  }

  async postSettings(setting: ISetSettingsParam) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_SETTING_POST,
        variables: {
          data: setting,
        },
      })) as {
        data: { [SETTINGS_PATH_SET_SETTING]: ISettingsModel };
      };
      if (response && response.data) {
        const { data } = response;
        return data[SETTINGS_PATH_SET_SETTING];
      }

      return undefined;
    } catch (error) {
      console.log("SettingsService postSettings error: ", error);
      return undefined;
    }
  }
}
