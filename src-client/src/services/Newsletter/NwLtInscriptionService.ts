import { ApiService } from "src/modules/core/services/ApiService";
import {
  M_AGV_NEWSLETTER_ADD_INSCRIPTION,
  M_AGV_NEWSLETTER_EDIT_INSCRIPTION,
  M_AGV_NEWSLETTER_RESEND_INSCRIPTIONS_STATUS,
  M_AGV_NEWSLETTER_ZYNC_INSCRIPTIONS,
  Q_AGV_NEWSLETTER_GET_INSCRIPTION,
  Q_AGV_NEWSLETTER_GET_PAGE_INSCRIPTION,
} from "./NwLtInscriptionServiceQueries";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import {
  AgvNewsletterInscriptionResponse,
  AgvNewsletterInscriptionPageInput,
  AgvNewsletterInscriptionInput,
} from "src/graphql-types";

export class NewsletterInscriptionService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getNewsletterInscription(email: string) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_NEWSLETTER_GET_INSCRIPTION,
        variables: {
          email: email,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: {
          agvGetNewsletterInscriptionByEmail: {
            inscription: AgvNewsletterInscriptionResponse;
          };
        };
      };
      if (response && response.data) {
        const {
          data: { agvGetNewsletterInscriptionByEmail },
        } = response;
        return agvGetNewsletterInscriptionByEmail.inscription;
      } else return undefined;
    } catch (error) {
      //
      console.log(error);
      return undefined;
    }
  }

  async getNewsletterInscriptionsPage(
    params: AgvNewsletterInscriptionPageInput
  ) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_NEWSLETTER_GET_PAGE_INSCRIPTION,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetNewsletterInscriptionsPage: ObjectDictionary };
      };
      if (response && response.data) {
        const {
          data: { agvGetNewsletterInscriptionsPage },
        } = response;
        return agvGetNewsletterInscriptionsPage;
      } else return {};
    } catch (error) {
      //
      console.log(error);
      return {};
    }
  }

  async addNewsletterInscription(params: AgvNewsletterInscriptionInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_ADD_INSCRIPTION,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvPostNewsletterInscription: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvPostNewsletterInscription },
        } = response;
        return agvPostNewsletterInscription;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async editNewsletterInscription(params: AgvNewsletterInscriptionInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_EDIT_INSCRIPTION,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvPutNewsletterInscription: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvPutNewsletterInscription },
        } = response;
        return agvPutNewsletterInscription;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendNewsletterInscriptionMessage(emails: string[]) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_RESEND_INSCRIPTIONS_STATUS,
        variables: {
          data: {
            emails: emails,
          },
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetNewsletterInscriptionsResendStatus: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvGetNewsletterInscriptionsResendStatus },
        } = response;
        return agvGetNewsletterInscriptionsResendStatus;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async zyncNewsletterInscriptions() {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_ZYNC_INSCRIPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as {
        data: { agvZyncNewsletterInscriptions: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvZyncNewsletterInscriptions },
        } = response;
        return agvZyncNewsletterInscriptions;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
