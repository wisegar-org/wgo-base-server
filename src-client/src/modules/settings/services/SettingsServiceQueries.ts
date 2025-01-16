import gql from "graphql-tag";
import {
  SETTINGS_PATH_GET_ALL_SETTINGS,
  SETTINGS_PATH_SET_SETTING,
} from "@wisegar-org/wgo-base-models/build/settings/server";

export const Q_SETTINGS_GETALL = gql`
query ${SETTINGS_PATH_GET_ALL_SETTINGS} {
    ${SETTINGS_PATH_GET_ALL_SETTINGS} {
        type_settings
        key
        value {
          type
          value
        }
  }
}
`;

export const M_SETTING_POST = gql`
mutation ${SETTINGS_PATH_SET_SETTING}($data: PostSettingInput!) {
    ${SETTINGS_PATH_SET_SETTING}(data: $data)
}
`;
