import gql from "graphql-tag";

export const M_AGV_CREATE_EVENTS = gql`
  mutation agvCreateEvent($data: AGVEventInput!) {
    agvCreateEvent(data: $data)
  }
`;

export const M_AGV_MODIFY_EVENTS = gql`
  mutation agvModifyEvent($data: AGVEventInput!) {
    agvModifyEvent(data: $data)
  }
`;

export const Q_AGV_GET_EVENT = gql`
  query agvGetEvent($id: Float!, $urlApi: String!) {
    agvGetEvent(id: $id, urlApi: $urlApi) {
      id
      title
      description
      shortDescription
      class
      type
      state
      startDate
      endDate
      visible
      enrollment
      inscriptions
      imgTitle {
        id
        url
      }
      imgList {
        id
        url
      }
    }
  }
`;

export const Q_AGV_ALL_EVENTS = gql`
  query agvAllEvents($urlApi: String!) {
    agvAllEvents(urlApi: $urlApi) {
      id
      title
      description
      shortDescription
      class
      type
      state
      startDate
      endDate
      visible
      enrollment
      inscriptions
      imgTitle {
        id
        url
      }
      imgList {
        id
        url
      }
    }
  }
`;

export const Q_AGV_ALL_EVENTS_BY_PAGE = gql`
  query agvAllEventsByPage($data: AGVEventPageInput!, $urlApi: String!) {
    agvAllEventsByPage(data: $data, urlApi: $urlApi) {
      count
      events {
        id
        title
        description
        shortDescription
        class
        type
        state
        startDate
        endDate
        visible
        enrollment
        inscriptions
        imgTitle {
          id
          url
        }
        imgList {
          id
          url
        }
      }
    }
  }
`;

export const Q_AGV_EVENT_GET_NEXTS = gql`
  query agvGetNextEvents($urlApi: String!) {
    agvGetNextEvents(urlApi: $urlApi) {
      evento {
        id
        title
        description
        shortDescription
        class
        type
        state
        startDate
        endDate
        visible
        enrollment
        inscriptions
        imgTitle {
          id
          url
        }
        imgList {
          id
          url
        }
      }
      corso {
        id
        title
        description
        shortDescription
        class
        type
        state
        startDate
        endDate
        visible
        enrollment
        inscriptions
        imgTitle {
          id
          url
        }
        imgList {
          id
          url
        }
      }
    }
  }
`;

export const Q_AGV_GET_EVENTS_CLASS = gql`
  query agvGetAllClassEvents($type: String!) {
    agvGetAllClassEvents(type: $type)
  }
`;
