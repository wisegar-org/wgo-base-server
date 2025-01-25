import gql from "graphql-tag";
import {
  EMAIL_PATH_SEND_EMAIL,
  EMAIL_PATH_SEND_EMAIL_TO_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_APP,
  EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP,
} from "@wisegar-org/wgo-base-models/build/email/server";

export const Q_EMAIL_SENDEMAIL = gql`
  query ${EMAIL_PATH_SEND_EMAIL}($data: WGEmailInput!) {
    ${EMAIL_PATH_SEND_EMAIL}(data: $data) {
      isSuccess
      error
    }
  }
`;

export const Q_EMAIL_SENDEMAILTOAPP = gql`
  query ${EMAIL_PATH_SEND_EMAIL_TO_APP}($data: WGEmailToAppInput!) {
    ${EMAIL_PATH_SEND_EMAIL_TO_APP}(data: $data) {
      isSuccess
      error
    }
  }
`;

export const Q_EMAIL_SENDEMAILFROMTOAPP = gql`
  query ${EMAIL_PATH_SEND_EMAIL_FROM_TO_APP}($data: WGEmailFromToAppInput!) {
    ${EMAIL_PATH_SEND_EMAIL_FROM_TO_APP}(data: $data) {
      isSuccess
      error
    }
  }
`;

export const Q_EMAIL_SENDEMAILTOADDRESSANDAPP = gql`
  query ${EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP}($data: WGEmailToAddressAndAppInput!) {
    ${EMAIL_PATH_SEND_EMAIL_FROM_TO_ADDRESS_AND_APP}(data: $data) {
      isSuccess
      error
    }
  }
`;
