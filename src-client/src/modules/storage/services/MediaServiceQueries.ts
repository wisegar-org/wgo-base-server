import gql from "graphql-tag";
import {
  MEDIA_PATH_DELETE_FILES,
  MEDIA_PATH_GET_FILE,
  MEDIA_PATH_POST_FILE,
  MEDIA_PATH_POST_FILES,
} from "@wisegar-org/wgo-base-models/build/storage/server";

export const M_MEDIA_UPLOADFILE = gql`
  mutation ${MEDIA_PATH_POST_FILE}($data: MediaInput!, $urlApi: String!) {
    ${MEDIA_PATH_POST_FILE}(data: $data, urlApi: $urlApi) {
      id
      mimetype
      isPublic
      displayName
      fileName
      url
    }
  }
`;

export const M_MEDIA_UPLOADFILES = gql`
  mutation ${MEDIA_PATH_POST_FILES}($data: MediasInput!, $urlApi: String!) {
    ${MEDIA_PATH_POST_FILES}(data: $data, urlApi: $urlApi) {
      id
      mimetype
      isPublic
      displayName
      fileName
      url
    }
  }
`;

export const Q_MEDIA_GETFILE = gql`
  query ${MEDIA_PATH_GET_FILE}($id: Float!) {
    ${MEDIA_PATH_GET_FILE}(id: $id) {
      mimetype
      data
    }
  }
`;

export const M_MEDIA_DELETEFILE = gql`
  query ${MEDIA_PATH_DELETE_FILES}($id: Float!) {
    ${MEDIA_PATH_DELETE_FILES}(id: $id)
  }
`;
