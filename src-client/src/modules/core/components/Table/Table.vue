<template>
  <div>
    <q-table
      dense
      virtual-scroll
      :row-key="mySchema.code"
      :title="getLabel(title)"
      :rows="filtredData"
      :columns="columns"
      @row-click="selectCode"
      :style="{ height: `${height}px` }"
      :visible-columns="visibleColumns"
      class="my-sticky-header-table"
      :rows-per-page-options="rowsPerPage"
      :pagination="initialPagination"
      @update:pagination="getPage"
      @request="getByPagination"
    >
      <template v-slot:top>
        <div class="row col-12">
          <TableTitleHeader
            v-if="!mySchema.disableTitle"
            :title="getLabel(title)"
            :searchText="searchText"
            :schema="mySchema"
            :columns="columns"
            :data="data"
            :enableFilter="enableFilter"
            @changeColumnSelected="changeColumnSelected"
            @enableFilterChange="changeEnableFilter"
            class="col-12 fit"
          />
          <slot name="subtitle"></slot>
        </div>
      </template>

      <template v-slot:header-cell="props">
        <q-th
          :props="props"
          :style="{
            'min-width': props.col.width + 'px',
            width: props.col.width + 'px',
          }"
        >
          <div
            v-if="
              mySchema.searchStrategy &&
              mySchema.searchStrategy.type == 'header'
            "
            class="column"
          >
            <div>{{ getLabel(props.col.label) }}</div>
            <div
              v-if="props.col.filterable && enableFilter"
              class="row justify-between items-center"
            >
              <q-input
                v-if="props.col.filterable"
                v-model="filters[props.col.name]"
                dense
                outlined
                autocomplete="new-password"
                @keyup="onSearchInput(props.col.name)"
                @click.stop=""
              >
                <template v-slot:append>
                  <q-icon
                    v-if="!!filters[props.col.name]"
                    name="close"
                    @click="() => onClenaFilter(props.col.name)"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
            <div
              v-if="!props.col.filterable && enableFilter"
              style="min-height: 22px"
            />
          </div>
          <div
            v-if="
              !mySchema.searchStrategy ||
              mySchema.searchStrategy.type != 'header'
            "
            class="column"
          >
            <div>{{ getLabel(props.col.label) }}</div>
          </div>
        </q-th>
      </template>
      <template v-slot:body-cell="props">
        <TableColumns
          :schema="mySchema"
          :props="props"
          @rowSelect="onRowSelect"
          @dbclick="onDblClick"
        />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TableColumns from "./TableColumns.vue";
import TableTitleHeader from "./TableTitleHeader.vue";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import {
  ITableColumn,
  ITableData,
  ITablePagination,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "WGTable",
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Array as PropType<ITableData[] | any[]>,
      default: [],
    },
    countData: {
      type: Number,
      default: 0,
    },
    schema: {
      type: Object as PropType<ITableSchema>,
      default: { schema: {}, title: "", code: "id" },
    },
    height: {
      type: Number,
      default: 300,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  components: {
    TableColumns,
    TableTitleHeader,
  },
  data() {
    const mySchema: ITableSchema = { schema: {}, title: "" };
    const columns: ITableColumn[] = [];
    const visibleColumns: string[] = [];
    const filtredData: ITableData[] = [];
    const inputSequence: string[] = [];
    const filters: { [key: string]: string } = {};
    const initialPagination: ITablePagination = {
      rowsPerPage: this.schema.rowsPerPageDefault || this.data.length,
      descending: false,
      page: this.page || 1,
      sortBy: "",
    };
    if (this.countData && this.countData !== this.data.length) {
      initialPagination.rowsNumber = this.countData;
    }

    return {
      mySchema,
      columns,
      inputSequence,
      visibleColumns,
      filters,
      filtredData,
      apiURL: "",
      searchText: "",
      enableFilter: false,
      tranBase,
      initialPagination,
    };
  },
  methods: {
    changeEnableFilter(enableFilter: boolean) {
      this.enableFilter = enableFilter;
    },
    setFromSchema() {
      this.mySchema = this.schema;
      this.apiURL = this.mySchema.apiURL as string;
      this.enableFilter =
        this.mySchema.searchStrategy && this.mySchema.searchStrategy.visible
          ? this.mySchema.searchStrategy.visible
          : false;
      this.columns = [];
      this.visibleColumns = [];
      for (let item in this.mySchema.schema) {
        const i = this.mySchema.schema[item];
        this.columns.push(i);
        if (i.visible) this.visibleColumns.push(i.name);
      }
    },
    selectCode(e: Event, row: ITableData) {
      this.$emit("selectCode", row);
    },
    buttonClick(clickFunction: string, row?: ITableData) {
      console.log("Click on button ", clickFunction, " on row ", row);

      this.$emit("buttonClick", {
        clickFunction: clickFunction,
        row: row,
      });
    },
    changeColumnSelected(visibleColumns: string[]) {
      this.visibleColumns = visibleColumns;
    },
    onRowSelect(row: any) {
      this.$emit("rowSelect", row);
    },
    onDblClick(row: any) {
      if (this.mySchema.rowDblClick) this.mySchema.rowDblClick(row);
    },
    onClenaFilter(colName: string) {
      this.filters[colName] = "";
      this.onSearchInput(colName);
    },
    onSearchInput(colName?: string) {
      if (colName) {
        if (this.inputSequence.indexOf(colName) == -1) {
          this.inputSequence.push(colName);
        }
        if (!this.filters[colName]) {
          this.inputSequence.splice(this.inputSequence.indexOf(colName), 1);
        }
      }

      let tmpData: ITableData[] = this.data.map((item) => ({ ...item }));
      this.searchText = "";
      const queryStr: string[] = [];
      for (let i = 0; i < this.inputSequence.length; i++) {
        const colName = this.inputSequence[i];
        const inputValue = this.filters[colName];
        const column = this.mySchema.schema[colName];
        queryStr.push(
          `${this.getLabel(column.label)} ${this.getLabel(
            this.tranBase.CONTAIN,
            "contain"
          )} <${inputValue}>`
        );
        tmpData = tmpData.filter((v) => {
          let c;
          if (typeof column.field == "string") {
            c = v[column.field];
          } else if (typeof column.field == "function") {
            c = column.field(v);
          }
          if (c && typeof c == "string") {
            c = c.toLowerCase();
          } else {
            c = c.toString().toLowerCase();
          }
          if (c.indexOf(inputValue.toLowerCase()) != -1) return true;
          return false;
        });
      }
      this.searchText = queryStr.join(
        ` ${this.getLabel(this.tranBase.AND, "and")} `
      );
      this.filtredData = tmpData;
    },
    getLabel(name: string, defaultValue?: string) {
      if (this.mySchema.translationStore) {
        return this.mySchema.translationStore.getTranslation(name);
      }
      return defaultValue || name;
    },
    getPage(pagination: any) {
      this.initialPagination = pagination;
      this.$emit("getPagination", pagination);
    },
    getByPagination(objPagination: any) {
      this.getPage(objPagination.pagination);
    },
  },
  computed: {
    rowsPerPage(): number[] {
      return this.schema && this.schema.rowsPerPage
        ? this.schema.rowsPerPage
        : [0];
    },
  },
  emits: ["selectCode", "buttonClick", "rowSelect", "getPagination"],
  mounted() {
    if (this.schema) {
      this.setFromSchema();
      this.filtredData = this.data;
    }
  },
  watch: {
    data() {
      this.onSearchInput();
    },
    schema() {
      this.setFromSchema();
    },
    countData() {
      this.initialPagination.rowsNumber = this.countData;
    },
    filtredData() {
      this.initialPagination.rowsPerPage =
        this.schema.rowsPerPageDefault || this.filtredData.length;
    },
  },
});
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */

  .q-table__top
    border-bottom: 1px solid #ccc

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
    .q-table__sort-icon--left
      position: absolute
      top: 4px
      right: 10px
    .q-table__sort-icon--right
      position: absolute
      top: 4px
      left: 8px
    .q-table__sort-icon--center
      position: absolute
      top: 4px
      right: 10px
      top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  .orion-header-input
    width: 100%
    border: 1px solid rgba(0,0,0,.1)
    &:focus
      outline: 1px solid $primary
</style>
