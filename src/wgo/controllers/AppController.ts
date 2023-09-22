import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";

@Controller("/api")
export class AppController {
  @Get("/version")
  public GetVersion(req: Request, res: Response) {
    res.status(200).json("{version: 'v0.0.1'}");
  }
}
