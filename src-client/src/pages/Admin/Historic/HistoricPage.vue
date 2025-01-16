<template>
  <HistoricList
    :langStore="langStore"
    :tranStore="tranStore"
    @success="onSuccess"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoricList from "src/modules/historic/components/HistoricList/HistoricList.vue";
import { useLanguageStore } from "../../../stores/languageStore";
import { useNotifyStore } from "../../../stores/notifyStore";
import { useTranslationStore } from "../../../stores/translationStore";
import { LanguageStore } from "src/modules/language/store/LanguageStore";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "LanguagePage",
  components: {
    HistoricList,
  },
  setup() {
    const languageStore = useLanguageStore();
    const translationStore = useTranslationStore();
    const notifyStore = useNotifyStore();
    return {
      langStore: languageStore.languageStore as LanguageStore,
      tranStore: translationStore.translationStore as TranslationStore,
      notifyStore,
    };
  },
  methods: {
    onSuccess(msg: string) {
      this.notifyStore.setNotify({
        position: "top",
        type: "positive",
        message: msg || "",
      });
    },
  },
});
</script>
