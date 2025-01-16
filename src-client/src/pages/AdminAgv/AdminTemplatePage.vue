<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <TemplateEditor
        v-if="type"
        :type="dataObj.key"
        :objectToken="dataObj.objectToken"
        :testData="dataObj.testData"
        :tranStore="tranStore.translationStore"
        :authStore="authStore.authStore"
        :urlApi="urlApi"
        @onSuccess="onSuccess"
        @onFail="onFail"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AGVTemplateEnum, getAgvTemplateKey } from "../../models/Templates";
import { useAuthStore } from "../../stores/authStore";
import { apiSettings } from "../../api/ApiOptions";
import { EventTypeOptions, EventClassOption } from "../../models/Events";
import { AGVNewsletterInscriptionStatusEnum } from "../../models/Newsletter";
import { ObjectDictionary } from "@wisegar-org/wgo-base-models/build/core";
import TemplateEditor from "src/modules/template/components/TemplateEditor/TemplateEditor.vue";
import { useTranslationStore } from "../../stores/translationStore";
import { useNotifyStore } from "../../stores/notifyStore";
import { AuthTemplateEnum } from "@wisegar-org/wgo-base-models/build/authentication/constants";

export default defineComponent({
  name: "AdminSocialMediaContentPage",
  props: {
    type: { type: String, defualt: "" },
  },
  components: {
    TemplateEditor,
  },
  data() {
    const key = "";
    const objectToken = [""];
    const testData: ObjectDictionary = {};
    return {
      urlApi: apiSettings.API_BASE,
      data: {
        key,
        objectToken,
        testData,
      },
    };
  },
  setup() {
    const authStore = useAuthStore();
    const tranStore = useTranslationStore();
    const notifyStore = useNotifyStore();

    return {
      authStore,
      tranStore,
      notifyStore,
    };
  },
  methods: {
    onSuccess(msg: string): void {
      this.notifyStore.setNotify({
        message: msg,
        type: "positive",
        position: "top",
      });
    },
    onFail(msg: string): void {
      this.notifyStore.setNotify({
        message: msg,
        type: "negative",
        position: "top",
      });
    },
  },
  computed: {
    dataObj() {
      let key: string = getAgvTemplateKey(this.type || "");
      let objectToken = [""];
      let testData: ObjectDictionary = {};

      switch (this.type) {
        case AuthTemplateEnum.ConfirmEmail:
        case AuthTemplateEnum.ResetPassword: {
          objectToken = [
            "{{email}}",
            "{{nome}}",
            "{{cognome}}",
            "{{url}}",
            "{{linkDiConferma}}",
          ];
          testData = {
            email: this.authStore.getUser?.email || "Utente email",
            nome: this.authStore.getUser?.name || "Utente nome",
            cognome: this.authStore.getUser?.name || "Utente nome",
            url: apiSettings.API_BASE,
            linkDiConferma: apiSettings.API_BASE,
          };
          break;
        }
        case AuthTemplateEnum.ConfirmChangeDefaultPassword: {
          objectToken = [
            "{{email}}",
            "{{nome}}",
            "{{cognome}}",
            "{{url}}",
            "{{linkDiConferma}}",
            "{{password}}",
          ];
          testData = {
            email: this.authStore.getUser?.email || "Utente email",
            nome: this.authStore.getUser?.name || "Utente nome",
            cognome: this.authStore.getUser?.name || "Utente nome",
            url: apiSettings.API_BASE,
            linkDiConferma: apiSettings.API_BASE,
            password: "Utente password predefinita",
          };
          break;
        }
        case AGVTemplateEnum.Inscription:
        case AGVTemplateEnum.InscriptionRepeated: {
          objectToken = [
            "{{utente.nome}}",
            "{{utente.cognome}}",
            "{{utente.email}}",
            "{{utente.telefono}}",
            "{{utente.messaggio}}",
            "{{utente.classe}}",
            "{{evento.titolo}}",
            "{{evento.tipo}}",
            "{{evento.corso}}",
            "{{evento.datadiInizio}}",
            "{{evento.datadiFine}}",
            "{{evento.descrizione}}",
            "{{evento.breveDescrizione}}",
            "{{evento.url}}",
          ];
          testData = {
            utente: {
              nome: this.authStore.getUser?.name || "Utente nome",
              cognome: this.authStore.getUser?.lastName || "Utente cognome",
              email: this.authStore.getUser?.email || "Utente email",
              telefono: "555555555555",
              messaggio: "Messaggio di prova",
              classe: "SE-I",
            },
            evento: {
              titolo: "Titolo di prova",
              tipo: EventTypeOptions[0],
              corso: EventClassOption[0],
              datadiInizio: new Date(),
              datadiFine: new Date(),
              descrizione: "Descrizione di prova",
              breveDescrizione: "Descrizione di prova",
              url: apiSettings.API_BASE,
            },
          };
          break;
        }
        case AGVNewsletterInscriptionStatusEnum.Waiting:
        case AGVNewsletterInscriptionStatusEnum.Confirmed:
        case AGVNewsletterInscriptionStatusEnum.Cancelled: {
          objectToken = ["{{email}}", "{{url}}", "{{linkDiConferma}}"];
          testData = {
            email: this.authStore.getUser?.email || "Utente email",
            url: apiSettings.API_BASE,
            linkDiConferma: apiSettings.API_BASE,
          };
          break;
        }
        case AGVTemplateEnum.EmailComitato:
        case AGVTemplateEnum.EmailContact: {
          objectToken = [
            "{{nome}}",
            "{{cognome}}",
            "{{email}}",
            "{{telefono}}",
            "{{messaggio}}",
          ];
          testData = {
            nome: this.authStore.getUser?.name || "Utente nome",
            cognome: this.authStore.getUser?.lastName || "Utente cognome",
            email: this.authStore.getUser?.email || "Utente email",
            telefono: "555555555555",
            messaggio: "Messaggio di prova",
          };
          break;
        }
        case AGVTemplateEnum.EmailPoll: {
          objectToken = [
            "{{bambino.nome}}",
            "{{bambino.classe}}",
            "{{bambino.fotografie}}",
            "{{bambino.allergie}}",
            "{{bambino.allergieAlimento}}",
            "{{bambino.intolleranze}}",
            "{{bambino.intolleranzeAlimento}}",
            "{{genitore.nome}}",
            "{{genitore.email}}",
            "{{genitore.cellulare}}",
            "{{genitore.disposizione}}",
            "{{genitore.interessato}}",
          ];
          testData = {
            bambino: {
              nome: "Bambino",
              classe: "SI-Piccolo",
              fotografie: "Si",
              allergie: "No",
              allergieAlimento: "-",
              intolleranze: "No",
              intolleranzeAlimento: "-",
            },
            genitore: {
              nome: this.authStore.getUser?.name || "Utente nome",
              email: this.authStore.getUser?.email || "Utente email",
              cellulare: "555555555555",
              disposizione: "No",
              interessato: "No",
            },
          };
          break;
        }
        default: {
          key = "";
          objectToken = [""];
          testData = {};
          break;
        }
      }

      return {
        key,
        objectToken,
        testData,
      };
    },
  },
});
</script>
