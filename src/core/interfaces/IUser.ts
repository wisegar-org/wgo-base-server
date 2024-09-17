import { IUserRole } from "./IUserRole";

export interface IUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  roles?: IUserRole[];
}
