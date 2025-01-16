import gql from "graphql-tag";
import {
  STORAGE_PATH_DELETE_STORAGE,
  STORAGE_PATH_GET_STORAGE_BY_PAGE,
  STORAGE_PATH_GET_STORAGE_BY_TYPE,
  STORAGE_PATH_POST_STORAGE,
  STORAGE_PATH_PUT_STORAGE,
} from "@wisegar-org/wgo-base-models/build/storage/server";

export const Q_STORAGE_ALLITEMS = gql`
  query ${STORAGE_PATH_GET_STORAGE_BY_TYPE}($data: StorageAllInput!) {
    ${STORAGE_PATH_GET_STORAGE_BY_TYPE}(data: $data) {
      id
      type
      content
      image {
        id
        mimetype
        isPublic
        displayName
        fileName
        url
      }
      imageList {
        id
        mimetype
        isPublic
        displayName
        fileName
        url
      }
    }
  }
`;

export const Q_STORAGE_ITEMSBYPAGE = gql`
  query ${STORAGE_PATH_GET_STORAGE_BY_PAGE}($data: StoragePageInput!) {
    ${STORAGE_PATH_GET_STORAGE_BY_PAGE}(data: $data) {
      storageItemsCount
      storageItems {
        id
        type
        content
        image {
          id
          mimetype
          isPublic
          displayName
          fileName
          url
        }
        imageList {
          id
          mimetype
          isPublic
          displayName
          fileName
          url
        }
      }
    }
  }
`;

export const M_STORAGE_CREATEITEM = gql`
  mutation ${STORAGE_PATH_POST_STORAGE}($data: StorageInput!) {
    ${STORAGE_PATH_POST_STORAGE}(data: $data)
  }
`;

export const M_STORAGE_MODIFYITEM = gql`
  mutation ${STORAGE_PATH_PUT_STORAGE}($data: StorageInput!) {
    ${STORAGE_PATH_PUT_STORAGE}(data: $data)
  }
`;

export const M_STORAGE_DELETEITEM = gql`
  mutation ${STORAGE_PATH_DELETE_STORAGE}($id: Float!) {
    ${STORAGE_PATH_DELETE_STORAGE}(id: $id)
  }
`;
