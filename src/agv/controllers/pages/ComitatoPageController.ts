import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { AGVContentModel } from "../../models/Content/ContentModel";
import { Controller, Get, Post } from "../../../core";
import { WGEmailModel } from "../../../email";

@Controller("/comitato")
export class ComitatoHandlebarsController {
  @Get("/")
  public async GetComitatoPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.comitato = "active";
    const contentModel = new AGVContentModel(ctx);
    const contents = await contentModel.getContents();
    res.render("comitato", { ...defHeader, title: "Comitato", contents });
  }

  @Post("/sendMessage")
  public async PostComitatoMessage(req: Request, res: Response) {
    const wgEmailModel = new WGEmailModel(ctx);
    const body = req.body;
    const emailResponse = await wgEmailModel.sendEmailFromToAddressAndApp({
      body: "AGV_TEMPLATE_DATA_EMAILCOMITATO",
      data: JSON.stringify({
        nome: body.nome,
        cognome: body.cognome,
        email: body.email,
        telefono: body.phone,
        messaggio: body.message,
      }),
      subject: "Comitato Email",
      to: `<${body.email}> "${body.nome} ${body.cognome}"`,
    });
    res.status(200).send(emailResponse);
  }
}
