import { Arg, Ctx, Query, Resolver } from "type-graphql";
import {
  EMAIL_PATH_SEND_EMAIL,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_APP,
  EMAIL_PATH_SEND_EMAIL_TO_APP,
  IContextBase,
} from "wgo-core-models";
import { AGVEmailModel } from "../models/AGVEmailModel";
import {
  EmailFromToAppInput,
  EmailInput,
  EmailToAppInput,
  EmailToAddressAndAppInput,
} from "./EmailInputs";
import { EmailResponse } from "./EmailResponses";

@Resolver()
export class EmailResolver {
  @Query(() => EmailResponse, { name: EMAIL_PATH_SEND_EMAIL })
  async sendEmail(
    @Arg("data") data: EmailInput,
    @Ctx() ctx: IContextBase
  ): Promise<EmailResponse> {
    try {
      const emailModel = new AGVEmailModel(ctx);
      return await emailModel.sendEmail(data);
    } catch (error: any) {
      const emailResponse = new EmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => EmailResponse, { name: EMAIL_PATH_SEND_EMAIL_TO_APP })
  async sendEmailToApp(
    @Arg("data") data: EmailToAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<EmailResponse> {
    try {
      const emailModel = new AGVEmailModel(ctx);
      return await emailModel.sendEmailToApp(data);
    } catch (error: any) {
      const emailResponse = new EmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => EmailResponse, { name: EMAIL_PATH_SEND_EMAIL_FROM_TO_APP })
  async sendEmailFromToApp(
    @Arg("data") data: EmailFromToAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<EmailResponse> {
    try {
      const emailModel = new AGVEmailModel(ctx);
      return await emailModel.sendEmailFromToApp(data);
    } catch (error: any) {
      const emailResponse = new EmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }

  @Query(() => EmailResponse, {
    name: EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
  })
  async sendEmailFromToAddressAndApp(
    @Arg("data") data: EmailToAddressAndAppInput,
    @Ctx() ctx: IContextBase
  ): Promise<EmailResponse> {
    try {
      const emailModel = new AGVEmailModel(ctx);
      return await emailModel.sendEmailFromToAddressAndApp(data);
    } catch (error: any) {
      const emailResponse = new EmailResponse();
      emailResponse.error = error.message;
      emailResponse.isSuccess = false;
      return emailResponse;
    }
  }
}
