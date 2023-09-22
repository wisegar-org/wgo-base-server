import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";

@Controller("/hb/poll")
export class PollHandlebarsController {
  @Get("/")
  public async GetPollPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    res.render("poll", { ...defHeader, title: "Poll" });
  }
}
