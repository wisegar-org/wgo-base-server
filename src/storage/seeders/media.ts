import { IContextBase } from "@wisegar-org/wgo-base-models";
import { MediaModel } from "../models/MediaModel";

export const mediaPublicSeeder = async (ctx: IContextBase) => {
  const mediaModel = new MediaModel(ctx);
  await mediaModel.saveAllPublicMediaOnFiles();
};
