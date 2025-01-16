<template>
  <TranslationList
    :tranStore="translationStore"
    :langStore="languageStore"
    @success="success"
  />
</template>

<script lang="ts">
import { useTranslationStore } from "../../../stores/translationStore";
import { defineComponent } from "vue";
import { useNotifyStore } from "../../../stores/notifyStore";
import TranslationList from "src/modules/translation/components/TranslationList/TranslationList.vue";
import { useLanguageStore } from "../../../stores/languageStore";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { LanguageStore } from "src/modules/language/store/LanguageStore";

export default defineComponent({
  name: "TranslationPage",
  components: {
    TranslationList,
  },
  setup() {
    const translationStore = useTranslationStore();
    const languageStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    return {
      translationStore: translationStore.translationStore as TranslationStore,
      languageStore: languageStore.languageStore as LanguageStore,
      notifyStore,
    };
  },
  methods: {
    success(msg: string) {
      this.notifyStore.setNotify({
        position: "top",
        type: "positive",
        message: msg,
      });
    },
  },
});
</script>
