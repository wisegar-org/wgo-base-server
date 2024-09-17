import { Repository } from "typeorm";
import { IIndexContentInput } from "../models/IndexContent";
import IndexContentEntity from "../database/entities/IndexContentEntity";
import { IContextBase } from "wgo-core-models";
import { MediaModel } from "../../storage";
import { TranslationModel } from "../../translation";

export class IndexContentService {
  financeModuleRepository: Repository<IndexContentEntity>;
  mediaModel: MediaModel;
  ctx: IContextBase;
  translationModel: TranslationModel;
  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.financeModuleRepository =
      ctx.dataSource.getRepository(IndexContentEntity);
    this.mediaModel = new MediaModel(ctx);
    this.translationModel = new TranslationModel(ctx);
  }

  async getFinanceIndexContent(urlApi: string) {
    const module = await this.financeModuleRepository.findOne({
      where: {
        id: 1,
      },
      relations: ["image"],
    });
    if (module) {
      return {
        image: module.image
          ? this.mediaModel.getMediaResponse(module.image, urlApi)
          : null,
      };
    }
    return {
      image: null,
    };
  }

  async setFinanceIndexContent(data: IIndexContentInput) {
    let module = await this.financeModuleRepository.findOne({
      where: {
        id: 1,
      },
    });
    if (!module) {
      module = new IndexContentEntity();
      module.id = 1;
    }

    const media = data.imageId
      ? await this.mediaModel.getMediaList([data.imageId])
      : null;
    if (media && media.length > 0) {
      module.image = media[0];
    }

    for (const translation of data.translations) {
      await this.translationModel.setTranslation(
        translation.languageId,
        translation.key,
        translation.value
      );
    }

    await this.financeModuleRepository.manager.save(module);

    return true;
  }
}
