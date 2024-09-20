import { Arg, Ctx, Query, Resolver } from "type-graphql";
import {
  EMAIL_PATH_SEND_EMAIL,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_APP,
  EMAIL_PATH_SEND_EMAIL_TO_APP,
  IContextBase,
} from "@wisegar-org/wgo-base-models";
import { WGEmailModel } from "../models/WGEmailModel";
import {
  WGEmailFromToAppInput,
  WGEmailInput,
  WGEmailToAppInput,
  WGEmailToAddressAndAppInput,
} from "./WGEmailInputs";
import { WGEmailResponse } from "./WGEmailResponses";

@Resolver()
export class EmailResolver {
  @Query(() => WGEmailResponse, { name: EMAIL_PATH_SEND_EMAIL })
  async sendEmail(
    @Arg("data") data: WGEmailInput,
    @Ctx() ctx: IContextBase
  ): Promise<WGEmailResponse> {
    try {
      const emailModel = new WGEmailModel(ctx);
      return await emailModel.sendEmail(data);
    } catch (error: any) {
      const emailResponse = new WGEmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => WGEmailResponse, { name: EMAIL_PATH_SEND_EMAIL_TO_APP })
  async sendEmailToApp(
    @Arg("data") data: WGEmailToAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<WGEmailResponse> {
    try {
      const emailModel = new WGEmailModel(ctx);
      return await emailModel.sendEmailToApp(data);
    } catch (error: any) {
      const emailResponse = new WGEmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => WGEmailResponse, { name: EMAIL_PATH_SEND_EMAIL_FROM_TO_APP })
  async sendEmailFromToApp(
    @Arg("data") data: WGEmailFromToAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<WGEmailResponse> {
    try {
      const emailModel = new WGEmailModel(ctx);
      return await emailModel.sendEmailFromToApp(data);
    } catch (error: any) {
      const emailResponse = new WGEmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => WGEmailResponse, {
    name: EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
  })
  async sendEmailFromToAddressAndApp(
    @Arg("data") data: WGEmailToAddressAndAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<WGEmailResponse> {
    try {
      const emailModel = new WGEmailModel(ctx);
      return await emailModel.sendEmailFromToAddressAndApp(data);
    } catch (error: any) {
      const emailResponse = new WGEmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }
}
