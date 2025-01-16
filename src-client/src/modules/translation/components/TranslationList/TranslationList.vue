<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="tranStore.onlyTranslations"
      :schema="schema"
      :height="componentHeight"
    />
    <q-file
      @input="importTranslations"
      accept=".csv"
      :multiple="false"
      :ref="id_input"
      style="display: none"
    />
    <TranslationDialog
      :translation="selectedTranslation"
      :open="open"
      :tranStore="tranStore"
      :langStore="langStore"
      @close="closeDetails"
      @onSet="onSet"
    />
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Table from "../../../core/components/Table/Table.vue";
import { getTranslationListSchema } from "./TranslationListSchema";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "../../../core/components/BaseComponents";
import TranslationDialog from "./TranslationDialog.vue";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { transTranslations as translations } from "@wisegar-org/wgo-base-models/build/translation/translations";
import { saveAs } from "file-saver";
import Loader from "../../../core/components/Loader/Loader.vue";
import { TranslationStore } from "../../store/TranslationStore";
import { LanguageStore } from "../../../language/store/LanguageStore";
import {
  ITableLeftButton,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { ITranslationModel } from "@wisegar-org/wgo-base-models/build/translation";

export default defineComponent({
  name: "TranslationList",
  components: {
    Table,
    TranslationDialog,
    Loader,
  },
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const id_input =
      "upload-button-" + Math.random().toString(36).substring(2, 10);

    const fnAction = (row: any) => {
      (this as any).showDetails(row);
      console.log("click on", row);
    };
    const deleteTranslation = (row: any) => {
      (this as any).deleteTranslation(row);
    };
    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
      {
        icon: "delete",
        tooltip: transBase.DELETE,
        fnAction: deleteTranslation,
      },
    ];
    const exportTranslations = async () => {
      const result = await this.tranStore.exportTranslations({
        languagesId: [this.langStore.selectedLang.id],
      });
      if (result) {
        const fileUrl = `data:${"text/plain"};base64,${result || ""}`;
        saveAs(fileUrl, "translations.csv");
      }
    };
    const importTranslations = () => {
      (this.$refs[id_input] as any).pickFiles();
    };
    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () =>
          fnAction({
            key: "",
            value: "",
            languageId: this.langStore.selectedLang.id,
          }),
      },
      {
        label: "",
        icon: "cloud_upload",
        color: "primary",
        tooltip: transBase.IMPORT,
        fnAction: importTranslations,
      },
      {
        label: "",
        icon: "cloud_download",
        color: "primary",
        tooltip: transBase.EXPORT,
        fnAction: exportTranslations,
      },
    ];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getTranslationListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = (this as any).$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    return {
      loading: false,
      selectedTranslation: {} as ITranslationModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      id_input,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async loadTranslations() {
      this.tranStore;
    },
    showDetails(row: ITranslationModel) {
      this.selectedTranslation = row;
      this.open = true;
    },
    deleteTranslation(row: ITranslationModel) {
      (this as any).$q
        .dialog({
          title: this.getLabel(transBase.CONFIRM),
          message: this.getLabel(translations.DELETE_MSG),
          style: "width: 100%",
          persistent: true,
          focus: "cancel",
          ok: {
            color: "primary",
            label: this.getLabel(transBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabel(transBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          const result = await this.tranStore.deleteTranslation({
            key: row.key,
          });
          if (result) this.$emit("success", translations.DELETE_SUCCESS);
        });
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onSet() {
      this.$emit("success", this.getLabel(this.translations.SET_SUCCESS));
    },
    async importTranslations(file: any) {
      const formData = {
        file: file.target.files[0],
      };
      this.loading = true;
      const result = await this.tranStore.importTranslations(formData);
      this.loading = false;
      if (result)
        this.$emit("success", this.getLabel(this.translations.IMPORT_SUCCESS));
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    // await this.tranStore.loadAllTranslation();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
