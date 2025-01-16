import gql from "graphql-tag";
import {
  TEMPLATE_PATH_GET_BY_TYPE,
  TEMPLATE_PATH_POST,
} from "@wisegar-org/wgo-base-models/build/template/server";

export const Q_TEMPLATE_GET_BY_TYPE = gql`
  query ${TEMPLATE_PATH_GET_BY_TYPE}($type: String!) {
    ${TEMPLATE_PATH_GET_BY_TYPE}(type: $type) {
      id
      title
      body
      documentType
    }
  }
`;

export const M_TEMPLATE_SET = gql`
  mutation ${TEMPLATE_PATH_POST}($data: TemplateInput!) {
    ${TEMPLATE_PATH_POST}(data: $data)
  }
`;
