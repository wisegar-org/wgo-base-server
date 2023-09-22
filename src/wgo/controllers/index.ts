import { getAGVControllers } from "../../agv";
import { AppController } from "./AppController";

export const getControllers = () => {
  return Array.apply([AppController]);
};
