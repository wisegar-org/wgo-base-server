import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventModel } from "../models/Event/EventModel";
import { EventTypeEnum } from "../models/enums";
import { ctx } from "../../wgo/handlers/AppContextHandler";

@Controller("/hb/corsi")
export class CorsiHandlebarsController {
  @Get("/")
  public async GetCorsiPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.corsi = "active";
    const eventModel = new EventModel(ctx);
    const filter = {
      title: "",
      class: "2022-2023",
      visible: "true",
      type: EventTypeEnum.Course,
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
    res.render("corsi", {
      ...defHeader,
      title: "Eventi",
      page: pageEvent,
      pageText: JSON.stringify(pageEvent),
    });
  }
}
