import { Q_CONTACT_DATA, M_CONTACT_DATA } from "./ContactServiceQueries";
import { ApiService } from "../../../services/ApiService";
import {
  CONTACT_ME_PATH_GET_CONTACT_ME,
  CONTACT_ME_PATH_SET_CONTACT_ME,
} from "@wisegar-org/wgo-base-models/build/contact/server";

export class ContactService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getContactData(): Promise<any> {
    try {
      const response = (await this.apiService.query({
        query: Q_CONTACT_DATA,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { [CONTACT_ME_PATH_GET_CONTACT_ME]: any } };

      if (response.data && response.data[CONTACT_ME_PATH_GET_CONTACT_ME]) {
        const { data } = response;
        return data[CONTACT_ME_PATH_GET_CONTACT_ME];
      }
      return <any>{};
    } catch (error) {
      throw `ContactService getContactData: ${error as string}`;
    }
  }

  public async setContactData(data: any): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_CONTACT_DATA,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { [CONTACT_ME_PATH_SET_CONTACT_ME]: boolean } };

      if (response.data && response.data[CONTACT_ME_PATH_SET_CONTACT_ME]) {
        const { data } = response;
        return data[CONTACT_ME_PATH_SET_CONTACT_ME];
      }
      return false;
    } catch (error) {
      throw `ContactService setContactData: ${error as string}`;
    }
  }
}
