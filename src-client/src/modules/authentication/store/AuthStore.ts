import {
  ISuccesLogin,
  SUPERADMIN,
  USER_AUTH_TOKEN,
} from "@wisegar-org/wgo-base-models/build/authentication";
import { IIdInput, IUser } from "@wisegar-org/wgo-base-models/build/core";
import { LocalStorage } from "../../../services/LocalStorage";
import { AuthService } from "../services/AuthService";
import { UserRolesService } from "../services/UserRolesService";

export class AuthStore {
  token: string;
  user: IUser;
  /**
   *
   */
  constructor() {
    this.token = LocalStorage.getItem(USER_AUTH_TOKEN) || "";
    this.user = <IUser>{};
  }

  async me() {
    const authService = new AuthService();
    if (this.token) {
      const user = await authService.me({ token: this.token || "" });
      if (!!user) {
        this.user = user;
        return true;
      } else {
        this.resetState();
      }
    }
    return false;
  }

  setLogin(login: ISuccesLogin) {
    this.user = login.user;
    this.token = login.token;
    LocalStorage.setItem(USER_AUTH_TOKEN, login.token);
  }

  setToken(token: string) {
    LocalStorage.setItem(USER_AUTH_TOKEN, token);
    this.token = token;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  getAppToken() {
    return LocalStorage.getItem(USER_AUTH_TOKEN) || "";
  }

  isUserLogged() {
    return this.user && this.user.id;
  }

  isUserInRole(roles: string[]) {
    if (this.user && this.user.roles) {
      if (this.user.roles.indexOf(SUPERADMIN) !== -1) return true;
      const result = roles
        .map((role) => this.user.roles.indexOf(role) !== -1)
        .reduce((a, b) => a || b, false);
      return result;
    }
    return false;
  }

  resetState() {
    LocalStorage.clear();
    this.token = "";
    this.user = <IUser>{};
  }

  setReset(reset: boolean) {
    this.resetState();
  }

  async deleteUser(data: IIdInput) {
    const userRolesService = new UserRolesService();
    const result = await userRolesService.deleteUser(data);
    return result;
  }

  async loadAllUsers() {
    const userRolesService = new UserRolesService();
    const users = await userRolesService.getAllUsers();
    return users;
  }

  async loadAllRoles() {
    const userRolesService = new UserRolesService();
    const roles = await userRolesService.getAllRoles();
    return roles;
  }
}
