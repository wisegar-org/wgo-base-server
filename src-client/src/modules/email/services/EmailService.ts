import {
  EMAIL_PATH_SEND_EMAIL,
  EMAIL_PATH_SEND_EMAIL_TO_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
} from "@wisegar-org/wgo-base-models/build/email/server";
import {
  Q_EMAIL_SENDEMAIL,
  Q_EMAIL_SENDEMAILFROMTOAPP,
  Q_EMAIL_SENDEMAILTOADDRESSANDAPP,
  Q_EMAIL_SENDEMAILTOAPP,
} from "./EmailServiceQueries";
import { ApiService } from "../../../services/ApiService";
import {
  IEmailFromToAppInput,
  IEmailInput,
  IEmailResponse,
  IEmailToAddressAndAppInput,
  IEmailToAppInput,
} from "@wisegar-org/wgo-base-models/build/email";

export class EmailService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async sendEmail(data: IEmailInput): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAIL,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [EMAIL_PATH_SEND_EMAIL]: IEmailResponse } };

      if (response.data && response.data[EMAIL_PATH_SEND_EMAIL]) {
        const { data } = response;
        return data[EMAIL_PATH_SEND_EMAIL].isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailToApp(data: IEmailToAppInput): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILTOAPP,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [EMAIL_PATH_SEND_EMAIL_TO_APP]: IEmailResponse } };

      if (response.data && response.data[EMAIL_PATH_SEND_EMAIL_TO_APP]) {
        const { data } = response;
        return data[EMAIL_PATH_SEND_EMAIL_TO_APP].isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailFromToApp(
    data: IEmailFromToAppInput
  ): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILFROMTOAPP,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [EMAIL_PATH_SEND_EMAIL_FROM_TO_APP]: IEmailResponse } };

      if (response.data && response.data.sendEmailFromToApp) {
        const {
          data: { sendEmailFromToApp },
        } = response;
        return sendEmailFromToApp.isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailFromToAddressAndApp(
    data: IEmailToAddressAndAppInput
  ): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILTOADDRESSANDAPP,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: {
          [EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP]: IEmailResponse;
        };
      };

      if (
        response.data &&
        response.data[EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP]
      ) {
        const { data } = response;
        return data[EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP].isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
