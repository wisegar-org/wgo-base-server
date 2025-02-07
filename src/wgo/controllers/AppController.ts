import { Request, Response } from "express";
import { Controller } from "../../core/decorators/rest/Controller";
import { Get } from "../../core/decorators/rest/Get";

@Controller("/api")
export class AppController {
  @Get("/version")
  public GetVersion(req: Request, res: Response) {
    res.status(200).json("{version: 'v0.0.1'}");
  }
}
