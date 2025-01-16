<template>
  <q-btn
    v-if="!schema.disableExportExcel"
    flat
    round
    color="primary"
    @click="exportExcel"
    icon="las la-file-excel"
  >
    <q-tooltip> {{ getLabel(translations.EXPORT_EXCEL_TL) }} </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UtilService } from "../../../services/UtilService";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { translations } from "@wisegar-org/wgo-base-models/build/core";
import {
  ITableColumn,
  ITableData,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "TableExportExcelButton",
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
    async exportExcel() {
      const fileName = "export.xlsx";
      const workbook = new ExcelJS.Workbook();
      // const sheet = workbook.addWorksheet("Table");
      const worksheet = workbook.getWorksheet(1);
      if (!workbook) return;

      worksheet?.addRow(
        this.columns.map((c: ITableColumn) => {
          return c.label;
        })
      );

      this.data.map((d: ITableData) => {
        worksheet?.addRow(
          this.columns.map((c: ITableColumn) => {
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
        );
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), fileName);
    },
    getLabel(name: string) {
      if (name && this.schema?.translationStore) {
        return this.schema.translationStore.getTranslation(name);
      }

      return "Export to Excel";
    },
  },
});
</script>
