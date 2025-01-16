import { ApiService } from "../../core/services/ApiService";
import {
  M_AUTH_CHANGE_PASSWORD,
  M_AUTH_CONFIRM_REGISTER,
  M_AUTH_EDIT_USER,
  M_AUTH_LOGIN,
  M_AUTH_REGISTER,
  M_AUTH_RESEND_CONFIRM,
  M_AUTH_RESET_PASSWORD,
  Q_AUTH_ME,
  Q_AUTH_VALID_USER_NAME,
} from "./AuthServiceQueries";
import {
  IAuthEditParams,
  IAuthLoginParams,
  IAuthMeParams,
  IAuthRegisterParams,
  IAuthResendParam,
  IChangePasswordParam,
  ICheckUserUniqueUserName,
  ISuccesLogin,
} from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AUTH_PATH_CHANGE_RESET_PASSWORD,
  AUTH_PATH_CHECK_USER_NAME,
  AUTH_PATH_CONFIRM_REGIST,
  AUTH_PATH_EDIT_USER,
  AUTH_PATH_LOGIN,
  AUTH_PATH_ME,
  AUTH_PATH_REGISTER,
  AUTH_PATH_RESEND_CONFIRMATION,
  AUTH_PATH_RESET_PASSWORD,
} from "@wisegar-org/wgo-base-models/build/authentication/server";
import { IUser } from "@wisegar-org/wgo-base-models/build/core";

export class AuthService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loginUser(input: IAuthLoginParams): Promise<ISuccesLogin | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_LOGIN,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_LOGIN]: ISuccesLogin };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_LOGIN];
      }

      return undefined;
    } catch (error) {
      console.log("AuthService loginUser error: ", error);
      return undefined;
    }
  }

  async me(input: IAuthMeParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_ME,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_ME]: IUser };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_ME];
      }

      return undefined;
    } catch (error) {
      console.log("AuthService me error: ", error);
      return undefined;
    }
  }

  async validUserName(input: ICheckUserUniqueUserName): Promise<boolean> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AUTH_VALID_USER_NAME,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_CHECK_USER_NAME]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_CHECK_USER_NAME];
      }

      return false;
    } catch (error) {
      console.log("AuthService validUserName error: ", error);
      return false;
    }
  }

  async registerUser(input: IAuthRegisterParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_REGISTER,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_REGISTER]: IUser };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_REGISTER];
      }

      return undefined;
    } catch (error) {
      console.log("AuthService register error: ", error);
      return undefined;
    }
  }

  async editUser(input: IAuthEditParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_EDIT_USER,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_EDIT_USER]: IUser };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_EDIT_USER];
      }

      return undefined;
    } catch (error) {
      console.log("AuthService editUser error: ", error);
      return undefined;
    }
  }

  async resetPassword(input: IAuthResendParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_RESET_PASSWORD,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_RESET_PASSWORD]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_RESET_PASSWORD];
      }

      return false;
    } catch (error) {
      console.log("AuthService resetPassword error: ", error);
      return false;
    }
  }

  async changeResetPassword(input: IChangePasswordParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_CHANGE_PASSWORD,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_CHANGE_RESET_PASSWORD]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_CHANGE_RESET_PASSWORD];
      }

      return false;
    } catch (error) {
      console.log("AuthService changeResetPassword error: ", error);
      return false;
    }
  }

  async resendConfirmation(input: IAuthResendParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_RESEND_CONFIRM,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_RESEND_CONFIRMATION]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_RESEND_CONFIRMATION];
      }

      return false;
    } catch (error) {
      console.log("AuthService resendConfirmation error: ", error);
      return false;
    }
  }
  async confirmEmail(input: IAuthMeParams): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_CONFIRM_REGISTER,
        variables: {
          data: input,
        },
      })) as {
        data: { [AUTH_PATH_CONFIRM_REGIST]: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data[AUTH_PATH_CONFIRM_REGIST];
      }

      return false;
    } catch (error) {
      console.log("AuthService confirmRegist error: ", error);
      return false;
    }
  }
}
