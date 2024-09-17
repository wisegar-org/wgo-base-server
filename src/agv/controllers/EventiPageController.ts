import { Controller, Get } from "../../core";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventModel } from "../models/Event/EventModel";
import { EventTypeEnum } from "../models/enums";
import { ctx } from "../../wgo/handlers/AppContextHandler";
@Controller("/hb/eventi")
export class EventiHandlebarsController {
  @Get("/")
  public async GetEventiPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.eventi = "active";
    const eventModel = new EventModel(ctx);
    const filter = {
      title: "",
      class: "2022-2023",
      visible: "true",
      type: EventTypeEnum.Event,
    };
    const pageEvent = await eventModel.getPage(
      {
        descending: true,
        filter: filter as any,
        skip: 0,
        take: 5,
        sortBy: "startDate",
      },
      ""
    );
    res.render("eventi", {
      ...defHeader,
      title: "Eventi",
      page: pageEvent,
      pageText: JSON.stringify(pageEvent),
    });
  }

  @Get("/p/:page/cls/:filterClass/ftr/:text")
  public async GetEventiPageFilter(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.eventi = "active";
    const params = req.params;

    const eventModel = new EventModel(ctx);
    const filter = {
      title: params.text,
      class: params.filterClass !== "Tutte" ? params.filterClass : "",
      visible: "true",
      type: "Evento",
    };
    const pageEvent = await eventModel.getPage(
      { descending: true, filter: filter as any, skip: 0, take: 5, sortBy: "" },
      ""
    );
    res.render("eventi", { ...defHeader, title: "Eventi", page: pageEvent });
  }
}
