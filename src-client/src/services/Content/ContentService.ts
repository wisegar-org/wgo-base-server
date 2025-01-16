import {
  M_AGV_MODIFY_CONTENTS,
  Q_AGV_ALL_CONTENTS,
} from "./ContentServiceQueries";
import { apiSettings } from "src/api/ApiOptions";
import { AgvEventResponseModel } from "src/models/models";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import { ApiService } from "src/modules/core/services/ApiService";

export class ContentService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async allContent() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_CONTENTS,
        variables: {
          urlApi: apiSettings.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllContents: ObjectDictionary };
      };
      if (response && response.data) {
        const {
          data: { agvAllContents },
        } = response;
        return JSON.parse(agvAllContents.contents);
      } else return {};
    } catch (error) {
      //
      console.log(error);
      return {};
    }
  }

  async modifyContent(content: ObjectDictionary) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_MODIFY_CONTENTS,
        variables: {
          data: { contents: JSON.stringify(content) },
        },
      })) as { data: { agvModifyContents: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { agvModifyContents },
        } = response;

        return !!agvModifyContents;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export class ItemService {
  public searchEvents(
    search: string,
    filterClass: string,
    events: AgvEventResponseModel[]
  ) {
    if (search === "" && filterClass === "") return events;
    const itemsList = events;

    return itemsList.filter((item) => {
      return (
        (!search ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())) &&
        (!filterClass || item.class === filterClass)
      );
    });
  }

  public compareStrDate(date1?: Date, date2?: Date): number {
    if (!date1) return -1;
    if (!date2) return 1;
    const dateTemp1 = date1.toString().split("/").reverse().join("/");
    const dateTemp2 = date2.toString().split("/").reverse().join("/");
    return new Date(dateTemp1) >= new Date(dateTemp2) ? 1 : -1;
  }

  public static removeTags(str: string) {
    return !str ? "" : str.replace(/(<([^>]+)>)/gi, "");
  }
}
