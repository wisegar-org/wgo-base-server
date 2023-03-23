import { DataSource, Repository } from "typeorm";
import { IContextBase } from "@wisegar-org/wgo-base-models";
import { TemplateEntity } from "../database/entities/TemplateEntity";
import { TemplateInput } from "../resolvers/TemplateInputs";

export class TemplateModel {
  private ctx: IContextBase;
  private dataSource: DataSource;
  private templateRepository: Repository<TemplateEntity>;
  /**
   *
   */
  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.dataSource = this.ctx.dataSource;
    this.templateRepository = this.dataSource.getRepository(TemplateEntity);
  }

  async saveTamplate(data: TemplateInput) {
    let template: TemplateEntity | null = null;
    if (data.id) {
      template = await this.templateRepository.findOne({
        where: {
          id: data.id,
        },
      });
    }

    if (!template) {
      template = new TemplateEntity();
    }

    template.title = data.title;
    template.body = data.body;
    template.documentType = data.documentType;
    const result = await this.templateRepository.manager.save(template);
    return this.ParseTemplate(result, data.documentType);
  }

  async getTemplateByType(documentType: string) {
    const template = await this.templateRepository.findOne({
      where: {
        documentType,
      },
    });
    return this.ParseTemplate(template, documentType);
  }

  ParseTemplate(template: TemplateEntity | null, type: string) {
    if (!template) return { id: 0, title: "", body: "", documentType: type };
    return {
      id: template.id,
      title: template.title,
      body: template.body,
      documentType: template.documentType,
    };
  }
}
