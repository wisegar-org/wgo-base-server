import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { Controller, Get } from "../../../core";

@Controller("/rules")
export class RulesHandlebarsController {
  @Get("/")
  public async GetRulesPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    res.render("rules", { ...defHeader, title: "Rules" });
  }
}
