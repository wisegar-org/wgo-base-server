import { IUser } from "wgo-core-models";

export interface IUserContext extends IUser {
  isSuperAdmin?: boolean;
}
export interface IContext {
  user: IUserContext;
}
