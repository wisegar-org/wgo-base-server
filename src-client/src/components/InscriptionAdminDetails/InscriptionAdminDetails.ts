import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { defineComponent, PropType } from "vue";
import { translations } from "src/models/translations/inscriptions";
import DialogVue from "src/modules/core/components/Dialog/Dialog.vue";
import { AgvInscriptionResponseModel } from "src/models/models";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { UtilService } from "src/modules/core/services/UtilService";

export default defineComponent({
  name: "InscriptionAdminDetails",
  props: {
    open: { type: Boolean, default: false },
    inscription: {
      type: Object as PropType<AgvInscriptionResponseModel>,
      required: true,
    },
  },
  components: { DialogVue },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      transBase,
      translations,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    getFormatDate(data: string | Date) {
      return UtilService.parseDate(data, "DD/MM/YYYY");
    },
  },
  emits: ["close"],
});
