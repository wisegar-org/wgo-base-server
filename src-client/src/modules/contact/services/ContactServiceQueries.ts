import gql from "graphql-tag";
import {
  CONTACT_ME_PATH_GET_CONTACT_ME,
  CONTACT_ME_PATH_SET_CONTACT_ME,
} from "@wisegar-org/wgo-base-models/build/contact/server";

export const Q_CONTACT_DATA = gql`
  query ${CONTACT_ME_PATH_GET_CONTACT_ME} {
    ${CONTACT_ME_PATH_GET_CONTACT_ME} {
      contactName
      address
      email
      phoneNumber
      mapPath
    }
  }
`;

export const M_CONTACT_DATA = gql`
  mutation ${CONTACT_ME_PATH_SET_CONTACT_ME}($data: ContactMeInput!) {
    ${CONTACT_ME_PATH_SET_CONTACT_ME}(data: $data)
  }
`;
