<template>
  <div class="q-pa-md">
    <div
      class="q-py-xl text-h4"
      v-if="contact.mapPath"
      v-html="getLabel(translations.MAP_TITLE)"
    ></div>
    <iframe
      style="border: 0"
      tabindex="0"
      :src="contact.mapPath"
      width="100%"
      height="500"
      frameborder="0"
      :allowfullscreen="true"
      aria-hidden="false"
      v-if="contact.mapPath"
    >
    </iframe>
    <div v-if="showLabels">
      <q-card class="my-card" flat>
        <q-card-section>
          <div class="text-h4 text-center">{{ contact.contactName }}</div>
          <div class="text-body1 text-center">{{ contact.address }}</div>
          <br />
          <div class="text-body1 text-center">
            {{ getLabel(translations.MAP_PHONE_LB) }}: {{ contact.phoneNumber }}
          </div>
          <div class="text-body1 text-center">
            {{ getLabel(translations.MAP_EMAIL_LB) }}: {{ contact.email }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { ContactService } from "../../services/ContactService";
import { contactTranslations as translations } from "@wisegar-org/wgo-base-models/build/contact/translations";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { IContactModel } from "@wisegar-org/wgo-base-models/build/contact";

export default defineComponent({
  name: "MapComponent",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    showLabels: { type: Boolean, default: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const contact: IContactModel = {} as IContactModel;

    return {
      contact,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async loadContactData() {
      const contactService = new ContactService();
      const result = await contactService.getContactData();
      if (result) this.contact = result;
    },
  },
  mounted() {
    this.loadContactData();
  },
});
</script>
