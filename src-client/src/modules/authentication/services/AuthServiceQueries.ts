import gql from "graphql-tag";
import {
  AUTH_PATH_CHANGE_RESET_PASSWORD,
  AUTH_PATH_CHECK_USER_NAME,
  AUTH_PATH_CONFIRM_REGIST,
  AUTH_PATH_EDIT_USER,
  AUTH_PATH_LOGIN,
  AUTH_PATH_ME,
  AUTH_PATH_REGISTER,
  AUTH_PATH_RESEND_CONFIRMATION,
  AUTH_PATH_RESET_PASSWORD,
} from "@wisegar-org/wgo-base-models/build/authentication/server";

export const M_AUTH_LOGIN = gql`
  mutation ${AUTH_PATH_LOGIN}($data: LoginInput!) {
    ${AUTH_PATH_LOGIN}(data: $data) {
      user {
        id
        name
        lastName
        userName
        email
        roles
        code
        cap
        address
        certificate
        isEmailConfirmed
      }
      token
    }
  }
`;
export const Q_AUTH_ME = gql`
  query ${AUTH_PATH_ME}($data: MeInput!) {
    ${AUTH_PATH_ME}(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
      code
      cap
      address
      certificate
      isEmailConfirmed
    }
  }
`;

export const M_AUTH_REGISTER = gql`
  mutation ${AUTH_PATH_REGISTER}($data: RegisterInput!) {
    ${AUTH_PATH_REGISTER}(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
      code
      cap
      address
      certificate
      isEmailConfirmed
    }
  }
`;
export const M_AUTH_EDIT_USER = gql`
  mutation ${AUTH_PATH_EDIT_USER}($data: EditUserInput!) {
    ${AUTH_PATH_EDIT_USER}(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
      code
      cap
      address
      certificate
      isEmailConfirmed
    }
  }
`;
export const M_AUTH_RESEND_CONFIRM = gql`
  mutation ${AUTH_PATH_RESEND_CONFIRMATION}($data: ResendConfirmationInput!) {
    ${AUTH_PATH_RESEND_CONFIRMATION}(data: $data)
  }
`;

export const M_AUTH_CONFIRM_REGISTER = gql`
  mutation ${AUTH_PATH_CONFIRM_REGIST}($data: MeInput!) {
    ${AUTH_PATH_CONFIRM_REGIST}(data: $data)
  }
`;

export const M_AUTH_RESET_PASSWORD = gql`
  mutation ${AUTH_PATH_RESET_PASSWORD}($data: ResendConfirmationInput!) {
    ${AUTH_PATH_RESET_PASSWORD}(data: $data)
  }
`;

export const M_AUTH_CHANGE_PASSWORD = gql`
  mutation ${AUTH_PATH_CHANGE_RESET_PASSWORD}($data: ResetPasswordInput!) {
    ${AUTH_PATH_CHANGE_RESET_PASSWORD}(data: $data)
  }
`;

export const Q_AUTH_VALID_USER_NAME = gql`
  query ${AUTH_PATH_CHECK_USER_NAME}($data: ValidUserNameInput!) {
    ${AUTH_PATH_CHECK_USER_NAME}(data: $data)
  }
`;
