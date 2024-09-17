import { IMediaModel } from "wgo-core-models";
import { ITranslationArg } from "wgo-core-models";

export interface IIndexContentModel {
  image: IMediaModel;
}

export interface IIndexContentInput {
  imageId: number;
  translations: ITranslationArg[];
}
