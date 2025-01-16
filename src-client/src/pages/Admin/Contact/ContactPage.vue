<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <ContactEditor
        :tranStore="tranStore"
        :langStore="langStore"
        @showMessage="showMessage"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactEditor from "src/modules/contact/components/ContactEditor/ContactEditor.vue";
import { useTranslationStore } from "../../../stores/translationStore";
import { useLanguageStore } from "../../../stores/languageStore";
import { useNotifyStore } from "../../../stores/notifyStore";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { LanguageStore } from "src/modules/language/store/LanguageStore";

export default defineComponent({
  name: "AdminContactPage",
  components: {
    ContactEditor,
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();

    return {
      tranStore: tranStore.translationStore as unknown as TranslationStore,
      langStore: langStore.languageStore as unknown as LanguageStore,
      notifyStore,
    };
  },
  methods: {
    showMessage(status: boolean, msg: string) {
      this.notifyStore.setNotify({
        position: "top",
        message: msg,
        type: status ? "positive" : "negative",
      });
    },
  },
});
</script>
