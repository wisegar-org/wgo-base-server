import { GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { TranslationResolver } from "../../../translation";
import {
  IContextBase,
  TRANSLATION_PATH_IMPORT_TRANSLATION,
} from "wgo-core-models";

@InputType()
export class ImportTranslationsInput {
  @Field(() => GraphQLUpload, { description: "File uploaded", nullable: true })
  file!: typeof GraphQLUpload;
}

@Resolver()
export class PublicTranslationResolver extends TranslationResolver {
  @Mutation(() => Boolean, { name: TRANSLATION_PATH_IMPORT_TRANSLATION })
  async importTranslations(
    @Arg("data") data: ImportTranslationsInput,
    @Ctx() ctx: IContextBase
  ) {
    const result = await this.importTranslationsPrivate(data, ctx);
    return result;
  }
}
