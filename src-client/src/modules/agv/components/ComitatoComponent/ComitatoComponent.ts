import { defineComponent } from "vue";
import TextVue from "src/modules/core/components/Text/Text.vue";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import { IPageContent } from "src/models/Content";
import ComitatoContactForm from "src/modules/agv/components/ComitatoContactForm/ComitatoContactForm.vue";

export default defineComponent({
  name: "ComitatoComponent",
  components: {
    TextVue,
    ComitatoContactForm,
  },
  data() {
    return {
      content: {
        comitatoMembri: "",
      } as IPageContent,
    };
  },
  setup() {
    const contentStore = useAppContentStore();
    return {
      contentStore,
    };
  },
  async created() {
    if (
      !this.contentStore.content ||
      !this.contentStore.content.comitatoMembri
    ) {
      await this.contentStore.loadPageContent();
      this.content = this.contentStore.contentObj;
    }
  },
});
