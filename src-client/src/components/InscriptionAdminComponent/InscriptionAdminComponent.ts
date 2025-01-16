/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgvInscriptionResponseModel } from "src/models/models";
import { defineComponent, reactive, watch } from "vue";
import { translations } from "../../models/translations/inscriptions";
import { getInscriptionListSchema } from "./InscriptionAdminComponentSchema";
import { InscriptionService } from "src/services/Inscription/InscriptionService";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import TableVue from "src/modules/core/components/Table/Table.vue";
import { EventClassOption } from "src/models/Events";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import InscriptionAdminDetails from "../InscriptionAdminDetails/InscriptionAdminDetails.vue";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/modules/core/components/BaseComponents";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "InscriptionAdminComponent",
  components: { TableVue, InscriptionAdminDetails },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row: AgvInscriptionResponseModel) => {
      this.showInscriptionDetails(row);
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: "info",
        tooltip: transBase.DETAILS,
        fnAction,
        fnShow: (row: AgvInscriptionResponseModel) => {
          return !!row.message;
        },
      },
      {
        icon: "assignment",
        tooltip: transBase.DETAILS,
        fnAction,
      },
    ];

    const leftBtns: ITableLeftButton[] = [];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getInscriptionListSchema(
      this.tranStore as unknown as TranslationStore,
      leftBtns,
      rowBtns
    );
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = (this.$q as any).platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const pagination: ITablePagination = {
      descending: false,
      page: 1,
      rowsPerPage: schema.rowsPerPageDefault,
      sortBy: "",
    } as ITablePagination;
    const inscriptions: AgvInscriptionResponseModel[] = [];

    const filterObj = reactive({
      email: "",
      eventTitle: "",
      eventClass: "",
      nome: "",
      phone: "",
      class: "",
    });
    const inscriptionSelected: AgvInscriptionResponseModel =
      {} as AgvInscriptionResponseModel;

    const eventClassOptions = EventClassOption;
    const classOptions: string[] = [];

    watch(
      () => [filterObj],
      () => {
        this.loadData();
      },
      {
        deep: true,
      }
    );

    return {
      filterObj: filterObj,
      inscriptionsCount: 0,
      inscriptions,
      pagination,
      loading: false,
      componentHeight,
      fnAction,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      openDialog: false,
      classOptions,
      eventClassOptions,
      inscriptionSelected,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const appContentStore = useAppContentStore();

    return {
      appStatusStore,
      appContentStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async loadData() {
      const inscriptionService = new InscriptionService();
      const result = await inscriptionService.allInscriptionsByPage({
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: this.filterObj,
      });
      if (result && result.inscriptions) {
        this.inscriptionsCount = result.count;
        this.inscriptions = result.inscriptions || [];
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
    showInscriptionDetails(inscription: AgvInscriptionResponseModel) {
      this.inscriptionSelected = { ...inscription };
      this.openDialog = true;
    },
    onClose() {
      this.openDialog = false;
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.appContentStore.loadPollData();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
