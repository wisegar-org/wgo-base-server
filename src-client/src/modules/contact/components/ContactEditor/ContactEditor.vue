<template>
  <div style="width: 100%">
    <q-card v-if="!loading" flat>
      <q-card-section class="q-py-md">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(translations.CONTACT_ADM_TITLE) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(tranBase.SAVE)"
              @click="() => clickSaveContactData()"
              class="col-12 col-sm-auto"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_CONTACT_TITLE_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objContactTitle"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactTitle, langId, value)
          "
        />
        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_CONTACT_CONTENT_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objContactContent"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactContent, langId, value)
          "
        />

        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_NAME_FL)"
              v-model="contact.contactName"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_ADDRESS_FL)"
              v-model="contact.address"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_PHONE_FL)"
              v-model="contact.phoneNumber"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_EMAIL_FL)"
              v-model="contact.email"
            />
          </div>
        </div>

        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_MAP_TITLE_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objMapTitle"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsMapTitle, langId, value)
          "
        />

        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          class="q-pa-sm"
          :label="getLabel(translations.CONTACT_ADM_CONTACT_MAP_FL)"
          v-model="contact.mapPath"
          type="textarea"
        />
        <div v-if="contact.mapPath" class="text-h6">
          {{ getLabel(translations.CONTACT_ADM_CONTACT_PREVIEW_FL) }}
        </div>
        <iframe
          v-if="contact.mapPath"
          style="border: 0"
          tabindex="0"
          :src="contact.mapPath"
          width="100%"
          height="500"
          frameborder="0"
          :allowfullscreen="true"
          aria-hidden="false"
        />
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TranslationComponent from "../../../translation/components/TranslationComponent/TranslationComponent.vue";
import Loader from "../../../core/components/Loader/Loader.vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { contactTranslations as translations } from "@wisegar-org/wgo-base-models/build/contact/translations";
import {
  NumberDictionary,
  translations as tranBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { ContactService } from "../../services/ContactService";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { LanguageStore } from "../../../language/store/LanguageStore";
import {
  IContactMeInput,
  IContactModel,
} from "@wisegar-org/wgo-base-models/build/contact";
import {
  ITranslationInput,
  ITranslationResponse,
} from "@wisegar-org/wgo-base-models/build/translation";

export default defineComponent({
  name: "ContactEditor",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  components: {
    TranslationComponent,
    Loader,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const contact: IContactModel = {
      address: "",
      contactName: "",
      email: "",
      mapPath: "",
      phoneNumber: "",
    } as IContactModel;
    const contactService = new ContactService();

    const objMapTitle: ITranslationResponse = <ITranslationResponse>{
      key: translations.MAP_TITLE,
      id: translations.MAP_TITLE,
      value: getLabel(this.tranStore, translations.MAP_TITLE),
    };

    const objContactTitle: ITranslationResponse = <ITranslationResponse>{
      key: translations.CONTACT_TITLE,
      id: translations.CONTACT_TITLE,
      value: getLabel(this.tranStore, translations.CONTACT_TITLE),
    };

    const objContactContent: ITranslationResponse = <ITranslationResponse>{
      key: translations.CONTACT_BODY,
      id: translations.CONTACT_BODY,
      value: getLabel(this.tranStore, translations.CONTACT_BODY),
    };

    const translationsMapTitle: NumberDictionary = {};
    const translationsContactTitle: NumberDictionary = {};
    const translationsContactContent: NumberDictionary = {};

    return {
      contact,
      loading: false,
      tranBase,
      translations,
      objMapTitle,
      objContactTitle,
      objContactContent,
      translationsContactContent,
      translationsMapTitle,
      translationsContactTitle,
      contactService,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    onChangeIndexContent(
      translations: NumberDictionary,
      langId: number,
      value: string
    ) {
      translations[langId] = value;
    },
    getTranslationItem(traslationValue: NumberDictionary, key: string) {
      return Object.keys(traslationValue).map((langId) => {
        const lang = parseInt(langId);
        return {
          languageId: lang,
          key: key,
          value: traslationValue[lang],
        };
      });
    },
    async clickSaveContactData() {
      this.loading = true;

      let translationsToSet: ITranslationInput[] = [];
      translationsToSet = translationsToSet.concat(
        this.getTranslationItem(
          this.translationsMapTitle,
          translations.MAP_TITLE
        ),
        this.getTranslationItem(
          this.translationsContactTitle,
          translations.CONTACT_TITLE
        ),
        this.getTranslationItem(
          this.translationsContactContent,
          translations.CONTACT_BODY
        )
      );

      const contactData = <IContactMeInput>{
        contactName: this.contact.contactName,
        address: this.contact.address,
        email: this.contact.email,
        phoneNumber: this.contact.phoneNumber,
        mapPath: this.contact.mapPath,
      };
      if (await this.contactService.setContactData(contactData)) {
        await this.tranStore.setTranslation({
          translations: translationsToSet,
        });
        this.$emit(
          "showMessage",
          true,
          this.getLabel(translations.CONTACT_ADM_SUCCESS_MSG)
        );
      } else {
        this.$emit(
          "showMessage",
          false,
          this.getLabel(translations.CONTACT_ADM_FAIL_MSG)
        );
      }
      this.loading = false;
    },
    async loadContactData() {
      const result = await this.contactService.getContactData();
      if (result) this.contact = result;
    },
  },
  async mounted() {
    await this.loadContactData();
  },
  emits: ["showMessage"],
});
</script>
