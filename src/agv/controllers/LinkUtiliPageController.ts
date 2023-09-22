import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";

@Controller("/hb/linkutili")
export class LinkUtiliHandlebarsController {
  @Get("/")
  public async GetLinkUtiliPage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.link_utili = "active";
    const address = [
      {
        name: "Municipio di Vezia",
        url: "http://www.vezia.ch",
        img: "images/logos/vezia.ch.ico",
      },
      {
        name: "Conferenza Cantonale Genitori",
        url: "https://genitorinforma.ch/it/",
        img: "images/logos/Logo_CCG.png",
      },
      {
        name: "Pedibus",
        url: "http://www.pedibus.ch",
        img: "images/logos/pedibus.png",
      },
      {
        name: "ASPI",
        url: "http://www.aspi.ch",
        img: "images/logos/aspi.png",
      },
      {
        name: "Federazione Ticinese Famiglie diurne",
        url: "http://www.famigliediurne.ch",
        img: "images/logos/cropped-logo_mammediurne.png",
      },
      {
        name: "ZURICH precorsovita",
        url: "https://www.zurichvitaparcours.ch/it",
        img: "images/logos/zurich_precorso_logo_it.png",
      },
      {
        name: "Svizzera Mobile",
        url: "https://www.schweizmobil.ch/it/veloland/veloland.html",
        img: "images/logos/svizzera_logo_vl.svg",
      },
      {
        name: "Internet - INFOGIOVANI",
        url: "https://www4.ti.ch/generale/infogiovani/salute-e-benessere/nonsolodroghe/internet/",
        img: "images/logos/ti-ch.png",
      },
      {
        name: "Infofamiglie",
        url: "https://www3.ti.ch/DSS/infofamiglie/",
        img: "images/logos/logo_infofamiglie.gif",
      },
      {
        name: "Salute Psi",
        url: "https://www.santepsy.ch/it/pages/risorse-a-disposizione-dei-futuri-genitori-e-di-genitori-di-bambini-piccoli-1011",
        img: "images/logos/logo-santepsy_it.png",
      },
      {
        name: "Forum Genitorialità",
        url: "https://www.xn--genitorialit-99a.ch/it/",
        img: "images/logos/logo_fg.jpg",
      },
      {
        name: "Veloland",
        url: "https://www.schweizmobil.ch/it/veloland/veloland.html",
        img: "images/logos/logo-desktop_it2.png",
      },
      {
        name: "Escursioni in Ticino",
        url: "https://www.ticino.ch/it/explore/excursions.html",
        img: "images/logos/ticinoturismo.svg",
      },
    ];
    res.render("link_utili", { ...defHeader, title: "Link Utili", address });
  }
}
