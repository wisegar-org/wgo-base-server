import { apiSettings } from "src/api/ApiOptions";
import {
  AgvEventGetNextsResponseModel,
  AgvEventInputModel,
  AgvEventResponseModel,
  AgvEventsPageResponseModel,
} from "src/models/models";
import {
  M_AGV_CREATE_EVENTS,
  M_AGV_MODIFY_EVENTS,
  Q_AGV_ALL_EVENTS,
  Q_AGV_ALL_EVENTS_BY_PAGE,
  Q_AGV_EVENT_GET_NEXTS,
  Q_AGV_GET_EVENT,
  Q_AGV_GET_EVENTS_CLASS,
} from "./EventServiceQueries";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import { ApiService } from "src/services/ApiService";

export class EventService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getEvent(id: number): Promise<AgvEventResponseModel> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_GET_EVENT,
        variables: {
          id,
          urlApi: apiSettings.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetEvent: AgvEventResponseModel };
      };
      if (response && response.data) {
        const {
          data: { agvGetEvent },
        } = response;
        return agvGetEvent;
      } else return {} as AgvEventResponseModel;
    } catch (error) {
      //
      console.log(error);
      return {} as AgvEventResponseModel;
    }
  }

  async getNextEvents(): Promise<AgvEventGetNextsResponseModel> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_EVENT_GET_NEXTS,
        variables: {
          urlApi: apiSettings.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetNextEvents: AgvEventGetNextsResponseModel };
      };
      if (response && response.data) {
        const {
          data: { agvGetNextEvents },
        } = response;
        return agvGetNextEvents;
      } else return {};
    } catch (error) {
      //
      console.log(error);
      return {};
    }
  }

  async allEvents(): Promise<AgvEventResponseModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_EVENTS,
        variables: {
          urlApi: apiSettings.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllEvents: AgvEventResponseModel[] };
      };
      if (response && response.data) {
        const {
          data: { agvAllEvents },
        } = response;
        return agvAllEvents;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async allEventsByPage(
    filter: ObjectDictionary
  ): Promise<AgvEventsPageResponseModel> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_ALL_EVENTS_BY_PAGE,
        variables: {
          data: filter,
          urlApi: apiSettings.API_BASE,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvAllEventsByPage: AgvEventsPageResponseModel };
      };
      if (response && response.data) {
        const {
          data: { agvAllEventsByPage },
        } = response;
        return agvAllEventsByPage;
      } else
        return {
          count: 0,
          events: [],
        };
    } catch (error) {
      //
      console.log(error);
      return {
        count: 0,
        events: [],
      };
    }
  }

  async allEventClass(type: string): Promise<string[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_AGV_GET_EVENTS_CLASS,
        variables: {
          type,
        },
        fetchPolicy: "no-cache",
      })) as {
        data: { agvGetAllClassEvents: string[] };
      };
      if (response && response.data) {
        const {
          data: { agvGetAllClassEvents },
        } = response;
        return agvGetAllClassEvents;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async createEvent(agvEvent: AgvEventInputModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_CREATE_EVENTS,
        variables: {
          data: agvEvent,
        },
      })) as { data: { agvCreateEvent: boolean } };
      if (response && response.data && response.data) {
        const {
          data: { agvCreateEvent },
        } = response;

        return !!agvCreateEvent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async modifyEvent(agvEvent: AgvEventInputModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AGV_MODIFY_EVENTS,
        variables: {
          data: agvEvent,
        },
      })) as { data: { agvModifyEvent: boolean } };

      if (response && response.data && response.data) {
        const {
          data: { agvModifyEvent },
        } = response;

        return agvModifyEvent;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
