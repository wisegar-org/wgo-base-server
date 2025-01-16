import { defineStore } from "pinia";
import { IPageContent } from "src/models/Content";
import { IPoll } from "src/models/Poll";
import { ContentService } from "src/services/Content/ContentService";
import { PollService } from "src/services/PollService";

export const appContentId = "appContentStore";

export const useAppContentStore = defineStore({
  id: appContentId,
  state: () => ({
    content: {
      comitatoMembri: "",
      facebook: "",
      instagram: "",
    } as IPageContent,
    pollData: {
      content: {
        description: "",
        parting: "",
      },
      header: {
        address: "",
        email: "",
        subject: "",
        title: "",
      },
      labels: {
        allergy: "",
        childGroup: "",
        class: "",
        disposition: "",
        email: "",
        foodAllergy: "",
        foodIntolerance: "",
        interest: "",
        intolerance: "",
        name: "",
        parentEmail: "",
        parentGroup: "",
        parentName: "",
        phone: "",
        photo: "",
        photoHelp: "",
        send: "",
        yesOrNoHolder: "",
      },
      options: {
        class: [] as string[],
        yesOrNo: [] as string[],
      },
      textBanner: {
        clickText: "",
        text: "",
      },
      textBannerReedme: {
        clickText: "",
        description: "",
        text: "",
        title: "",
      },
      textEmail: {
        footer: "",
        header: "",
      },
      textLink: {
        clickText: "",
        text: "",
      },
    } as IPoll,
  }),
  getters: {
    contentObj(state) {
      return state.content;
    },
    pollDataObj(state) {
      return state.pollData;
    },
  },
  actions: {
    async loadPageContent() {
      const contentService = new ContentService();
      const result = await contentService.allContent();
      if (result) {
        this.content = { ...this.content, ...result };
      }
    },
    async savePageContent(data: IPageContent) {
      const contentService = new ContentService();
      if (await contentService.modifyContent(data)) {
        this.content = { ...this.content, ...data };
        return true;
      }
      return false;
    },
    async loadPollData() {
      if (!this.pollData.header?.title) {
        const pollDataService = new PollService();
        const pollData = await pollDataService.getPollConfig();
        if (pollData) {
          this.pollData = {
            ...pollData,
          };
        }
      }
    },
  },
});
