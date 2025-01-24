import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { Controller, Get, Post } from "../../../core";
import { ContactMeModel } from "../../../contact";
import { WGEmailModel } from "../../../email";

@Controller("/contatto")
export class ContattoHandlebarsController {
  @Get("/")
  public async GetContattoPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.contatto = "active";
    const contactService = new ContactMeModel(ctx);
    const contact = await contactService.getContactData();
    res.render("pages/contatto-ejs", {
      ...defHeader,
      title: "Contatto",
      contact,
    });
  }

  @Post("/sendMessage")
  public async PostComitatoMessage(req: Request, res: Response) {
    const wgEmailModel = new WGEmailModel(ctx);
    const body = req.body;
    const emailResponse = await wgEmailModel.sendEmailFromToAddressAndApp({
      body: "AGV_TEMPLATE_DATA_EMAILCONTACT",
      data: JSON.stringify({
        nome: body.nome,
        cognome: body.cognome,
        email: body.email,
        telefono: body.phone,
        messaggio: body.message,
      }),
      subject: "Contatto Email",
      to: `<${body.email}> "${body.nome} ${body.cognome}"`,
    });
    res.status(200).send(emailResponse);
  }
}
