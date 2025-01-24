import { AGVEventModel } from "../../models/Event/EventModel";
import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { AGVInscriptionModel } from "../../models/Inscription/InscriptionModel";
import { Controller, Get, Post } from "../../../core";
import { WGEmailModel } from "../../../email";

@Controller("/details")
export class DetailsHandlebarsController {
  @Get("/:id")
  public async GetDetailsPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    const eventId = req.params.id;

    try {
      const eventModel = new AGVEventModel(ctx);
      const event = await eventModel.getEvent(parseInt(eventId), "");

      // Diferenciar entre eventos y cursos
      if (event?.type === "Evento") {
        defHeader.headerClass.eventi = "active";
      } else if (event?.type === "Corso") {
        defHeader.headerClass.corsi = "active";
      }

      // Verificar si 'imgTitle' tiene la propiedad correcta para la URL
      const mediaMap: { [key: number]: string } = {};
      if (event && event.imgTitle && typeof event.imgTitle === "object") {
        const imgUrl =
          (event.imgTitle as any).url || (event.imgTitle as any).path;
        if (imgUrl) {
          mediaMap[event.id] = imgUrl;
        }
      }

      // Renderizar la vista para eventos o cursos dependiendo del tipo
      if (event?.type === "Evento") {
        res.render("pages/eventi-details-ejs", {
          ...defHeader,
          title: "Details",
          event,
          mediasOfEvents: mediaMap,
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
      } else if (event?.type === "Corso") {
        res.render("pages/corsi-details-ejs", {
          // Aquí especificas tu plantilla para detalles de cursos
          ...defHeader,
          title: "Course Details",
          course: event, // Pasamos los detalles del curso
          mediasOfCourses: mediaMap, // Pasamos las imágenes de los cursos
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
      }
    } catch (error) {
      console.error("Error al obtener detalles del evento/curso:", error);
      res.status(500).send("Error al obtener detalles del evento/curso");
    }
  }

  @Post("/:id/enrollment")
  public async PostEnrollment(req: Request, res: Response) {
    console.log("Datos de inscripción recibidos:", req.body);
    try {
      const body = req.body;
      if (!body.message || !body.nome || !body.email) {
        return res
          .status(400)
          .send({ error: "Todos los campos son obligatorios" });
      }

      const inscriptionService = new AGVInscriptionModel(ctx);
      const eventId = parseInt(req.params.id || "0");

      const inscription = await inscriptionService.create({
        class: body.class,
        nome: body.nome,
        cognome: body.cognome,
        email: body.email,
        phone: body.phone,
        message: body.message,
        eventId,
        id: 0,
      });

      if (inscription.error) {
        return res.status(500).send({ error: "Error al crear la inscripción" });
      }

      const eventModel = new AGVEventModel(ctx);
      const event = await eventModel.getEvent(eventId, "");

      const wgEmailModel = new WGEmailModel(ctx);
      const emailResponse = await wgEmailModel.sendEmailFromToAddressAndApp({
        body: inscription.exist
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

      if (!emailResponse) {
        return res
          .status(500)
          .send({ error: "No se pudo enviar el correo de inscripción" });
      }

      return res.status(200).send(inscription);
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Error al procesar la inscripción" });
    }
  }
}
