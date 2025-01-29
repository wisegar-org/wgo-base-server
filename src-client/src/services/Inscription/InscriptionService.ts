import {
  AgvInscriptionAddModel,
  AgvInscriptionInputModel,
  AgvInscriptionResponseModel,
  AgvInscriptionsPageResponseModel,
} from "src/models/models";
import {
  M_AGV_CREATE_INSCRIPTION,
  Q_AGV_ALL_INSCRIPTIONS,
  Q_AGV_ALL_INSCRIPTIONS_BY_PAGE,
} from "./InscriptionServiceQueries";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import { ApiService } from "src/services/ApiService";

export class InscriptionService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async allInscriptionsByPage(
    filter: ObjectDictionary
  ): Promise<AgvInscriptionsPageResponseModel> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_INSCRIPTIONS_BY_PAGE,
        variables: {
          data: filter,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllInscriptionsByPage: AgvInscriptionsPageResponseModel };
      };
      if (response && response.data) {
        const {
          data: { agvAllInscriptionsByPage },
        } = response;
        return agvAllInscriptionsByPage;
      } else
        return {
          count: 0,
          inscriptions: [],
        };
    } catch (error) {
      //
      console.log(error);
      return {
        count: 0,
        inscriptions: [],
      };
    }
  }

  async allInscriptions(): Promise<AgvInscriptionResponseModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_INSCRIPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllInscriptions: AgvInscriptionResponseModel[] };
      };
      if (response && response.data) {
        const {
          data: { agvAllInscriptions },
        } = response;
        return agvAllInscriptions;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async createInscription(
    agvInscription: AgvInscriptionInputModel
  ): Promise<AgvInscriptionAddModel> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_CREATE_INSCRIPTION,
        variables: {
          data: agvInscription,
        },
      })) as {
        data: {
          agvCreateInscription: AgvInscriptionAddModel;
        };
      };
      if (response && response.data && response.data) {
        const {
          data: { agvCreateInscription },
        } = response;

        return agvCreateInscription;
      }
      return { error: true } as AgvInscriptionAddModel;
    } catch (error) {
      console.log(error);
      return { error: true } as AgvInscriptionAddModel;
    }
  }
}
