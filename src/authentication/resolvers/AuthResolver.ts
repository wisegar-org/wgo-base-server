import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import {
  EditUserInput,
  LoginInput,
  MeInput,
  RegisterInput,
  ResendConfirmationInput,
  ResetPasswordInput,
  ValidUserNameInput,
} from "./AuthInputs";
import { LoginResponse, UserResponse } from "./AuthResponses";
import {
  AUTH_PATH_CHANGE_RESET_PASSWORD,
  AUTH_PATH_CHECK_USER_NAME,
  AUTH_PATH_CONFIRM_REGIST,
  AUTH_PATH_DELETE_USER,
  AUTH_PATH_EDIT_USER,
  AUTH_PATH_GET_ALL_HISTORIC,
  AUTH_PATH_GET_ALL_HISTORIC_BY_USER,
  AUTH_PATH_GET_ALL_ROLES,
  AUTH_PATH_GET_ALL_USERS,
  AUTH_PATH_GET_HISTORIC,
  AUTH_PATH_GET_USER,
  AUTH_PATH_LOGIN,
  AUTH_PATH_ME,
  AUTH_PATH_REGISTER,
  AUTH_PATH_RESEND_CONFIRMATION,
  AUTH_PATH_RESET_PASSWORD,
  IAuthModelArg,
  IContextBase,
  SETTINGS_SMTP,
  SmtpSettings,
} from "@wisegar-org/wgo-base-models";
import {
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from "wgo-settings";
import { UserEntity } from "../database/entities/UserEntity";
import { AuthModel } from "../models/AuthModel";
import { SettingsModel } from "../../settings/models/SettingsModel";
import { IdInput } from "../../core/resolvers/CoreInputs";
import { UserRolesModel } from "../models/UserRolesModel";
import { HistoricResponse } from "../../historic/resolvers/HistoricResponses";
import { HistoricModel } from "../../historic/models/HistoricModel";
import { EmailModel } from "../../email";

@Resolver()
export class AuthResolver {
  private readonly options: IAuthModelArg;
  /**
   *
   */
  constructor() {
    this.options = {
      privateKey: GetPrivateKey(),
      publicKey: GetPublicKey(),
      hostBase: GetHostBaseKey(),
      tokenExpiresIn: GetExpiresInKey(),
      tokenRegisterExpiresIn: "24h",
      emailOptions: {
        from: EmailModel.getFromAppConfig(),
      } as any,
      transportEmailOptions: {} as any,
      ctx: {} as any,
    };
  }
  /**
   * Get Auth Model options
   * @returns internal options IAuthModelArg
   */
  public getOptions() {
    return this.options;
  }
  /**
   * @decorator @Mutation(() => LoginResponse, { name: AUTH_PATH_LOGIN })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => LoginResponse, { name: AUTH_PATH_LOGIN })
  protected async login(
    @Arg("data") data: LoginInput,
    @Ctx() ctx: IContextBase
  ) {
    const authModel = new AuthModel({
      ...this.options,
      ctx,
    });
    const login = await authModel.login(data);
    return login as LoginResponse;
  }

  /**
   * @decorator @Query(() => UserResponse, { name: AUTH_PATH_ME })
   * @param data
   * @param ctx
   * @returns
   */
  @Query(() => UserResponse, { name: AUTH_PATH_ME })
  protected async me(@Arg("data") data: MeInput, @Ctx() ctx: IContextBase) {
    const authModel = new AuthModel({
      ...this.options,
      ctx,
    });
    const user = await authModel.me(data);
    return user as UserResponse;
  }
  /**
   * @decorator @Mutation(() => UserResponse, { name: AUTH_PATH_REGISTER })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => UserResponse, { name: AUTH_PATH_REGISTER })
  protected async register(
    @Arg("data") data: RegisterInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      ctx,
      transportEmailOptions,
    });
    const user = await authModel.register(data as any);
    return user;
  }
  /**
   * @decorator @Mutation(() => UserResponse, { name: AUTH_PATH_EDIT_USER })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => UserResponse, { name: AUTH_PATH_EDIT_USER })
  protected async editUser(
    @Arg("data") data: EditUserInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      ctx,
      transportEmailOptions,
    });
    const user = await authModel.editUser(data as any);
    return user;
  }

  /**
   * @decorator @Mutation(() => Boolean, { name: AUTH_PATH_RESEND_CONFIRMATION })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Boolean, { name: AUTH_PATH_RESEND_CONFIRMATION })
  protected async resendConfirmation(
    @Arg("data") data: ResendConfirmationInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      ctx,
      transportEmailOptions,
    });
    const user = await authModel.resendConfirmation(data);
    return !!user;
  }
  /**
   * @decorator  @Mutation(() => Boolean, { name: AUTH_PATH_RESET_PASSWORD })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Boolean, { name: AUTH_PATH_RESET_PASSWORD })
  protected async resetPassword(
    @Arg("data") data: ResendConfirmationInput,
    @Ctx() ctx: IContextBase
  ) {
    const settingsModel = new SettingsModel(ctx);
    const config = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
      },
    };
    const authModel = new AuthModel({
      ...this.options,
      ctx,
      transportEmailOptions,
    });
    const resetResult = await authModel.resetPassword(data);
    return !!resetResult;
  }

  /**
   * @decorator @Mutation(() => Boolean, { name: AUTH_PATH_CHANGE_RESET_PASSWORD })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Boolean, { name: AUTH_PATH_CHANGE_RESET_PASSWORD })
  protected async changeResetPassword(
    @Arg("data") data: ResetPasswordInput,
    @Ctx() ctx: IContextBase
  ) {
    const authModel = new AuthModel({
      ...this.options,
      ctx,
    });
    const resetResult = await authModel.changePassword(data);
    return resetResult;
  }

  /**
   * @decorator @Mutation(() => Boolean, { name: AUTH_PATH_CONFIRM_REGIST })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Boolean, { name: AUTH_PATH_CONFIRM_REGIST })
  protected async confirmRegistration(
    @Arg("data") data: MeInput,
    @Ctx() ctx: IContextBase
  ) {
    const authModel = new AuthModel({
      ...this.options,
      ctx,
    });
    const user = await authModel.confirmRegist(data);
    return !!user;
  }

  /**
   * @decorator @Query(() => UserResponse, { name: AUTH_PATH_GET_USER })
   * @param data
   * @param ctx
   * @returns
   */
  @Query(() => UserResponse, { name: AUTH_PATH_GET_USER })
  protected async getUser(
    @Arg("data") data: IdInput,
    @Ctx() ctx: IContextBase
  ) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      ctx,
    });
    const user = await userRolesModel.getUser(data.id);
    return user;
  }

  /**
   * @decorator @Query(() => [UserResponse], { name: AUTH_PATH_GET_ALL_USERS })
   * @param ctx
   * @returns
   */
  @Query(() => [UserResponse], { name: AUTH_PATH_GET_ALL_USERS })
  protected async getAllUsers(@Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      ctx,
    });
    const users = await userRolesModel.getAllUsers();
    return users;
  }

  /**
   * @decorator @Query(() => [String], { name: AUTH_PATH_GET_ALL_ROLES })
   * @param ctx
   * @returns
   */
  @Query(() => [String], { name: AUTH_PATH_GET_ALL_ROLES })
  protected async getAllRoles(@Ctx() ctx: IContextBase) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      ctx,
    });
    const roles = await userRolesModel.getAllRoles();
    return roles;
  }

  /**
   * @decorator @Mutation(() => Boolean, { name: AUTH_PATH_DELETE_USER })
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Boolean, { name: AUTH_PATH_DELETE_USER })
  protected async deleteUser(
    @Arg("data") data: IdInput,
    @Ctx() ctx: IContextBase
  ) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      ctx,
    });
    const user = await userRolesModel.deleteUser(data);
    return !!user;
  }

  /**
   * @decorator @Query(() => Boolean, { name: AUTH_PATH_CHECK_USER_NAME })
   * @param data
   * @param ctx
   * @returns
   */
  @Query(() => Boolean, { name: AUTH_PATH_CHECK_USER_NAME })
  protected async validUserName(
    @Arg("data") data: ValidUserNameInput,
    @Ctx() ctx: IContextBase
  ) {
    const authModel = new AuthModel({
      ...this.options,
      ctx,
    });
    const result = await authModel.checkUserUniqueUserName(data);
    return result;
  }

  /**
   * @decorator @Authorized() | @Query(() => HistoricResponse, { name: AUTH_PATH_GET_HISTORIC })
   * @param id
   * @param ctx
   * @returns
   */
  @Authorized()
  @Query(() => HistoricResponse, { name: AUTH_PATH_GET_HISTORIC })
  protected async getUserHistoric(
    @Arg("id") id: number,
    @Ctx() ctx: IContextBase
  ) {
    const historyService = new HistoricModel(UserEntity, ctx);
    const result = await historyService.getHistoric(id);
    return result.map((historic: any) =>
      HistoricModel.ParseHistoricResponse(historic)
    );
  }

  /**
   * @decorator @Authorized() | @Query(() => [HistoricResponse], { name: AUTH_PATH_GET_ALL_HISTORIC })
   * @param ctx
   * @returns
   */
  @Authorized()
  @Query(() => [HistoricResponse], { name: AUTH_PATH_GET_ALL_HISTORIC })
  protected async getAllUserHistoric(@Ctx() ctx: IContextBase) {
    const historyService = new HistoricModel(UserEntity, ctx);
    const result = await historyService.getAllHistoric();
    return result.map((historic: any) =>
      HistoricModel.ParseHistoricResponse(historic)
    );
  }
  /**
   * @decorator @Authorized() | @Query(() => [HistoricResponse], { name: AUTH_PATH_GET_ALL_HISTORIC_BY_USER })
   * @param id
   * @param ctx
   * @returns
   */
  @Authorized()
  @Query(() => [HistoricResponse], { name: AUTH_PATH_GET_ALL_HISTORIC_BY_USER })
  protected async getUserAllHistoricByUser(
    @Arg("id") id: number,
    @Ctx() ctx: IContextBase
  ) {
    const historyService = new HistoricModel(UserEntity, ctx);
    const result = await historyService.getAllHistoricByUser(id);
    return result.map((historic: any) =>
      HistoricModel.ParseHistoricResponse(historic)
    );
  }
}
