import { Dialog, Loading } from "quasar";
import { IFormPoll, IPoll } from "src/models/Poll";
import { AGVTemplateEnum, getAgvTemplateKey } from "src/models/Templates";
import { EmailService } from "src/modules/email/services/EmailService";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PollComponent",
  props: {
    pollData: { type: Object as PropType<IPoll>, required: true },
  },
  data() {
    const value = this.pollData.labels.yesOrNoHolder;
    const formPoll = <IFormPoll>{
      allergy: value,
      class: "",
      disposition: value,
      email: "",
      foodAllergy: "",
      foodIntolerance: "",
      interest: value,
      intolerance: value,
      name: "",
      parentEmail: "",
      parentName: "",
      phone: "",
      photo: value,
    };
    return {
      formPoll,
      emailService: new EmailService(),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const appStatusStore = useAppStatusStore();
    return {
      notifyStore,
      appStatusStore,
    };
  },
  methods: {
    async onSubmit() {
      Loading.show();
      const form = this.formPoll;

      const dataEmail = {
        bambino: {
          nome: form.name,
          classe: form.class,
          fotografie: form.photo,
          allergie: form.allergy,
          allergieAlimento: form.allergy !== "No" ? form.foodAllergy : "-",
          intolleranze: form.intolerance,
          intolleranzeAlimento:
            form.intolerance !== "No" ? form.foodIntolerance : "-",
        },
        genitore: {
          nome: form.parentName,
          email: form.parentEmail,
          cellulare: form.phone,
          disposizione: form.disposition,
          interessato: form.interest,
        },
      };

      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `Oggetto: ${this.pollData.header?.subject}`,
          body: getAgvTemplateKey(AGVTemplateEnum.EmailPoll),
          to: `<${form.parentEmail}> "${form.parentName}"`,
          data: JSON.stringify(dataEmail),
        })
      ) {
        Loading.hide();
        Dialog.create({
          title: "Assemblea dei Genitori Vezia",
          message: "Grazie!",
          cancel: {
            unelevated: true,
            color: "primary",
            label: "Chiudere",
          },
          ok: false,
          persistent: true,
        });
        this.onReset();
        this.$emit("onClose");
      } else {
        Loading.hide();
        this.notifyStore.setNotify({
          message: "L'invio della posta non è riuscito",
          type: "negative",
          position: "top",
        });
      }
    },
    setYesOrNoValue(value: string) {
      this.formPoll.allergy = value;
      this.formPoll.disposition = value;
      this.formPoll.interest = value;
      this.formPoll.intolerance = value;
      this.formPoll.photo = value;
    },
    onReset() {
      return true;
    },
  },
  emits: ["onClose"],
});
