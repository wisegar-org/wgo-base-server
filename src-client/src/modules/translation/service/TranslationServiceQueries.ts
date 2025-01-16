import gql from "graphql-tag";
import {
  TRANSLATION_PATH_GET_ALL_TRANSLATION,
  TRANSLATION_PATH_GET_ALL_BY_KEYS,
  TRANSLATION_PATH_SET_TRANSLATION,
  TRANSLATION_PATH_EXPORT_TRANSLATION,
  TRANSLATION_PATH_IMPORT_TRANSLATION,
  TRANSLATION_PATH_DELETE_TRANSLATION,
} from "@wisegar-org/wgo-base-models/build/translation/server";

export const Q_TRANSLATION_GETALL = gql`
  query ($data: GetAllTranslationInput!) {
    ${TRANSLATION_PATH_GET_ALL_TRANSLATION}(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;

export const Q_TRANSLATION_GETALLBYKEYS = gql`
  query ($data: GetTranslationByKeysInput!) {
    ${TRANSLATION_PATH_GET_ALL_BY_KEYS}(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;

export const M_TRANSLATION_SETTRANSLATION = gql`
  mutation ($data: SetTranslationInput!) {
    ${TRANSLATION_PATH_SET_TRANSLATION}(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;

export const M_TRANSLATION_DELETE_TRANSLATIONS = gql`
  mutation ($data: DeleteTranslationInput!) {
    ${TRANSLATION_PATH_DELETE_TRANSLATION}(data: $data)
  }
`;

export const M_TRANSLATION_INPORT_TRANSLATIONS = gql`
  mutation ($data: ImportTranslationsInput!) {
    ${TRANSLATION_PATH_IMPORT_TRANSLATION}(data: $data)
  }
`;

export const Q_TRANSLATION_EXPORT_TRANSLATIONS = gql`
  query ($data: ExportTranslationInput!) {
    ${TRANSLATION_PATH_EXPORT_TRANSLATION}(data: $data)
  }
`;
