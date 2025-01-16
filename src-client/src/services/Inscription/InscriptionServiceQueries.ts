import gql from "graphql-tag";

export const M_AGV_CREATE_INSCRIPTION = gql`
  mutation agvCreateEvent($data: AGVInscriptionInput!) {
    agvCreateInscription(data: $data) {
      create
      exist
      error
    }
  }
`;

export const Q_AGV_ALL_INSCRIPTIONS = gql`
  query agvAllInscriptions {
    agvAllInscriptions {
      id
      nome
      cognome
      email
      phone
      message
      class
      eventId
      eventTitle
      eventClass
      date
    }
  }
`;

export const Q_AGV_ALL_INSCRIPTIONS_BY_PAGE = gql`
  query agvAllInscriptionsByPage($data: AGVInscriptionPageInput!) {
    agvAllInscriptionsByPage(data: $data) {
      count
      inscriptions {
        id
        nome
        cognome
        email
        phone
        message
        class
        eventId
        eventTitle
        eventClass
        date
      }
    }
  }
`;
