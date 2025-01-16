<template>
  <Dialog
    :open="open"
    icon="language"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveLanguage" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="lang.code"
              required
              :label="getLabel(translations.COLUMN_CODE)"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox
              class="fit"
              v-model="lang.enabled"
              :label="getLabel(translations.COLUMN_ENABLED)"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox
              class="fit"
              v-model="lang.default"
              :label="getLabel(translations.COLUMN_DEFAULT)"
            />
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-py-md">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="getLabel(tranBase.SAVE)"
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
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { languageTranslations as translations } from "@wisegar-org/wgo-base-models/build/language/translations";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";
import { LanguageStore } from "../../store/LanguageStore";
import { TranslationStore } from "../../../translation/store/TranslationStore";

export default defineComponent({
  name: "LanguageDialog",
  props: {
    open: { type: Boolean, default: false },
    language: {
      type: Object as PropType<ILanguageModel>,
      default: {} as ILanguageModel,
    },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      lang: {} as ILanguageModel,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
      tranBase,
    };
  },
  methods: {
    async saveLanguage() {
      const input = {
        code: this.lang.code,
        enabled: this.lang.enabled,
        default: this.lang.default,
      };
      const edit = !!this.language.id;
      const result = edit
        ? await this.langStore.editLanguage({ ...input, id: this.lang.id })
        : await this.langStore.addLanguage(input);
      if (result) {
        this.$emit(
          "success",
          edit
            ? this.getLabel(this.translations.EDIT_SUCCESS)
            : this.getLabel(this.translations.ADD_SUCCESS)
        );
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
  emits: ["close", "success"],
  watch: {
    language() {
      this.lang = { ...this.language };
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
