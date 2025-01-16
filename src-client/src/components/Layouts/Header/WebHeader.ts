import { useAuthStore } from "src/stores/authStore";
import { defineComponent, PropType } from "vue";
import {
  AdminBasePath,
  IRoute,
  translations as transBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { UtilService } from "src/services/UtilService";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "WebHeader",
  props: {
    title: { type: String, default: "" },
    menuList: { type: Array as PropType<IRoute[]>, default: () => [] },
  },
  setup() {
    const authStore = useAuthStore();
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      authStore,
      adminPath: AdminBasePath,
      getLabel: (name: string) =>
        getLabel(
          tranStore.translationStore as unknown as TranslationStore,
          name
        ),
      transBase,
    };
  },
  methods: {
    goToHome() {
      if (this.$route.path !== "/") {
        void this.$router.push("/");
      }
    },
    isUserAdmin() {
      return this.authStore.authStore.isUserInRole([SUPERADMIN]);
    },
    openNewTab(evt: Event) {
      UtilService.openNewTab(evt, this.adminPath);
    },
  },
});
