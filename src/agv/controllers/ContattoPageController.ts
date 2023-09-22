import { Controller, Get, Post } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { ContactMeModel } from "../../contact";
import { EmailModel } from "../../email";
import { ctx } from "../../wgo/handlers/AppContextHandler";

@Controller("/hb/contatto")
export class ContattoHandlebarsController {
  @Get("/")
  public async GetContattoPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.contatto = "active";
    const contactService = new ContactMeModel(ctx);
    const contact = await contactService.getContactData();
    res.render("contatto", { ...defHeader, title: "Contatto", contact });
  }

  @Post("/sendMessage")
  public async PostComitatoMessage(req: Request, res: Response) {
    const emailModel = new EmailModel(ctx);
    const body = req.body;
    const emailResponse = await emailModel.sendEmailFromToAddressAndApp({
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
