import { EmailServer, EmailOptions } from "wgo-mailer";
import {
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from "wgo-settings";
import { DataSource } from "typeorm";
import {
  IContextBase,
  SmtpSettings,
  SETTINGS_SMTP,
} from "@wisegar-org/wgo-base-models";
import { SettingsModel } from "../../settings/models/SettingsModel";
import { HandlebarsTemplateModel } from "../../template/models/HandlenarsTemplateModel";
import { TemplateModel } from "../../template/models/TemplateModel";
import {
  EmailFromToAppInput,
  EmailToAddressAndAppInput,
  EmailToAppInput,
} from "../resolvers/EmailInputs";
import { EmailResponse } from "../resolvers/EmailResponses";
import { getInlineStyle } from "./StyleModel";

export class EmailModel {
  emailServer: EmailServer;
  dataSource: DataSource;
  ctx: IContextBase;
  templateModel: TemplateModel;
  handlebardModel: HandlebarsTemplateModel;

  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.emailServer = new EmailServer();
    this.dataSource = ctx.dataSource;
    this.templateModel = new TemplateModel(ctx);
    this.handlebardModel = new HandlebarsTemplateModel();
  }

  async sendEmail(data: EmailOptions): Promise<EmailResponse> {
    try {
      const configSmtp = await this.getTransportEmailOptions();
      const result = await this.emailServer.sendByConfig(data, configSmtp);
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailFromApp(data: EmailToAddressAndAppInput) {
    try {
      let body = data.body;
      if (data.data) {
        const bodyTemplate = await this.templateModel.getTemplateByType(
          data.body
        );
        const dataObj = JSON.parse(data.data) || {};
        body = this.handlebardModel.getTemplateData(
          bodyTemplate && bodyTemplate.body ? bodyTemplate.body : data.body,
          dataObj
        );
      }
      body = await getInlineStyle(body);
      body = body.split("&lt;").join("<").split("&gt;").join(">");
      const configSmtp = await this.getTransportEmailOptions();
      const config = this.getEmailConfig();
      const result = await this.emailServer.sendByConfig(
        {
          from: config.from,
          to: data.to,
          subject: data.subject,
          html: body,
          // envelope: {
          //   from: data.from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailToApp(data: EmailToAppInput): Promise<EmailResponse> {
    try {
      let body = data.body;
      if (data.data) {
        const bodyTemplate = await this.templateModel.getTemplateByType(
          data.body
        );
        const dataObj = JSON.parse(data.data) || {};
        body = this.handlebardModel.getTemplateData(
          bodyTemplate && bodyTemplate.body ? bodyTemplate.body : data.body,
          dataObj
        );
      }
      body = await getInlineStyle(body);
      body = body.split("&lt;").join("<").split("&gt;").join(">");
      const configSmtp = await this.getTransportEmailOptions();
      const config = this.getEmailConfig();
      const result = await this.emailServer.sendByConfig(
        {
          from: data.from,
          to: config.to,
          subject: data.subject,
          html: body,
          bcc: config.bcc,
          // envelope: {
          //   from: data.from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailFromToApp(data: EmailFromToAppInput): Promise<EmailResponse> {
    try {
      let body = data.body;
      if (data.data) {
        const bodyTemplate = await this.templateModel.getTemplateByType(
          data.body
        );
        const dataObj = JSON.parse(data.data) || {};
        body = this.handlebardModel.getTemplateData(
          bodyTemplate && bodyTemplate.body ? bodyTemplate.body : data.body,
          dataObj
        );
      }
      body = await getInlineStyle(body);
      body = body.split("&lt;").join("<").split("&gt;").join(">");
      const configSmtp = await this.getTransportEmailOptions();
      const config = this.getEmailConfig();
      const result = await this.emailServer.sendByConfig(
        {
          from: config.from,
          to: config.to,
          subject: data.subject,
          html: body,
          bcc: config.bcc,
          // envelope: {
          //   from: from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailFromToAddressAndApp(
    data: EmailToAddressAndAppInput
  ): Promise<EmailResponse> {
    try {
      let body = data.body;
      if (data.data) {
        const bodyTemplate = await this.templateModel.getTemplateByType(
          data.body
        );
        const dataObj = JSON.parse(data.data) || {};
        body = this.handlebardModel.getTemplateData(
          bodyTemplate && bodyTemplate.body ? bodyTemplate.body : data.body,
          dataObj
        );
      }
      body = await getInlineStyle(body);
      body = body.split("&lt;").join("<").split("&gt;").join(">");
      const configSmtp = await this.getTransportEmailOptions();
      const config = this.getEmailConfig();
      const result = await this.emailServer.sendByConfig(
        {
          from: config.from,
          to: config.to,
          subject: data.subject,
          html: body,
          bcc: config.bcc ? `${data.to},${config.bcc}` : data.to,
          // envelope: {
          //   from: from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  getEmailConfig() {
    const emailAppAddressKey = GetEmailAppAddressKey().split(",");
    const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(",");
    const toSend: string[] = [];
    emailAppAddressKey.forEach((email, index) => {
      if (emailAppAddressNameKey.length > index)
        toSend.push(
          `<${email.split(" ").join("")}> ${emailAppAddressNameKey[index]}`
        );
      else toSend.push(email.split(" ").join(""));
    });
    const to = toSend.splice(0, 1)[0];
    const bcc = toSend.join(",");
    const from = EmailModel.getFromAppConfig();
    return {
      to,
      bcc,
      from,
    };
  }

  async getTransportEmailOptions() {
    const settingsModel = new SettingsModel(this.ctx);
    const configSmtp = (await settingsModel.getSettingsObject({
      type_settings: SETTINGS_SMTP,
    })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: configSmtp.SMTP_EMAIL_HOST,
      port: configSmtp.SMTP_EMAIL_PORT,
      auth: {
        user: configSmtp.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(
          configSmtp.SMTP_EMAIL_PASSWORD
        ),
      },
    };

    return transportEmailOptions;
  }

  static getFromAppConfig() {
    const emailAppAddressKey = GetEmailAppAddressKey().split(",");
    const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(",");
    return `<${emailAppAddressKey[0] || GetEmailSenderKey()}> ${
      emailAppAddressNameKey[0] || GetEmailSenderNameKey()
    }`;
  }
}
