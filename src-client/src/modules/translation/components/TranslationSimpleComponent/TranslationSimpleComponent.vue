<template>
  <div class="q-px-none q-py-md" style="width: 100%">
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
        <Editor :toEdit="self" propToEdit="value" :label="label" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IsStringEmpty } from "@wisegar-org/wgo-object-extensions";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import Editor from "../../../core/components/Editor/Editor.vue";
import SimpleLanguageSelector from "../../../language/components/SimpleLanguageSelector/SimpleLanguageSelector.vue";
import { LanguageStore } from "../../../language/store/LanguageStore";
import { TranslationStore } from "../../store/TranslationStore";
import { ITranslationResponse } from "@wisegar-org/wgo-base-models/build/translation";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";

export default defineComponent({
  name: "TranslationSimpleComponent",
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
    Editor,
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
      value,
      translations,
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
