import {
  AUTH_PATH_CLEAR_LOCAL_STORAGE,
  AUTH_PATH_GET_LOCAL_STORAGE,
  AUTH_PATH_SET_KEY_LOCAL_STORAGE,
} from "@wisegar-org/wgo-base-models/build/authentication";
import gql from "graphql-tag";

export const Q_AUTH_GET_LOCAL_STORAGE = gql`
query {
  ${AUTH_PATH_GET_LOCAL_STORAGE} {
    storage
  }
}
`;

export const M_AUTH_SET_KEY_LOCAL_STORAGE = gql`
mutation ${AUTH_PATH_SET_KEY_LOCAL_STORAGE}($key: String!, $value: String!) {
  ${AUTH_PATH_SET_KEY_LOCAL_STORAGE}(key: $key, value: $value)
}
`;

export const M_AUTH_CLEAR_LOCAL_STORAGE = gql`
mutation ${AUTH_PATH_CLEAR_LOCAL_STORAGE} {
  ${AUTH_PATH_CLEAR_LOCAL_STORAGE}
}
`;
