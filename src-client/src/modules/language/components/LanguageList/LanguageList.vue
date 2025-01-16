<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="langStore.allLangs"
      :schema="schema"
      :height="componentHeight"
    />
    <LanguageDialog
      :language="selectedLang"
      :open="open"
      :langStore="langStore"
      :tranStore="tranStore"
      @close="closeDetails"
      @success="onSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Table from "../../../core/components/Table/Table.vue";
import { getLanguageListSchema } from "./LanguageListSchema";
import { BaseResizeComponent } from "../../../core/components/BaseComponents";
import LanguageDialog from "./LanguageDialog.vue";
import { languageTranslations as translations } from "@wisegar-org/wgo-base-models/build/language/translations";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { LanguageStore } from "../../store/LanguageStore";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";

export default defineComponent({
  name: "LanguageList",
  components: {
    Table,
    LanguageDialog,
  },
  props: {
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row: any) => {
      (this as any).showDetails(row);
      console.log("click on", row);
    };
    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        fnAction,
        tooltip: tranBase.EDIT,
      },
    ];
    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        tooltip: tranBase.ADD,
        fnAction: () => fnAction({ code: "", enabled: false, default: false }),
      },
    ];
    const schema = getLanguageListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = (this as any).$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = 0;
    return {
      selectedLang: {} as ILanguageModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations,
    };
  },
  methods: {
    async loadLanguages() {
      await this.langStore.loadAllLanguage();
    },
    showDetails(row: ILanguageModel) {
      this.selectedLang = row;
      this.open = true;
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async onSuccess(msg: string) {
      await this.loadLanguages();
      this.$emit("success", msg);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadLanguages();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
