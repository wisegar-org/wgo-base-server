<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="histories"
      :schema="schema"
      :height="componentHeight"
      :countData="historiesCount"
      @getPagination="getDataByConfig"
    />
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Table from "../../../core/components/Table/Table.vue";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "../../../core/components/BaseComponents";
import { historicTranslations as translations } from "@wisegar-org/wgo-base-models/build/historic/translations";
import Loader from "../../../core/components/Loader/Loader.vue";
import { getHistoricListSchema } from "./HistoricListSchema";
import { HistoricService } from "../../services/HistoricService";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { LanguageStore } from "../../../language/store/LanguageStore";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "TranslationList",
  components: {
    Table,
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

    const rowBtns: ITableRowButton[] = [];

    const leftBtns: ITableLeftButton[] = [];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getHistoricListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowsPerPage = (this as any).$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const pagination: ITablePagination = {
      descending: false,
      page: 1,
      rowsPerPage: schema.rowsPerPageDefault,
      sortBy: "",
    } as ITablePagination;
    const histories: any[] = [];
    return {
      historiesCount: 0,
      histories,
      pagination,
      filterObj: {
        entity: "",
        action: "",
        username: "",
      },
      loading: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async loadData() {
      const historyService = new HistoricService();
      const result = await historyService.getHistoricPage({
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: this.filterObj,
      });
      if (result && result.count) {
        this.historiesCount = result.count;
        this.histories = result.histories || [];
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
