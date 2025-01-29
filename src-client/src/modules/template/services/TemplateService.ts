import {
  TEMPLATE_PATH_GET_BY_TYPE,
  TEMPLATE_PATH_POST,
} from "@wisegar-org/wgo-base-models/build/template/server";
import { ApiService } from "../../../services/ApiService";
import {
  M_TEMPLATE_SET,
  Q_TEMPLATE_GET_BY_TYPE,
} from "./TemplateServiceQueries";
import { ITemplateResponse } from "@wisegar-org/wgo-base-models/build/template";

export class TemplateService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getTemplateByType(type: string) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_TEMPLATE_GET_BY_TYPE,
        variables: {
          type: type,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [TEMPLATE_PATH_GET_BY_TYPE]: ITemplateResponse };
      };
      if (
        response &&
        response.data &&
        response.data[TEMPLATE_PATH_GET_BY_TYPE]
      ) {
        const { data } = response;
        return data[TEMPLATE_PATH_GET_BY_TYPE];
      } else return undefined;
    } catch (error) {
      throw `TemplateService getTemplateByType: ${error as string}`;
    }
  }

  async setTemplate(params: ITemplateResponse) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_TEMPLATE_SET,
        variables: {
          data: params,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { [TEMPLATE_PATH_POST]: boolean };
      };
      if (response && response.data && response.data[TEMPLATE_PATH_POST]) {
        const { data } = response;
        return data[TEMPLATE_PATH_POST];
      }
      return false;
    } catch (error) {
      throw `TemplateService setTemplate: ${error as string}`;
    }
  }
}
