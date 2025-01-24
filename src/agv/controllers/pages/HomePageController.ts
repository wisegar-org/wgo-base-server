import { AGVEventModel } from "../../models/Event/EventModel";
import { ctx } from "../../handlers/AppContextHandler";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";

import { HomePageService } from "../../services/HomePageService";
import { Controller, Get, Post } from "../../../core";

@Controller("/")
export class HomeHandlebarsController {
  @Get("/")
  public async GetHomePage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.home = "active";
    const homePageService = new HomePageService(ctx);
    const eventModel = new AGVEventModel(ctx);

    const lastEvents = await homePageService.getLastEvents();

    // Crear un mapa de medios para los últimos eventos
    const mediaMapEvents = lastEvents.events.reduce((acc: any, event: any) => {
      if (event.imgTitle?.url) {
        acc[event.id] = event.imgTitle.url;
      }
      return acc;
    }, {});

    // Obtener los dos últimos cursos
    const lastCourses = await eventModel.getPage(
      {
        descending: true,
        filter: {
          visible: "true",
          type: "Corso",
          class: "",
          state: "",
          title: "",
          enrollment: "",
        }, // Filtrar solo cursos visibles
        skip: 0,
        take: 2, // Limitar a los dos cursos más recientes
        sortBy: "startDate", // Ordenar por la fecha de inicio
      },
      ""
    );

    // Crear un mapa de medios para los últimos cursos
    const mediaMapCourses = lastCourses.events.reduce(
      (acc: any, course: any) => {
        if (course.imgTitle?.url) {
          acc[course.id] = course.imgTitle.url;
        }
        return acc;
      },
      {}
    );

    // Sample data for the portfolio
    const portfolioItems = [
      {
        filter: "filter-app",
        imgSrc: "/handlebars/assets/img/portfolio/app-1.jpg",
        alt: "App 1",
        title: "App 1",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "app",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-product",
        imgSrc: "/handlebars/assets/img/portfolio/product-1.jpg",
        alt: "Product 1",
        title: "Product 1",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "product",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-branding",
        imgSrc: "/handlebars/assets/img/portfolio/branding-1.jpg",
        alt: "Branding 1",
        title: "Branding 1",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "branding",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-books",
        imgSrc: "/handlebars/assets/img/portfolio/books-1.jpg",
        alt: "Books 1",
        title: "Books 1",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "books",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-app",
        imgSrc: "/handlebars/assets/img/portfolio/app-2.jpg",
        alt: "App 2",
        title: "App 2",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "app",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-product",
        imgSrc: "/handlebars/assets/img/portfolio/product-2.jpg",
        alt: "Product 2",
        title: "Product 2",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "product",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-branding",
        imgSrc: "/handlebars/assets/img/portfolio/branding-2.jpg",
        alt: "Branding 2",
        title: "Branding 2",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "branding",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-books",
        imgSrc: "/handlebars/assets/img/portfolio/books-2.jpg",
        alt: "Books 2",
        title: "Books 2",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "books",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-app",
        imgSrc: "/handlebars/assets/img/portfolio/app-3.jpg",
        alt: "App 3",
        title: "App 3",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "app",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-product",
        imgSrc: "/handlebars/assets/img/portfolio/product-3.jpg",
        alt: "Product 3",
        title: "Product 3",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "product",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-branding",
        imgSrc: "/handlebars/assets/img/portfolio/branding-3.jpg",
        alt: "Branding 3",
        title: "Branding 3",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "branding",
        detailsLink: "portfolio-details.html",
      },
      {
        filter: "filter-books",
        imgSrc: "/handlebars/assets/img/portfolio/books-3.jpg",
        alt: "Books 3",
        title: "Books 3",
        description: "Lorem ipsum, dolor sit amet consectetur",
        gallery: "books",
        detailsLink: "portfolio-details.html",
      },
    ];

    const teamMembers = [
      {
        name: "Walter White",
        position: "Chief Executive Officer",
        imgSrc: "assets/img/team/team-1.jpg",
        delay: 100,
        socialLinks: [
          { url: "https://twitter.com", icon: "bi bi-twitter-x" },
          { url: "https://facebook.com", icon: "bi bi-facebook" },
          { url: "https://instagram.com", icon: "bi bi-instagram" },
          { url: "https://linkedin.com", icon: "bi bi-linkedin" },
        ],
      },
      {
        name: "Sarah Jhonson",
        position: "Product Manager",
        imgSrc: "assets/img/team/team-2.jpg",
        delay: 200,
        socialLinks: [
          { url: "https://twitter.com", icon: "bi bi-twitter-x" },
          { url: "https://facebook.com", icon: "bi bi-facebook" },
          { url: "https://instagram.com", icon: "bi bi-instagram" },
          { url: "https://linkedin.com", icon: "bi bi-linkedin" },
        ],
      },
      {
        name: "William Anderson",
        position: "CTO",
        imgSrc: "assets/img/team/team-3.jpg",
        delay: 300,
        socialLinks: [
          { url: "https://twitter.com", icon: "bi bi-twitter-x" },
          { url: "https://facebook.com", icon: "bi bi-facebook" },
          { url: "https://instagram.com", icon: "bi bi-instagram" },
          { url: "https://linkedin.com", icon: "bi bi-linkedin" },
        ],
      },
      {
        name: "Amanda Jepson",
        position: "Accountant",
        imgSrc: "assets/img/team/team-4.jpg",
        delay: 400,
        socialLinks: [
          { url: "https://twitter.com", icon: "bi bi-twitter-x" },
          { url: "https://facebook.com", icon: "bi bi-facebook" },
          { url: "https://instagram.com", icon: "bi bi-instagram" },
          { url: "https://linkedin.com", icon: "bi bi-linkedin" },
        ],
      },
    ];

    const clients = [
      {
        href: "https://www.ticino.ch/it/explore/excursions.html",
        imgSrc: "/assets/img/logos/ticinoturismo.svg",
        alt: "Escursioni in Ticino",
        title: "Escursioni in Ticino",
      },
      {
        href: "http://www.vezia.ch/",
        imgSrc: "/assets/img/logos/vezia.ch.ico",
        alt: "Municipio di Vezia",
        title: "Municipio di Vezia",
      },
      {
        href: "https://genitorinforma.ch/it/",
        imgSrc: "/assets/img/logos/Logo_CCG.png",
        alt: "Conferenza Cantonale Genitori",
        title: "Conferenza Cantonale Genitori",
      },
      {
        href: "http://www.pedibus.ch",
        imgSrc: "/assets/img/logos/pedibus.png",
        alt: "Pedibus",
        title: "Pedibus",
      },
      {
        href: "http://www.aspi.ch",
        imgSrc: "/assets/img/logos/aspi.png",
        alt: "ASPI",
        title: "ASPI",
      },
      {
        href: "http://www.famigliediurne.ch",
        imgSrc: "/assets/img/logos/cropped-logo_mammediurne.png",
        alt: "Federazione Ticinese Famiglie diurne",
        title: "Federazione Ticinese Famiglie diurne",
      },
      {
        href: "https://www.zurichvitaparcours.ch/it",
        imgSrc: "/assets/img/logos/zurich_precorso_logo_it.png",
        alt: "ZURICH precorsovita",
        title: "ZURICH precorsovita",
      },
      {
        href: "https://www.schweizmobil.ch/it/veloland/veloland.html",
        imgSrc: "/assets/img/logos/svizzera_logo_vl.svg",
        alt: "Svizzera Mobile",
        title: "Svizzera Mobile",
      },
      {
        href: "https://www4.ti.ch/generale/infogiovani/salute-e-benessere/nonsolodroghe/internet/",
        imgSrc: "/assets/img/logos/ti-ch.png",
        alt: "Internet - INFOGIOVANI",
        title: "Internet - INFOGIOVANI",
      },
      {
        href: "https://www3.ti.ch/DSS/infofamiglie/",
        imgSrc: "/assets/img/logos/logo_infofamiglie.gif",
        alt: "Infofamiglie",
        title: "Infofamiglie",
      },
      {
        href: "https://www.santepsy.ch/it/pages/risorse-a-disposizione-dei-futuri-genitori-e-di-genitori-di-bambini-piccoli-1011",
        imgSrc: "/assets/img/logos/logo-santepsy_it.png",
        alt: "Salute Psi",
        title: "Salute Psi",
      },
      {
        href: "https://www.xn--genitorialit-99a.ch/it/",
        imgSrc: "/assets/img/logos/logo_fg.jpg",
        alt: "Forum Genitorialità",
        title: "Forum Genitorialità",
      },
      {
        href: "https://www.schweizmobil.ch/it/veloland/veloland.html",
        imgSrc: "/assets/img/logos/logo-desktop_it2.png",
        alt: "Veloland",
        title: "Veloland",
      },
    ];

    // Preparing data for the template
    const data: { [key: string]: any } = {
      ...defHeader,
      title: "Index",
      portfolioItems, // Passing the array of portfolio items to the template
      teamMembers, // Pass the list of team members to the template
      clients, // Pass the array of clients to the template
      latestEvents: lastEvents.events, // Los dos últimos eventos
      mediasOfEvents: mediaMapEvents, // Mapa de medios para eventos
      latestCourses: lastCourses.events, // Los dos últimos cursos
      mediasOfCourses: mediaMapCourses, // Mapa de medios para cursos
    };

    res.render("pages/index-ejs", data);
  }

  @Post("sendMessage")
  public SendFormEmail(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).json({ send: true });
  }
}
