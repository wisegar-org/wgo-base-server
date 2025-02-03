import { translations } from "src/models/translations/newsletter";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export const getNewsletterInscriptionListSchema = (
  transStore: TranslationStore,
  leftButtons?: ITableLeftButton[],
  rowButtons?: ITableRowButton[]
): ITableSchema => {
  return {
    schema: {
      id: {
        name: "id",
        label: translations.INSC_COLUMN_ID,
        field: "id",
        sortable: true,
        visible: false,
        filterable: true,
        align: "left",
        width: 100,
      },
      email: {
        name: "email",
        label: translations.INSC_COLUMN_EMAIL,
        field: "email",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 250,
      },
      status: {
        name: "status",
        label: translations.INSC_COLUMN_STATUS,
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
    title: "Newsletter Inscription",
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
