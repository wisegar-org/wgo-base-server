import gql from "graphql-tag";

export const M_AGV_MODIFY_CONTENTS = gql`
  mutation agvModifyContents($data: AGVContentsInput!) {
    agvModifyContents(data: $data)
  }
`;

export const Q_AGV_ALL_CONTENTS = gql`
  query agvAllContents($urlApi: String!) {
    agvAllContents(urlApi: $urlApi) {
      contents
    }
  }
`;
