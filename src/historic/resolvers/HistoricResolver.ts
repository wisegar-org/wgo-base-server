import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import {
  HISTORIC_PATH_GET_FILTERS,
  HISTORIC_PATH_GET_PAGE,
  IContextBase,
} from "@wisegar-org/wgo-base-models";
import { HistoricEntity } from "../database/entities/HistoricEntity";
import { HistoricModel } from "../models/HistoricModel";
import { HistoricPageInput } from "./HistoricInputs";
import {
  HistoricFiltersResponse,
  HistoricPageResponse,
} from "./HistoricResponses";

@Resolver()
export class HistoricResolver {
  @Authorized()
  @Query(() => HistoricPageResponse, { name: HISTORIC_PATH_GET_PAGE })
  async getHistoricPage(
    @Arg("data") data: HistoricPageInput,
    @Ctx() ctx: IContextBase
  ) {
    const historyService = new HistoricModel(HistoricEntity, ctx);
    const filter: { [key: string]: string } = {};
    if (data.filter?.action) filter.action = data.filter.action;
    if (data.filter?.entity) filter.entity = data.filter.entity;
    if (data.filter?.username) filter.username = data.filter.username;

    const order = data.sortBy
      ? { [data.sortBy]: data.descending ? "DESC" : "ASC" }
      : { id: "DESC" };

    const histories = await historyService.getHistoricPageByCriteria(
      filter,
      order,
      data.skip,
      data.take
    );
    return {
      histories: histories[0].map((history) =>
        HistoricModel.ParseHistoricResponse(history)
      ),
      count: histories[1],
    };
  }

  @Authorized()
  @Query(() => HistoricFiltersResponse, { name: HISTORIC_PATH_GET_FILTERS })
  async getHistoricFilters(@Ctx() ctx: IContextBase) {
    const historyService = new HistoricModel(HistoricEntity, ctx);
    const filters = await historyService.getHistoricFilters();
    return filters;
  }
}
