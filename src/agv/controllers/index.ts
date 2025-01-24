import { AppController } from "./api/AppApiController";
import { ComitatoHandlebarsController } from "./pages/ComitatoPageController";
import { ContattoHandlebarsController } from "./pages/ContattoPageController";
import { CorsiHandlebarsController } from "./pages/CorsiPageController";
import { DetailsHandlebarsController } from "./pages/DetailsPageController";
import { EventiHandlebarsController } from "./pages/EventiPageController";
import { HomeHandlebarsController } from "./pages/HomePageController";
import { LinkUtiliHandlebarsController } from "./pages/LinkUtiliPageController";
import { PollHandlebarsController } from "./pages/PollPageController";
import { RulesHandlebarsController } from "./pages/RulesPageController";

export const getControllersList = () => {
  return [
    AppController,
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
