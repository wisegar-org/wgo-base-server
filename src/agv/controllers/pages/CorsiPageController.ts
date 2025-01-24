import { AGVEventModel } from "../../models/Event/EventModel";
import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventTypeEnum } from "../../models/enums";
import { Controller, Get } from "../../../core";

@Controller("/corsi")
export class CorsiHandlebarsController {
  @Get("/")
  public async GetCorsiPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.corsi = "active";
    const eventModel = new AGVEventModel(ctx);

    // Obtener el parámetro de año desde la query string
    const selectedYear = req.query.year || "";

    // Filtrar los cursos basados en el año seleccionado
    const filter = {
      title: "",
      class: selectedYear,
      visible: "true",
      type: EventTypeEnum.Course, // Tipo de curso
    };

    const pageEvent = await eventModel.getPage(
      {
        descending: true,
        filter: filter as any,
        skip: 0,
        take: 10,
        sortBy: "startDate",
      },
      ""
    );

    // Mapear las imágenes asociadas a los cursos
    const mediaMap = pageEvent.events.reduce((acc: any, course: any) => {
      if (course.imgTitle?.url) {
        acc[course.id] = course.imgTitle.url;
      }
      return acc;
    }, {});

    // Obtener los años únicos de los cursos
    const uniqueYears = [
      ...new Set(pageEvent.events.map((course) => course.class)),
    ];

    // Renderizar la vista con los cursos filtrados
    res.render("pages/corsi-ejs", {
      ...defHeader,
      title: "Corsi",
      corsi: pageEvent.events,
      mediasOfCourses: mediaMap,
      uniqueYears,
      selectedYear,
    });
  }
}
