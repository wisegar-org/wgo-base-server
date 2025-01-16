import { ApiService } from "../../core/services/ApiService";
import {
  M_AUTH_CLEAR_LOCAL_STORAGE,
  M_AUTH_SET_KEY_LOCAL_STORAGE,
  Q_AUTH_GET_LOCAL_STORAGE,
} from "./LocalStorageServiceQueries";
import {
  AUTH_PATH_CLEAR_LOCAL_STORAGE,
  AUTH_PATH_GET_LOCAL_STORAGE,
  AUTH_PATH_SET_KEY_LOCAL_STORAGE,
} from "@wisegar-org/wgo-base-models/build/authentication/server";

export class LocalStorageService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getLocalStore(): Promise<any> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_GET_LOCAL_STORAGE,
        fetchPolicy: "no-cache",
      })) as { data: { [AUTH_PATH_GET_LOCAL_STORAGE]: { storage: any } } };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_GET_LOCAL_STORAGE].storage
          ? JSON.parse(data[AUTH_PATH_GET_LOCAL_STORAGE].storage)
          : {};
      } else {
      }
    } catch (error) {
      console.log("AuthService getLocalStore error: ", error);
      return {};
    }
  }
  async clearLocalStorage(): Promise<any> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_CLEAR_LOCAL_STORAGE,
        fetchPolicy: "no-cache",
      })) as { data: { [AUTH_PATH_CLEAR_LOCAL_STORAGE]: boolean } };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_CLEAR_LOCAL_STORAGE];
      } else {
        return false;
      }
    } catch (error) {
      console.log("AuthService clearLocalStorage error: ", error);
      return false;
    }
  }
  async setKeyLocalStore(key: string, value: string): Promise<any> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_SET_KEY_LOCAL_STORAGE,
        fetchPolicy: "no-cache",
        variables: {
          key,
          value,
        },
      })) as { data: { [AUTH_PATH_SET_KEY_LOCAL_STORAGE]: boolean } };
      if (response && response.data) {
        const { data } = response;

        return data[AUTH_PATH_SET_KEY_LOCAL_STORAGE];
      } else {
        return false;
      }
    } catch (error) {
      console.log("AuthService setKeyLocalStore error: ", error);
      return false;
    }
  }
}
