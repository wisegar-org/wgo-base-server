/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, PropType } from "vue";
import { apiSettings } from "src/api/ApiOptions";
import QCKEditor from "src/modules/core/components/CKEditor/QCKEditor.vue";
import { translations } from "src/models/translations/newsletter";
import { useNotifyStore } from "src/stores/notifyStore";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import {
  ObjectDictionary,
  translations as transBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { useAuthStore } from "src/stores/authStore";
import { NewsletterMessageService } from "src/services/Newsletter/NwLtMessengerService";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/modules/core/components/BaseComponents";
import { EmailService } from "src/modules/email/services/EmailService";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "NsLtMessageAdminEditor",
  props: {
    message: {
      type: Object as PropType<any>, //
      required: true,
    },
  },
  components: {
    QCKEditor,
  },
  data() {
    const urlApi = apiSettings.API_BASE;
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const objectToken: string[] = ["{{utente.email}}"];
    const title: string = this.message.id
      ? translations.MSG_EDITOR_MODIFICATION_TITLE
      : translations.MSG_EDITOR_CREATION_TITLE;

    return {
      title,
      urlApi,
      transBase,
      translations,
      objectToken,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
      emailService: new EmailService(),
      newsletterService: new NewsletterMessageService(),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const translationStore: any = useTranslationStore();
    const appStatusStore: any = useAppStatusStore();
    const authStore: any = useAuthStore();

    return {
      notifyStore,
      appStatusStore,
      authStore: authStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async saveMessage() {
      this.appStatusStore.setLoading(true);
      const message: unknown = {
        id: this.message.id,
        message: this.message.message,
        title: this.message.title,
        status: this.message.status || "",
      };

      const result = this.message.id
        ? await this.newsletterService.editNewsletterMessage(message)
        : await this.newsletterService.addNewsletterMessage(message);

      this.appStatusStore.setLoading(false);

      if (result) {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_EDITOR_SAVE_SUCCESS),
          type: "positive",
          position: "top",
        });
        this.$emit("success");
        //go to list page
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_EDITOR_SAVE_FAIL),
          type: "negative",
          position: "top",
        });
      }
    },
    async sendTest() {
      this.appStatusStore.setLoading(true);
      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Prova: ${this.message.title}`,
          body: this.message.message,
          to: `<${this.authStore.getUser?.email}> "${this.authStore.getUser?.name} ${this.authStore.getUser?.lastName}"`,
          data: JSON.stringify({
            utente: {
              email: this.authStore.getUser?.email,
            },
          }),
        })
      ) {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_SEND_MESSAGE_SUCCESS),
          type: "positive",
          position: "top",
        });
        return true;
      } else {
        this.appStatusStore.setLoading(false);
        this.notifyStore.setNotify({
          message: this.getLabel(this.translations.MSG_SEND_MESSAGE_FAIL),
          type: "negative",
          position: "top",
        });
        return false;
      }
    },
    writeToken(text: string) {
      const model = (this.$refs.editor as ObjectDictionary).$refs.editor
        .instance.model;

      model.change((writer: ObjectDictionary) => {
        writer.insertText(
          `${text}`,
          model.document.selection.getFirstPosition()
        );
      });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
