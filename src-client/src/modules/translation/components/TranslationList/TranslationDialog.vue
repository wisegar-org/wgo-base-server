<template>
  <Dialog
    :open="open"
    icon="translate"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveTranslation" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12 fit q-py-sm q-px-sm">
            <SimpleLanguageSelector
              :languages="langStore.allLangs"
              :selected="lang"
              @select="selectLang"
              class="fit text-start"
            />
          </div>
          <div class="col-12">
            <q-input
              outlined
              :autofocus="!translation.key"
              class="q-my-sm q-mx-sm"
              v-model="translationList[lang.id].key"
              required
              :readonly="!!translation.key"
              :label="getLabel(translations.COLUMN_KEY)"
            />
          </div>
          <div class="col-12">
            <q-input
              outlined
              autofocus
              class="q-my-sm q-mx-sm"
              v-model="translationList[lang.id].value"
              required
              :label="getLabel(translations.COLUMN_VALUE)"
            />
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-py-md">
          <q-btn
            outline
            color="primary"
            text-color="secondary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="getLabel(transBase.SAVE)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import SimpleLanguageSelector from "../../../language/components/SimpleLanguageSelector/SimpleLanguageSelector.vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { transTranslations as translations } from "@wisegar-org/wgo-base-models/build/translation/translations";
import { ITranslationModel } from "@wisegar-org/wgo-base-models/build/translation";
import { TranslationStore } from "../../store/TranslationStore";
import { LanguageStore } from "../../../language/store/LanguageStore";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";

export default defineComponent({
  name: "TranslationDialog",
  props: {
    open: { type: Boolean, default: false },
    translation: {
      type: Object as PropType<ITranslationModel>,
      default: {} as ITranslationModel,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  components: {
    Dialog,
    SimpleLanguageSelector,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      translationList: {} as { [key: string]: ITranslationModel },
      translationsContent: {},
      lang: this.langStore.selectedLang,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      transBase,
      translations,
    };
  },
  methods: {
    async selectLang(lang: ILanguageModel) {
      if (!this.translationList[lang.id]) {
        const translation = await this.tranStore.getTranslationByLanguage(
          lang.id,
          this.translation.key
        );
        this.translationList[lang.id] = {
          id: this.translation.key,
          key: this.translation.key,
          value: translation,
          languageId: lang.id,
        };
      }
      this.lang = lang;
    },
    async saveTranslation() {
      const input = Object.values(this.translationList).map(
        (trans) =>
          ({
            key: trans.key,
            value: trans.value,
            languageId: trans.languageId,
          } as any)
      );
      const result = await this.tranStore.setTranslation({
        translations: input,
      });
      if (result) {
        this.tranStore.translations[this.translation.key] =
          this.translationList[this.translation.languageId];
        this.tranStore.translationsValue[this.translation.key] =
          this.translationList[this.translation.languageId].value;
        this.tranStore.setOnlySiteTranslationsList();
        this.$emit("onSet");
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
  emits: ["onSet", "close"],
  watch: {
    translation() {
      if (this.translation && this.translation.languageId) {
        this.translationList = {
          [this.translation.languageId]: { ...this.translation },
        };
        this.selectLang(this.langStore.selectedLang);
      }
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
