import gql from "graphql-tag";
import {
  LANGUAGE_PATH_GET_ALL_LANGUAGE,
  LANGUAGE_PATH_POST_LANGUAGE,
  LANGUAGE_PATH_PUT_LANGUAGE,
} from "@wisegar-org/wgo-base-models/build/language/server";

export const Q_LANGUAGE_GETALL = gql`
query ${LANGUAGE_PATH_GET_ALL_LANGUAGE} {
    ${LANGUAGE_PATH_GET_ALL_LANGUAGE} {
        id
		code
		enabled
		default
  }
}
`;

export const M_LANGUAGE_POST = gql`
mutation ${LANGUAGE_PATH_POST_LANGUAGE}($data: LanguagePostInput!) {
    ${LANGUAGE_PATH_POST_LANGUAGE}(data: $data) {
        id
		code
		enabled
		default
    }
}
`;

export const M_LANGUAGE_PUT = gql`
mutation ${LANGUAGE_PATH_PUT_LANGUAGE}($data: LanguageInput!) {
    ${LANGUAGE_PATH_PUT_LANGUAGE}(data: $data) {
        id
		code
		enabled
		default
    }
}
`;
