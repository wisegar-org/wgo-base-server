import { defineComponent, PropType } from "vue";
import DialogVue from "src/modules/core/components/Dialog/Dialog.vue";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { translations } from "src/models/translations/newsletter";
import { AGVNewsletterInscriptionStatusEnum } from "src/models/Newsletter";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { NewsletterInscriptionService } from "src/services/Newsletter/NwLtInscriptionService";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { UtilService } from "src/services/UtilService";
import { AgvNewsletterInscriptionResponse } from "src/graphql-types";

export default defineComponent({
  name: "NsLtInscriptionAdminEditor",
  props: {
    open: { type: Boolean, default: false },
    inscription: {
      type: Object as PropType<AgvNewsletterInscriptionResponse>,
      required: true,
    },
  },
  components: {
    DialogVue,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const statusOptions = [
      AGVNewsletterInscriptionStatusEnum.Waiting,
      AGVNewsletterInscriptionStatusEnum.Cancelled,
    ];
    return {
      transBase,
      statusOptions,
      translations,
      inscriptionService: new NewsletterInscriptionService(),
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();

    return {
      appStatusStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    isValid() {
      return UtilService.isValidEmail(this.inscription.email);
    },
    async saveInscription() {
      this.appStatusStore.setLoading(true);
      const inscription = {
        id: this.inscription.id,
        email: this.inscription.email,
        status: this.inscription.status,
      };
      const result = this.inscription.id
        ? await this.inscriptionService.editNewsletterInscription(inscription)
        : await this.inscriptionService.addNewsletterInscription(inscription);

      this.appStatusStore.setLoading(false);
      if (result) this.$emit("close", true, this.inscription.email);
    },
  },
});
