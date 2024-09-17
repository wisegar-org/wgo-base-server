import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { EventModel } from "../models/Event/EventModel";
import { ctx } from "../../wgo/handlers/AppContextHandler";
import { Controller, Get } from "../../core";

@Controller("/")
export class HomeHandlebarsController {
  @Get("/")
  public async GetHomePage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.home = "active";
    const eventModel = new EventModel(ctx);
    const nextEvent = await eventModel.getNexts("");
    const data: { [key: string]: any } = { ...defHeader, title: "Home" };
    if (nextEvent.corso) data.corso = nextEvent.corso;
    if (nextEvent.corsi) data.corsi = nextEvent.corsi;
    if (nextEvent.evento) data.evento = nextEvent.evento;
    if (nextEvent.eventi) data.eventi = nextEvent.eventi;
    res.render("home", data);
  }
}
