import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { TranslationResponse } from "./TranslationResponses";
import { TranslationModel } from "../models/TranslationModel";

import {
  DeleteTranslationInput,
  ExportTranslationInput,
  GetAllTranslationInput,
  GetTranslationByKeysInput,
  SetTranslationInput,
} from "./TranslationInputs";
import { GraphQLUpload } from "graphql-upload";
import {
  TRANSLATION_PATH_DELETE_TRANSLATION,
  TRANSLATION_PATH_EXPORT_TRANSLATION,
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_SET_TRANSLATION,
  IContextBase,
} from "wgo-core-models";

@Resolver()
export class TranslationResolver {
  @Query(() => [TranslationResponse], {
    name: TRANSLATION_PATH_GET_ALL_TRANSLATION,
  })
  async getAllTranslations(
    @Arg("data") data: GetAllTranslationInput,
    @Ctx() ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    const translations = await translationModel.getAllTranslation(data);
    return translations;
  }

  @Query(() => [TranslationResponse], {
    name: TRANSLATION_PATH_GET_ALL_BY_KEYS,
  })
  async getAllTranslationsByKey(
    @Arg("data") data: GetTranslationByKeysInput,
    @Ctx() ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    const translations = await translationModel.getAllTranslationByKeys(data);
    return translations;
  }

  @Mutation(() => [TranslationResponse], {
    name: TRANSLATION_PATH_SET_TRANSLATION,
  })
  async setTranslation(
    @Arg("data") data: SetTranslationInput,
    @Ctx() ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    if (data.translation) {
      const translation = await translationModel.setTranslation(
        data.translation.languageId,
        data.translation.key,
        data.translation.value
      );
      return [translation];
    } else if (data.translations) {
      const result: TranslationResponse[] = [];
      for (const translation of data.translations) {
        const translationResult = await translationModel.setTranslation(
          translation.languageId,
          translation.key,
          translation.value
        );
        result.push(translationResult);
      }
      return result;
    }

    return [];
  }

  @Mutation(() => Boolean, { name: TRANSLATION_PATH_DELETE_TRANSLATION })
  async deleteTranslation(
    @Arg("data") data: DeleteTranslationInput,
    @Ctx() ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    return await translationModel.deleteTranslation(data.key);
  }

  @Query(() => String, { name: TRANSLATION_PATH_EXPORT_TRANSLATION })
  async exportTranslations(
    @Arg("data") data: ExportTranslationInput,
    @Ctx() ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    const result = await translationModel.exportTranslations(
      data.languagesId || []
    );
    return result;
  }

  async importTranslationsPrivate(
    data: { file: typeof GraphQLUpload },
    ctx: IContextBase
  ) {
    const translationModel = new TranslationModel(ctx);
    const file = await data.file;
    const result = await translationModel.inportTranslations(file);
    return result;
  }
}
