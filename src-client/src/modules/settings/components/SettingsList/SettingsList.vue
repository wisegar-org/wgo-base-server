<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="dataSettings"
      :schema="schema"
      :height="componentHeight"
    />
    <SettingsDialog
      :open="open"
      :stting="selectedSettings"
      :tranStore="tranStore"
      @close="closeDetails"
      @success="onSuccess"
    />
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Table from "../../../core/components/Table/Table.vue";
import Loader from "../../../core/components/Loader/Loader.vue";
import { getSettingsListSchema } from "./SettingsListSchema";
import { BaseResizeComponent } from "../../../core/components/BaseComponents";
import { settingsTranslations as translations } from "@wisegar-org/wgo-base-models/build/settings/translations";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { ISettingsModel } from "@wisegar-org/wgo-base-models/build/settings";
import { SettingsService } from "../../services/SettingsService";
import SettingsDialog from "./SettingsDialog.vue";
import {
  ITableLeftButton,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { TranslationStore } from "../../../translation/store/TranslationStore";

export default defineComponent({
  name: "SettingsList",
  components: {
    Table,
    Loader,
    SettingsDialog,
  },
  props: {
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
    const leftBtns: ITableLeftButton[] = [];
    const schema = getSettingsListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = (this as any).$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const dataSettings: ISettingsModel[] = [];
    return {
      selectedSettings: {} as ISettingsModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      dataSettings,
      schema: schema,
      translations,
      loading: false,
      settingsService: new SettingsService(),
    };
  },
  methods: {
    async loadSettings() {
      this.loading = true;
      this.dataSettings = await this.settingsService.getAllSettings();
      this.loading = false;
    },
    showDetails(row: ISettingsModel) {
      this.selectedSettings = row;
      this.open = true;
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onSuccess(newVal: string, msg: string) {
      this.dataSettings = this.dataSettings.map((setting) =>
        setting.key === this.selectedSettings.key &&
        setting.type_settings === this.selectedSettings.type_settings
          ? { ...setting, value: newVal }
          : setting
      );
      this.$emit("success", msg);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadSettings();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
