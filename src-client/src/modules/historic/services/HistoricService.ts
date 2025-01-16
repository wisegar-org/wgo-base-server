import { ApiService } from "../../core/services/ApiService";
import {
  HISTORIC_PATH_GET_FILTERS,
  HISTORIC_PATH_GET_PAGE,
} from "@wisegar-org/wgo-base-models/build/historic/server";
import { Q_HISTORIC_FILTER, Q_HISTORIC_PAGE } from "./HistoricServiceQueries";
import {
  IHistoricFiltersResponse,
  IHistoricPageInput,
  IHistoricPageResponse,
} from "@wisegar-org/wgo-base-models/build/historic";

export class HistoricService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getHistoricPage(
    data: IHistoricPageInput
  ): Promise<IHistoricPageResponse> {
    try {
      const response = (await this.apiService.query({
        query: Q_HISTORIC_PAGE,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [HISTORIC_PATH_GET_PAGE]: unknown } };

      if (response.data && response.data[HISTORIC_PATH_GET_PAGE]) {
        const { data } = response;
        return data[HISTORIC_PATH_GET_PAGE] as IHistoricPageResponse;
      }
      return {
        count: 0,
        histories: [],
      };
    } catch (error) {
      throw `HistoricService getHistoricPage: ${error as string}`;
    }
  }

  public async getHistoricFilter(): Promise<IHistoricFiltersResponse> {
    try {
      const response = (await this.apiService.query({
        query: Q_HISTORIC_FILTER,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { [HISTORIC_PATH_GET_FILTERS]: unknown } };

      if (response.data && response.data[HISTORIC_PATH_GET_FILTERS]) {
        const { data } = response;
        return data[HISTORIC_PATH_GET_FILTERS] as IHistoricFiltersResponse;
      }
      return {
        actions: [],
        entities: [],
        usernames: [],
      };
    } catch (error) {
      throw `HistoricService getHistoricFilter: ${error as string}`;
    }
  }
}
