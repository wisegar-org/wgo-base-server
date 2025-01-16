import { defineComponent } from "vue";
import MobileHeader from "./MobileHeader.vue";
import WebHeader from "./WebHeader.vue";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { homePageRoute } from "src/modules/agv/routes/homePageRoute";
import { corsiPageRoute } from "src/modules/agv/routes/corsiPageRoute";
import { eventiPageRoute } from "src/modules/agv/routes/eventiPageRoute";
import { comitatoPageRoute } from "src/modules/agv/routes/comitatoPageRoute";
import { contattoPageRoute } from "src/modules/agv/routes/contattoPageRoute";
import { donationPageRoute } from "src/modules/agv/routes/donationPageRoute";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    WebHeader,
    MobileHeader,
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) =>
        getLabel(
          tranStore.translationStore as unknown as TranslationStore,
          name
        ),
      transBase,
      paths: [
        homePageRoute,
        corsiPageRoute,
        eventiPageRoute,
        comitatoPageRoute,
        contattoPageRoute,
        donationPageRoute,
      ],
    };
  },
});
