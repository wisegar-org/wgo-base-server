<template>
  <div class="column fit">
    <q-item class="q-pa-none">
      <q-item-section top class="self-center">
        <div class="text-h6 text-left">
          {{ title }}
        </div>
      </q-item-section>
      <q-item-section top side class="self-center">
        <div class="row items-center">
          <TableTopButtons :schema="schema" />
          <TableExportClipboardButton
            :columns="columns"
            :data="data"
            :schema="schema"
          />
          <TableExportCsvButton
            :columns="columns"
            :data="data"
            :schema="schema"
          />
          <TableExportExcelButton
            :columns="columns"
            :data="data"
            :schema="schema"
          />
          <TableSelectColumnsButton
            :columns="columns"
            :schema="schema"
            @changeColumnSelected="changeColumnSelected"
          />
          <!-- Buttons -->
          <q-btn
            v-if="!schema.disableFilter"
            flat
            round
            color="primary"
            @click="changeEnableFilter"
            icon="filter_alt"
          >
            <q-tooltip>{{ getLabel("WGO_SHOW_FILTERS_TL") }}</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
    <div class="text-weight-medium">{{ searchText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TableTopButtons from "./Buttons/TableTopButtons.vue";
import TableSelectColumnsButton from "./Buttons/TableSelectColumnsButton.vue";
import TableExportClipboardButton from "./Buttons/TableExportClipboardButton.vue";
import TableExportExcelButton from "./Buttons/TableExportExcelButton.vue";
import TableExportCsvButton from "./Buttons/TableExportCsvButton.vue";
import {
  ITableColumn,
  ITableData,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "TableTitleHeader",
  props: {
    title: String,
    searchText: String,
    enableFilter: Boolean,
    schema: {
      type: Object as PropType<ITableSchema>,
      default: { schema: {}, title: "", code: "id" },
    },
    columns: {
      type: Array as PropType<ITableColumn[]>,
      default: [],
    },
    data: {
      type: Array as PropType<ITableData[]>,
      default: [],
    },
  },
  components: {
    TableTopButtons,
    TableSelectColumnsButton,
    TableExportClipboardButton,
    TableExportExcelButton,
    TableExportCsvButton,
  },
  methods: {
    changeColumnSelected(visibleColumns: string[]) {
      this.$emit("changeColumnSelected", visibleColumns);
    },
    changeEnableFilter() {
      this.$emit("enableFilterChange", !this.enableFilter);
    },
    getLabel(name: string) {
      if (name && this.schema?.translationStore) {
        return this.schema.translationStore.getTranslation(name);
      }

      return name;
    },
  },
  emits: ["changeColumnSelected", "enableFilterChange"],
});
</script>
