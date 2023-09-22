import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";

@Controller("/hb/rules")
export class RulesHandlebarsController {
  @Get("/")
  public async GetRulesPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    res.render("rules", { ...defHeader, title: "Rules" });
  }
}
