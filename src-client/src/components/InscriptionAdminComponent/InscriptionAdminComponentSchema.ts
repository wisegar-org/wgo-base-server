import { translations } from "src/models/translations/inscriptions";
import { AgvInscriptionResponseModel } from "src/models/models";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import {
  ITableLeftButton,
  ITableRowButton,
  ITableSchema,
} from "@wisegar-org/wgo-base-models/build/core/Table";

export const getInscriptionListSchema = (
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
      name: {
        name: "name",
        label: translations.COLUMN_NAME,
        field: (row: AgvInscriptionResponseModel) =>
          `${row.nome} ${row.cognome}`,
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 250,
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
      email: {
        name: "email",
        label: translations.COLUMN_EMAIL,
        field: "email",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      phone: {
        name: "phone",
        label: translations.COLUMN_PHONE,
        field: "phone",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 100,
      },
      eventTitle: {
        name: "eventTitle",
        label: translations.COLUMN_EVENT_TITLE,
        field: "eventTitle",
        sortable: true,
        visible: true,
        filterable: true,
        align: "left",
        width: 250,
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
    title: "Inscriptions",
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
