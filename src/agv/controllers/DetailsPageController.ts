import { Controller, Get, Post } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventModel } from "../models/Event/EventModel";
import { AGVInscriptionModel } from "../models/Inscription/InscriptionModel";
import { ctx } from "../../wgo/handlers/AppContextHandler";
import { AGVEmailModel } from "../models/email";

@Controller("/hb/details")
export class DetailsHandlebarsController {
  @Get("/:id")
  public async GetDetailsPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    const eventId = req.params.id;
    try {
      const eventModel = new EventModel(ctx);
      const event = await eventModel.getEvent(parseInt(eventId), "");
      if (event?.type === "Evento") defHeader.headerClass.eventi = "active";
      else defHeader.headerClass.corsi = "active";

      res.render("details", {
        ...defHeader,
        title: "Details",
        event,
        eventText: JSON.stringify(event),
        class: [
          "SI-Piccolo",
          "SI-Medio",
          "SI-Grande",
          "SE-I",
          "SE-II",
          "SE-III",
          "SE-IV",
          "SE-V",
        ],
        active: (event?.imgList || []).length > 0 ? event?.imgList[0].id : 0,
      });
    } catch {}
  }

  @Post("/:id/enrollment")
  public async PostComitatoMessage(req: Request, res: Response) {
    //AGV_TEMPLATE_DATA_INSCRIPTION
    //AGV_TEMPLATE_DATA_INSCRIPTIONREPT
    const body = req.body;
    const inscriptionService = new AGVInscriptionModel(ctx);
    const eventId = parseInt(req.params.id || "0");
    const inscrpt = await inscriptionService.create({
      class: body.class,
      nome: body.nome,
      cognome: body.cognome,
      email: body.email,
      phone: body.phone,
      message: body.message,
      eventId,
      id: 0,
    });
    if (!inscrpt.error) {
      const eventModel = new EventModel(ctx);
      const event = await eventModel.getEvent(eventId, "");
      const emailModel = new AGVEmailModel(ctx);
      const emailResponse = await emailModel.sendEmailFromToAddressAndApp({
        body: inscrpt.exist
          ? "AGV_TEMPLATE_DATA_INSCRIPTIONREPT"
          : "AGV_TEMPLATE_DATA_INSCRIPTION",
        data: JSON.stringify({
          utente: {
            nome: body.nome,
            cognome: body.cognome,
            email: body.email,
            telefono: body.phone,
            messaggio: `<p>${body.message.split("\n").join("</p><p>")}</p>`,
            classe: body.class,
          },
          evento: {
            titolo: event?.title,
            tipo: event?.type,
            corso: event?.class,
            datadInizio: event?.startDate,
            datadiFine: event?.endDate,
            descrizione: event?.description,
            breveDescrizione: event?.shortDescription,
            url: body.url,
          },
        }),
        subject: "Enrollment Email",
        to: `<${body.email}> "${body.nome} ${body.cognome}"`,
      });
      res.status(200).send(inscrpt);
    } else res.status(200).send({ error: true });
  }
}
