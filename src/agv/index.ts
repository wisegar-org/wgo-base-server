import { AGVContentsResolver } from "./resolvers/Content/AGVContentsResolver";
import { AGVEventResolver } from "./resolvers/Event/AGVEventResolver";
import { AGVInscriptionResolver } from "./resolvers/Inscription/AGVInscriptionResolver";
import { NonEmptyArray } from "type-graphql";
import { AGVNewsletterResolver } from "./resolvers/Newsletter/AGVNewsletterResolver";
import { HomeHandlebarsController } from "./controllers/HomePageController";
import { EventiHandlebarsController } from "./controllers/EventiPageController";
import { CorsiHandlebarsController } from "./controllers/CorsiPageController";
import { DetailsHandlebarsController } from "./controllers/DetailsPageController";
import { LinkUtiliHandlebarsController } from "./controllers/LinkUtiliPageController";
import { ComitatoHandlebarsController } from "./controllers/ComitatoPageController";
import { ContattoHandlebarsController } from "./controllers/ContattoPageController";
import { PollHandlebarsController } from "./controllers/PollPageController";
import { RulesHandlebarsController } from "./controllers/RulesPageController";

export const getAGVResolvers = () => {
  return [
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as NonEmptyArray<Function>;
};

export const getAGVControllers = () => {
  return [
    HomeHandlebarsController,
    EventiHandlebarsController,
    CorsiHandlebarsController,
    DetailsHandlebarsController,
    LinkUtiliHandlebarsController,
    ComitatoHandlebarsController,
    ContattoHandlebarsController,
    PollHandlebarsController,
    RulesHandlebarsController,
  ];
};
