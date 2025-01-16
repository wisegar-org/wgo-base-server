import { translations } from "src/models/translations/events";
import { AgvEventResponseModel } from "src/models/models";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export const getEventListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      id: {
        name: "id",
        label: translations.COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      title: {
        name: "title",
        label: translations.COLUMN_TITLE,
        field: "title",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 250,
      },
      type: {
        name: "type",
        label: translations.COLUMN_TYPE,
        field: "type",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      state: {
        name: "state",
        label: translations.COLUMN_STATE,
        field: "state",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      visible: {
        name: "visible",
        label: translations.COLUMN_VISIBLE,
        field: (row: AgvEventResponseModel) =>
          row.visible ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        type: "icon",
        width: 50,
        extra: {
          tooltip: translations.COLUMN_VISIBLE,
          color: "primary",
        },
      },
      enrollment: {
        name: "enrollment",
        label: translations.COLUMN_ENROLLMENT,
        field: (row: AgvEventResponseModel) =>
          row.enrollment ? "check_box" : "check_box_outline_blank",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        type: "icon",
        width: 50,
        extra: {
          tooltip: translations.COLUMN_ENROLLMENT,
          color: "primary",
        },
      },
      class: {
        name: "class",
        label: translations.COLUMN_CLASS,
        field: "class",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      inscriptions: {
        name: "inscriptions",
        label: translations.COLUMN_INSCRIPTIONS,
        field: "inscriptions",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 50,
      },
      commands: {
        name: "commands",
        label: "",
        field: "commands",
        sortable: false,
        visible: true,
        filterable: false,
        required: true,
        align: "right",
        type: "iconCommands",
        extra: rowButtons,
      },
    },
    code: "id",
    text: ["nome"],
    description: [],
    title: "Events",
    leftButtons: leftButtons,
    translationStore: transStore,
    disableCopyClipboard: true,
    disableExportCsv: true,
    disableExportExcel: true,
    disableFullscreen: true,
    disableSelectColumns: true,
    disableFilter: true,
    disableTitle: false,
    searchStrategy: {
      type: "header",
    },
  };
};
