import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { defineComponent } from "vue";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { translations } from "src/models/translations/content";
import { useNotifyStore } from "src/stores/notifyStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import { useTranslationStore } from "src/stores/translationStore";
import { openURL } from "quasar";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "SocialMediaAdminContent",
  data() {
    const data = { facebook: "", instagram: "" };
    const { getLabel } = new BaseTranslateComponent();

    return {
      data,
      transBase,
      translations,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const appStatusStore = useAppStatusStore();
    const appContentStore = useAppContentStore();
    const translationStore = useTranslationStore();

    return {
      notifyStore,
      appStatusStore,
      appContentStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async onSaveData() {
      this.appStatusStore.setLoading(true);
      if (
        await this.appContentStore.savePageContent({
          ...this.appContentStore.contentObj,
          facebook: this.data.facebook,
          instagram: this.data.instagram,
        })
      ) {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_SM_SUCCESS),
          position: "top",
          type: "positive",
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.SAVE_SM_FAIL),
          position: "top",
          type: "negative",
        });
      }
      this.appStatusStore.setLoading(false);
    },
    goToLink(event: Event, link: string) {
      event.preventDefault();
      if (link) {
        openURL(link);
      }
    },
  },
  async created() {
    if (
      !this.appContentStore.contentObj.facebook ||
      !this.appContentStore.contentObj.instagram
    ) {
      await this.appContentStore.loadPageContent();
    }

    this.data = {
      facebook: this.appContentStore.contentObj.facebook || "",
      instagram: this.appContentStore.contentObj.instagram || "",
    };
  },
});
