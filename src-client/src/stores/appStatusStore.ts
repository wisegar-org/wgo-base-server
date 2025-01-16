import { defineStore } from "pinia";

export const appStatusId = "appStatusStore";

export const useAppStatusStore = defineStore({
  id: appStatusId,
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
