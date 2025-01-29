<template>
  <q-btn
    v-if="!schema.disableExportCsv"
    flat
    round
    color="primary"
    @click="exportCSV"
    icon="las la-file-csv"
  >
    <q-tooltip>{{ getLabel(translations.EXPORT_CSV_TL) }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UtilService } from "../../../../../services/UtilService";
import { saveAs } from "file-saver";
import { translations } from "@wisegar-org/wgo-base-models/build/core";
import {
  ITableColumn,
  ITableData,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "TableExportCsvButton",
  props: {
    data: {
      type: Array as PropType<ITableData[]>,
      default: [],
    },
    columns: {
      type: Array as PropType<ITableColumn[]>,
      default: [],
    },
    schema: {
      type: Object as PropType<ITableSchema>,
      require: true,
    },
  },
  setup() {
    return {
      translations: translations,
    };
  },
  methods: {
    async exportCSV() {
      const fileName = "export.csv";
      const columns = this.columns.filter((col) => col.type !== "iconCommands");
      let text =
        columns
          .map((c: ITableColumn) => {
            return c.label;
          })
          .join(",") + ",\n";

      const rows = this.data.map((d: ITableData) => {
        const row = columns
          .map((c: ITableColumn) => {
            let value;
            if (typeof c.field == "function") {
              value = c.field(d);
            } else {
              value = d[c.field];
            }
            if (c.type === "date" && c.extra)
              value = value
                ? UtilService.parseDate(value, c.extra as string)
                : "";
            return value;
          })
          .join(",");
        const regexp = /\n/gi;
        return row.replace(regexp, "/");
      });
      text += rows.join(",\n");

      saveAs(new Blob([text]), fileName);
    },
    getLabel(name: string) {
      if (name && this.schema?.translationStore) {
        return this.schema.translationStore.getTranslation(name);
      }

      return "Export to CSV";
    },
  },
});
</script>
