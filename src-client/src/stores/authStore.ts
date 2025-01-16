import { defineStore } from "pinia";
import { AuthStore } from "src/modules/authentication/store/AuthStore";

export const userAuthId = "authStore";

export const useAuthStore = defineStore({
  id: userAuthId,
  state: () => ({
    authStore: new AuthStore(),
    reset: true,
  }),
  getters: {
    getUser: (state) => {
      return state.authStore.user.id ? state.authStore.user : null;
    },
    getToken: (state) => {
      return state.authStore.token;
    },
    getOpenLogin: (state) => {
      return !state.authStore.token && state.authStore.user && !state.reset;
    },
  },
  actions: {
    openAuthDialog() {
      return !this.authStore.token && !!this.authStore.user.id;
    },
  },
});
