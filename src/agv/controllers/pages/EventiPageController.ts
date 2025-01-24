import { AGVEventModel } from "../../models/Event/EventModel";
import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventTypeEnum } from "../../models/enums";
import { Controller, Get } from "../../../core";

@Controller("/eventi")
export class EventiHandlebarsController {
  @Get("/")
  public async GetEventiPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.eventi = "active";
    const eventModel = new AGVEventModel(ctx);

    // Obtener el parámetro de año desde la query string
    const selectedYear = req.query.year || "";

    // Filtrar los eventos basados en el año seleccionado
    const filter = {
      title: "",
      class: selectedYear,
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

    // Mapear las imágenes asociadas a los eventos
    const mediaMap = pageEvent.events.reduce((acc: any, event: any) => {
      if (event.imgTitle?.url) {
        acc[event.id] = event.imgTitle.url;
      }
      return acc;
    }, {});

    // Log para asegurar que el mediaMap esté bien formado
    console.log("Mapa de medios de eventos:", mediaMap);

    const uniqueYears = [
      ...new Set(pageEvent.events.map((event) => event.class)),
    ];

    res.render("pages/eventi-ejs", {
      ...defHeader,
      title: "Eventi",
      eventi: pageEvent.events,
      mediasOfEvents: mediaMap,
      uniqueYears,
      selectedYear,
    });
  }
}
