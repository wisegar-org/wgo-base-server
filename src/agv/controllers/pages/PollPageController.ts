import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { Controller, Get } from "../../../core";

@Controller("/poll")
export class PollHandlebarsController {
  @Get("/")
  public async GetPollPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    res.render("poll", { ...defHeader, title: "Poll" });
  }
}
