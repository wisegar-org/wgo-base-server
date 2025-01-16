import { ApiService } from "../../core/services/ApiService";
import {
  IStorageAllInput,
  IStorageInput,
  IStoragePageInput,
  IStorageResponse,
  IStoragePageModel,
} from "@wisegar-org/wgo-base-models/build/storage";
import {
  STORAGE_PATH_DELETE_STORAGE,
  STORAGE_PATH_GET_STORAGE_BY_PAGE,
  STORAGE_PATH_GET_STORAGE_BY_TYPE,
  STORAGE_PATH_POST_STORAGE,
  STORAGE_PATH_PUT_STORAGE,
} from "@wisegar-org/wgo-base-models/build/storage/server";
import {
  Q_STORAGE_ITEMSBYPAGE,
  M_STORAGE_CREATEITEM,
  M_STORAGE_MODIFYITEM,
  M_STORAGE_DELETEITEM,
  Q_STORAGE_ALLITEMS,
} from "./StorageServiceQueries";

export class StorageService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getStorageByPagination(
    data: IStoragePageInput
  ): Promise<IStoragePageModel> {
    try {
      const response = (await this.apiService.query({
        query: Q_STORAGE_ITEMSBYPAGE,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [STORAGE_PATH_GET_STORAGE_BY_PAGE]: IStoragePageModel };
      };

      if (response.data && response.data[STORAGE_PATH_GET_STORAGE_BY_PAGE]) {
        const { data } = response;
        return data[STORAGE_PATH_GET_STORAGE_BY_PAGE];
      }
      return { storageItemsCount: 0, storageItems: [] };
    } catch (error) {
      throw `StorageService getStorageByPagination: ${error as string}`;
    }
  }

  public async getStorageByType(
    data: IStorageAllInput
  ): Promise<IStorageResponse[]> {
    try {
      const response = (await this.apiService.query({
        query: Q_STORAGE_ALLITEMS,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [STORAGE_PATH_GET_STORAGE_BY_TYPE]: IStorageResponse[] };
      };

      if (response.data && response.data[STORAGE_PATH_GET_STORAGE_BY_TYPE]) {
        const { data } = response;
        return data[STORAGE_PATH_GET_STORAGE_BY_TYPE];
      }
      return [];
    } catch (error) {
      throw `StorageService getStorageByType: ${error as string}`;
    }
  }

  public async createStorageItem(data: IStorageInput): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_CREATEITEM,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [STORAGE_PATH_POST_STORAGE]: boolean } };

      if (response.data && response.data[STORAGE_PATH_POST_STORAGE]) {
        const { data } = response;
        return data[STORAGE_PATH_POST_STORAGE];
      }
      return false;
    } catch (error) {
      throw `StorageService createStorageItem: ${error as string}`;
    }
  }

  public async modifyStorageItem(data: IStorageInput): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_MODIFYITEM,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [STORAGE_PATH_PUT_STORAGE]: boolean } };

      if (response.data && response.data[STORAGE_PATH_PUT_STORAGE]) {
        const { data } = response;
        return data[STORAGE_PATH_PUT_STORAGE];
      }
      return false;
    } catch (error) {
      throw `StorageService modifyStorageItem: ${error as string}`;
    }
  }

  public async deleteStorageItem(id: number): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_STORAGE_DELETEITEM,
        variables: {
          id: id,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [STORAGE_PATH_DELETE_STORAGE]: boolean } };

      if (response.data && response.data[STORAGE_PATH_DELETE_STORAGE]) {
        const { data } = response;
        return data[STORAGE_PATH_DELETE_STORAGE];
      }
      return false;
    } catch (error) {
      throw `StorageService deleteStorageItem: ${error as string}`;
    }
  }
}
