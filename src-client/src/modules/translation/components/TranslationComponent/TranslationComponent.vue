<template>
  <div class="q-pa-none" style="width: 100%">
    <div class="row">
      <div class="col-12">
        <SimpleLanguageSelector
          :languages="langStore.allLangs"
          :selected="selectedLanguage"
          @select="changeLanguage"
          class="fit text-start"
        />
      </div>
      <div class="col-12">
        <EditorToolbar
          :toEdit="self"
          propToEdit="value"
          :label="getLabel(label)"
          :hideFormat="false"
          :hideAlign="false"
          :hideViewCode="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import SimpleLanguageSelector from "../../../language/components/SimpleLanguageSelector/SimpleLanguageSelector.vue";
import EditorToolbar from "../../../core/components/Editor/EditorToolbar.vue";
import { IsStringEmpty } from "@wisegar-org/wgo-object-extensions";
import { LanguageStore } from "../../../language/store/LanguageStore";
import { TranslationStore } from "../../store/TranslationStore";
import { ITranslationResponse } from "@wisegar-org/wgo-base-models/build/translation";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";

export default defineComponent({
  name: "TranslationComponent",
  props: {
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    translation: {
      type: Object as PropType<ITranslationResponse>,
      required: true,
    },
    label: { type: String, default: "" },
  },
  components: {
    EditorToolbar,
    SimpleLanguageSelector,
  },
  data() {
    const value =
      this.translation.value || IsStringEmpty(this.translation.value)
        ? this.translation.value
        : this.translation.key;
    const translations: { [key: string]: string } =
      this.langStore && this.langStore.selectedLang && this.translation
        ? {
            [this.langStore.selectedLang.code]: value,
          }
        : {};
    const selectedLanguage: ILanguageModel = this.langStore.selectedLang;

    const { getLabel } = new BaseTranslateComponent();
    const self = this;

    return {
      self,
      translations,
      value,
      selectedLanguage,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async changeLanguage(lang: ILanguageModel) {
      this.selectedLanguage = lang;
      if (!(lang.code in this.translations)) {
        this.translations[lang.code] =
          await this.tranStore.getTranslationByLanguage(
            lang.id,
            this.translation.key
          );
      }
      this.value = this.translations[lang.code];
    },
  },
  watch: {
    value() {
      this.$emit("onChange", this.selectedLanguage.id, this.value);
    },
  },
  emits: ["onChange"],
});
</script>
