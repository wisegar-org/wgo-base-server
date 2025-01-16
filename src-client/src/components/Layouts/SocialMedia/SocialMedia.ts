import { UtilService } from "src/services/UtilService";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SocialMedia",
  props: {
    size: {
      type: Number,
      default: 40,
    },
  },
  setup() {
    const contentStore = useAppContentStore();
    return {
      contentStore,
    };
  },
  methods: {
    goToLink(event: Event, link: string) {
      UtilService.openNewTab(event, link);
    },
  },
  async created() {
    if (
      !this.contentStore.contentObj ||
      !this.contentStore.contentObj.facebook ||
      !this.contentStore.contentObj.instagram
    ) {
      await this.contentStore.loadPageContent();
    }
  },
});
