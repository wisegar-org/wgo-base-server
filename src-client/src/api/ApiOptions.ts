import { Pinia } from "pinia";
import { IApiServiceOptions } from "src/modules/core/services/ApiService";
import { getSettings } from "./ApiSettings";
import { translations } from "@wisegar-org/wgo-base-models/build/core";

import { useNotifyStore } from "src/stores/notifyStore";
import { useAuthStore } from "src/stores/authStore";
import { useTranslationStore } from "src/stores/translationStore";
import { USER_AUTH_TOKEN } from "@wisegar-org/wgo-base-models/build/authentication";
import { LocalStorage } from "src/modules/core/services/LocalStorage";
import { LANGUAGE_ID } from "@wisegar-org/wgo-base-models/build/language";

export const apiSettings = getSettings();

const isNotAuthorizedErrorHandler = (message: string) => {
  return message === "NotAuthorized";
};

const isValidateAccessTokenErrorHandelr = (message: string) => {
  return message.indexOf("validateAccessToken") !== -1;
};

export const getApiServiceOptions = (pinia: Pinia) => {
  const notifyStore = useNotifyStore(pinia);
  const authStore = useAuthStore(pinia);
  const tranStore = useTranslationStore(pinia);
  const apiServiceOptions: IApiServiceOptions = {
    onGenericErrorHandler: (message: string) => {
      console.log(message);
    },
    onGenericErrorHandlerIndex: (message: string, index: number) => {
      console.debug(`GQL Error: ${message}`);
      if (
        isValidateAccessTokenErrorHandelr(message) ||
        isNotAuthorizedErrorHandler(message)
      ) {
        if (index === 0) authStore.authStore.setToken("");
      } else {
        notifyStore.setNotify({
          position: "top",
          type: "negative",
          message: tranStore.translationStore.getTranslation(
            message || translations.SERVER_ERROR
          ),
        });
      }
    },
    onGetAuthToken: () => {
      const token = LocalStorage.getItem(USER_AUTH_TOKEN) || "";
      return token;
    },
    onGetBaseUrl: () => {
      return apiSettings.API_GRAPHQL;
    },
    onNetworkErrorHandler: (message: string | { message: string }) => {
      console.debug(`GQL Network Error: ${message}`);
      const messageStr =
        typeof message === "string" ? message : message.message;
      notifyStore.setNotify({
        position: "top",
        type: "negative",
        message: tranStore.translationStore.getTranslation(
          messageStr || translations.NETWORK_ERROR
        ),
      });
    },
    onTokenRefresh: (headers: { get?: (key: string) => string }) => {
      if (headers && headers.get) {
        const refreshedToken = headers.get("authorization-refresh");
        if (!refreshedToken || refreshedToken === null) return;
        authStore.authStore.setToken(refreshedToken);
      }
    },
    onHeadersSetup: (headers: { [key: string]: unknown }) => {
      headers["Apollo-Require-Preflight"] = true;
      headers["language"] = LocalStorage.getItem(LANGUAGE_ID) || "0";
    },
  };
  return apiServiceOptions;
};
