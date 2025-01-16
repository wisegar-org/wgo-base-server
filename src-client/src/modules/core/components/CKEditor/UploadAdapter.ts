import { MediaService } from "../../../storage/services/MediaService";

export class UploadAdapter {
  loader: any;
  urlApi: string;
  /**
   *
   */
  constructor(loader: any, urlApi: string) {
    this.loader = loader;
    this.urlApi = urlApi;
  }

  upload() {
    return new Promise((res, rej) => {
      this.loader.file.then(async (file: any) => {
        const mediaService = new MediaService();
        const result = await mediaService.uploadFile(
          {
            file: file,
            isPublic: true,
          },
          this.urlApi
        );
        if (result && result.url)
          res({
            default: result.url,
          });
        else rej();
      });
    });
  }

  abort() {
    //todo
  }
}
