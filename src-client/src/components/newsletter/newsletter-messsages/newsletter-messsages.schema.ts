import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { translations } from "src/models/translations/newsletter";

export const getNewsletterMessageListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      id: {
        name: "id",
        label: translations.MSG_COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      title: {
        name: "title",
        label: translations.MSG_COLUMN_TITLE,
        field: "title",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 250,
      },
      status: {
        name: "status",
        label: translations.MSG_COLUMN_STATUS,
        field: "status",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
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
    title: "Newsletter Message",
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
