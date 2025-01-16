import { defineStore } from "pinia";
import { reactive } from "vue";
export const userNotifyId = "notifyStore";

export interface INotify {
  position: string;
  type: string;
  message: string;
}

export const useNotifyStore = defineStore({
  id: userNotifyId,
  state: () => ({
    notify: reactive(<INotify>{}),
  }),
  getters: {
    getNotify(state) {
      return state;
    },
  },
  actions: {
    setNotify(notify: INotify) {
      this.notify = notify;
    },
  },
});
