import { ApiService } from "../../../services/ApiService";
import {
  M_USER_ROLES_DELETE_USER,
  Q_AUTH_GET_ALL_ROLES,
  Q_AUTH_GET_ALL_USER,
  Q_AUTH_GET_USER,
} from "./UserRolesServiceQueries";
import {
  AUTH_PATH_DELETE_USER,
  AUTH_PATH_GET_ALL_ROLES,
  AUTH_PATH_GET_ALL_USERS,
  AUTH_PATH_GET_USER,
} from "@wisegar-org/wgo-base-models/build/authentication/server";
import { IIdInput, IUser } from "@wisegar-org/wgo-base-models/build/core";

export class UserRolesService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getUser(input: IIdInput): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_GET_USER,
        fetchPolicy: "no-cache",
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_GET_USER]: IUser };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_GET_USER];
      }

      return undefined;
    } catch (error) {
      console.log("UserRolesService getUser error: ", error);
      return undefined;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_GET_ALL_USER,
        fetchPolicy: "no-cache",
        variables: {},
      })) as {
        data: { [AUTH_PATH_GET_ALL_USERS]: IUser[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_GET_ALL_USERS];
      }

      return [];
    } catch (error) {
      console.log("UserRolesService getAllUsers error: ", error);
      return [];
    }
  }

  async getAllRoles(): Promise<string[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_GET_ALL_ROLES,
        variables: {},
      })) as {
        data: { [AUTH_PATH_GET_ALL_ROLES]: string[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_GET_ALL_ROLES];
      }

      return [];
    } catch (error) {
      console.log("UserRolesService getAllRoles error: ", error);
      return [];
    }
  }

  async deleteUser(input: IIdInput): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_USER_ROLES_DELETE_USER,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_DELETE_USER]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_DELETE_USER];
      }

      return false;
    } catch (error) {
      console.log("UserRolesService deleteUser error: ", error);
      return false;
    }
  }
}
