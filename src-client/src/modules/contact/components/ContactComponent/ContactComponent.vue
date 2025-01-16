<template>
  <q-form @submit="sendEmail" class="q-pa-sm">
    <div
      v-html="getLabel(translations.CONTACT_TITLE)"
      class="text-h4 q-py-md"
    ></div>
    <div
      v-html="getLabel(translations.CONTACT_BODY)"
      class="text-body1 q-py-md"
    ></div>
    <div class="row">
      <div class="col-12 col-md-6 q-px-sm">
        <q-input
          square
          outlined
          required
          class="q-my-sm"
          :label="getLabel(translations.CONTACT_FIELD_NAME_LB)"
          :placeholder="getLabel(translations.CONTACT_FIELD_NAME_PH)"
          v-model="name"
        />
      </div>
      <div class="col-12 col-md-6 q-px-sm">
        <q-input
          square
          outlined
          required
          class="q-my-sm"
          :label="getLabel(translations.CONTACT_FIELD_EMAIL_LB)"
          :placeholder="getLabel(translations.CONTACT_FIELD_EMAIL_PH)"
          v-model="email"
          type="email"
        />
      </div>
      <div class="col-12 q-px-sm">
        <q-input
          square
          outlined
          required
          class="q-my-sm"
          :label="getLabel(translations.CONTACT_FIELD_MESSAGE_LB)"
          :placeholder="getLabel(translations.CONTACT_FIELD_MESSAGE_PH)"
          v-model="msg"
          type="textarea"
        />
      </div>
    </div>
    <br />
    <div class="flex justify-center items-center">
      <q-btn
        unelevated
        :label="getLabel(translations.CONTACT_SEND_BTN)"
        color="primary"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IContactModel } from "@wisegar-org/wgo-base-models/build/contact";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { EmailService } from "../../../email/services/EmailService";
import { contactTranslations as translations } from "@wisegar-org/wgo-base-models/build/contact/translations";

export default defineComponent({
  name: "ContactComponent",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const contact: IContactModel = {} as IContactModel;
    const name: string = "";
    const email: string = "";
    const msg: string = "";

    return {
      name,
      email,
      msg,
      contact,
      translations,
      loading: true,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async sendEmail() {
      this.loading = true;

      let body = `<p>${this.getLabel(
        this.translations.CONTACT_FIELD_NAME_LB
      )}: ${this.name}</p>`;
      body += `<p>${this.getLabel(this.translations.CONTACT_FIELD_EMAIL_LB)}: ${
        this.email
      }</p><br/>`;
      body += `<p>${this.msg.split("\n").join("</p><p>")}</p>`;

      const emailService = new EmailService();
      if (
        await emailService.sendEmailFromToAddressAndApp({
          subject: this.getLabel(this.translations.CONTACT_EMAIL_SUBJECT),
          body: body,
          to: `<${this.email}> "${this.name}"`,
          data: "",
        })
      ) {
        this.loading = false;
        this.$emit(
          "success",
          this.getLabel(this.translations.CONTACT_EMAIL_SUCCESS_MSG)
        );
      } else {
        this.loading = false;

        this.$emit(
          "fail",
          this.getLabel(this.translations.CONTACT_EMAIL_FAIL_MSG)
        );
      }
    },
  },
  emits: ["success", "fail"],
});
</script>
