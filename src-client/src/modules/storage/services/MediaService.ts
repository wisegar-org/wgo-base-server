import { ApiService } from "../../core/services/ApiService";
import {
  IMediaInputArg,
  IMediasInputArg,
} from "@wisegar-org/wgo-base-models/build/storage";
import {
  MEDIA_PATH_DELETE_FILES,
  MEDIA_PATH_GET_FILE,
  MEDIA_PATH_POST_FILE,
  MEDIA_PATH_POST_FILES,
} from "@wisegar-org/wgo-base-models/build/storage/server";
import {
  M_MEDIA_DELETEFILE,
  M_MEDIA_UPLOADFILE,
  M_MEDIA_UPLOADFILES,
  Q_MEDIA_GETFILE,
} from "./MediaServiceQueries";
import { IMediaModel } from "@wisegar-org/wgo-base-models/build/core";

export class MediaService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async uploadFile(
    data: IMediaInputArg,
    urlApi: string
  ): Promise<IMediaModel | null> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_UPLOADFILE,
        variables: {
          data: data,
          urlApi: urlApi,
        },
        fetchPolicy: "no-cache",
        context: {
          hasUpload: true,
        },
      })) as { data: { [MEDIA_PATH_POST_FILE]: IMediaModel } };

      if (response.data && response.data[MEDIA_PATH_POST_FILE]) {
        const { data } = response;
        return data[MEDIA_PATH_POST_FILE];
      }
      return null;
    } catch (error) {
      throw `MediaService uploadFile: ${error as string}`;
    }
  }

  public async uploadFiles(
    data: IMediasInputArg,
    urlApi: string
  ): Promise<IMediaModel[] | null> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_UPLOADFILES,
        variables: {
          data: data,
          urlApi: urlApi,
        },
        fetchPolicy: "no-cache",
        context: {
          hasUpload: true,
        },
      })) as { data: { [MEDIA_PATH_POST_FILES]: IMediaModel[] } };

      if (response.data && response.data[MEDIA_PATH_POST_FILES]) {
        const { data } = response;
        return data[MEDIA_PATH_POST_FILES];
      }
      return null;
    } catch (error) {
      throw `MediaService uploadFiles: ${error as string}`;
    }
  }

  public async getFile(id: number): Promise<IMediaModel | null> {
    try {
      const response = (await this.apiService.query({
        query: Q_MEDIA_GETFILE,
        variables: {
          id: id,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [MEDIA_PATH_GET_FILE]: IMediaModel } };

      if (response.data && response.data[MEDIA_PATH_GET_FILE]) {
        const { data } = response;
        return data[MEDIA_PATH_GET_FILE];
      }
      return null;
    } catch (error) {
      throw `MediaService getFile: ${error as string}`;
    }
  }

  public async deleteFile(id: number): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_DELETEFILE,
        variables: {
          id: id,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [MEDIA_PATH_DELETE_FILES]: boolean } };

      if (response.data && response.data[MEDIA_PATH_DELETE_FILES]) {
        const { data } = response;
        return data[MEDIA_PATH_DELETE_FILES];
      }
      return false;
    } catch (error) {
      throw `MediaService deleteFile: ${error as string}`;
    }
  }
}
