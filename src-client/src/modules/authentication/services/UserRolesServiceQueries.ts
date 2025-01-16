import gql from "graphql-tag";
import {
  AUTH_PATH_DELETE_USER,
  AUTH_PATH_GET_ALL_ROLES,
  AUTH_PATH_GET_ALL_USERS,
  AUTH_PATH_GET_USER,
} from "@wisegar-org/wgo-base-models/build/authentication/server";

export const M_USER_ROLES_DELETE_USER = gql`
  mutation ${AUTH_PATH_DELETE_USER}($data: IdInput!) {
    ${AUTH_PATH_DELETE_USER}(data: $data)
  }
`;
export const Q_AUTH_GET_USER = gql`
  query ${AUTH_PATH_GET_USER}($data: IdInput!) {
    ${AUTH_PATH_GET_USER}(data: $data) {
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

export const Q_AUTH_GET_ALL_USER = gql`
  query ${AUTH_PATH_GET_ALL_USERS} {
    ${AUTH_PATH_GET_ALL_USERS} {
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

export const Q_AUTH_GET_ALL_ROLES = gql`
  query ${AUTH_PATH_GET_ALL_ROLES} {
    ${AUTH_PATH_GET_ALL_ROLES}
  }
`;
