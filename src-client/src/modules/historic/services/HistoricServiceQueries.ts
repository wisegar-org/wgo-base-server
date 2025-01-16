import gql from "graphql-tag";
import {
  HISTORIC_PATH_GET_FILTERS,
  HISTORIC_PATH_GET_PAGE,
} from "@wisegar-org/wgo-base-models/build/historic/server";

export const Q_HISTORIC_PAGE = gql`
  query ${HISTORIC_PATH_GET_PAGE}($data: HistoricPageInput!) {
    ${HISTORIC_PATH_GET_PAGE}(data: $data) {
      count
      histories {
        id
        action
        message
        username
        creatoIl
        entity
      }
    }
  }
`;

export const Q_HISTORIC_FILTER = gql`
  query ${HISTORIC_PATH_GET_FILTERS} {
    ${HISTORIC_PATH_GET_FILTERS} {
      entities
      actions
      usernames
    }
  }
`;
