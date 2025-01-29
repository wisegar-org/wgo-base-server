import {
  M_AGV_NEWSLETTER_ADD_MESSAGE,
  M_AGV_NEWSLETTER_DELETE_MESSAGE,
  M_AGV_NEWSLETTER_EDIT_MESSAGE,
  M_AGV_NEWSLETTER_SEND_MESSAGE,
  Q_AGV_NEWSLETTER_GET_MESSAGE,
  Q_AGV_NEWSLETTER_GET_PAGE_MESSAGE,
} from "./NwLtMessengerServiceQueries";

import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import {
  AgvNewsletterMessageInput,
  AgvNewsletterMessagePageInput,
  AgvNewsletterMessageResponse,
} from "src/graphql-types";
import { ApiService } from "src/services/ApiService";

export class NewsletterMessageService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getNewsletterMessageById(id: number) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_NEWSLETTER_GET_MESSAGE,
        variables: {
          id,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: {
          agvGetNewsletterMessageById: {
            message: AgvNewsletterMessageResponse;
          };
        };
      };
      if (response && response.data) {
        const {
          data: { agvGetNewsletterMessageById },
        } = response;
        return agvGetNewsletterMessageById.message;
      } else return undefined;
    } catch (error) {
      //
      console.log(error);
      return undefined;
    }
  }

  async getNewsletterMessagesPage(params: AgvNewsletterMessagePageInput) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_NEWSLETTER_GET_PAGE_MESSAGE,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetNewsletterMessagesPage: ObjectDictionary };
      };
      if (response && response.data) {
        const {
          data: { agvGetNewsletterMessagesPage },
        } = response;
        return agvGetNewsletterMessagesPage;
      } else return {};
    } catch (error) {
      //
      console.log(error);
      return {};
    }
  }

  async addNewsletterMessage(params: AgvNewsletterMessageInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_ADD_MESSAGE,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvPostNewsletterMessage: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvPostNewsletterMessage },
        } = response;
        return agvPostNewsletterMessage;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async editNewsletterMessage(params: AgvNewsletterMessageInput) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_EDIT_MESSAGE,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvPutNewsletterMessage: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvPutNewsletterMessage },
        } = response;
        return agvPutNewsletterMessage;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteNewsletterMessage(id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_DELETE_MESSAGE,
        variables: {
          id: id,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvDeleteNewsletterMessage: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvDeleteNewsletterMessage },
        } = response;
        return agvDeleteNewsletterMessage;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendNewsletterMessage(id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_NEWSLETTER_SEND_MESSAGE,
        variables: {
          id: id,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvSendNewsletterMessage: boolean };
      };
      if (response && response.data) {
        const {
          data: { agvSendNewsletterMessage },
        } = response;
        return agvSendNewsletterMessage;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
