/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, reactive, watch } from "vue";
import NsLtInscriptionAdminEditor from "../newsletter-inscription-editor/newsletter-inscription-editor.component.vue";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { getNewsletterInscriptionListSchema } from "./newsletter-inscriptions.schema";
import { translations } from "src/models/translations/newsletter";
import { NewsletterInscriptionService } from "src/services/Newsletter/NwLtInscriptionService";
import { useNotifyStore } from "src/stores/notifyStore";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import WGTable from "src/modules/core/components/Table/Table.vue";
import {
  AGVNewsletterInscriptionModel,
  AGVNewsletterInscriptionStatusEnum,
} from "src/models/Newsletter";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/modules/core/components/BaseComponents";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { AgvNewsletterInscriptionResponse } from "src/graphql-types";

export default defineComponent({
  name: "NsLtInscriptionAdminComponent",
  components: {
    WGTable,
    NsLtInscriptionAdminEditor,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const inscriptionSelected: AgvNewsletterInscriptionResponse =
      {} as AgvNewsletterInscriptionResponse;
    const fnAction = (row?: AgvNewsletterInscriptionResponse) => {
      this.showInscriptionDetails(
        row ||
          <AgvNewsletterInscriptionResponse>{
            email: "",
            id: 0,
            status: AGVNewsletterInscriptionStatusEnum.Waiting,
          }
      );
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
      {
        icon: "send",
        tooltip: transBase.SEND,
        fnAction: (row: AgvNewsletterInscriptionResponse) =>
          this.sendMessage(row),
      },
    ];

    const leftBtns: ITableLeftButton[] = [
      {
        label: transBase.ADD,
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () => fnAction(),
      },
      {
        label: translations.INSC_SYNC,
        icon: "sync",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () => {
          this.zyncInscriptions();
        },
      },
    ];
    const schema = getNewsletterInscriptionListSchema(
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
    const inscriptions: AgvNewsletterInscriptionResponse[] = [];

    const filterObj = reactive({
      email: "",
      status: "",
    });

    watch(
      () => [filterObj],
      () => {
        this.loadData();
      },
      {
        deep: true,
      }
    );

    const statusOptions = Object.values(AGVNewsletterInscriptionStatusEnum);

    return {
      filterObj: filterObj,
      inscriptionsCount: 0,
      inscriptions,
      pagination,
      loading: false,
      componentHeight,
      inscriptionSelected,
      fnAction,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      transBase,
      openDialog: false,
      statusOptions,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
      newsletterService: new NewsletterInscriptionService(),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const appContentStore = useAppContentStore();

    return {
      notifyStore,
      appStatusStore,
      appContentStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async loadData() {
      const result = await this.newsletterService.getNewsletterInscriptionsPage(
        {
          skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
          take: this.pagination.rowsPerPage,
          descending: this.pagination.descending,
          sortBy: this.pagination.sortBy || "",
          filter: this.filterObj,
        }
      );
      this.inscriptions = result.inscriptions;
      this.inscriptionsCount = result.count;
      this.pagination.rowsNumber = result.count;
    },
    zyncInscriptions() {
      this.newsletterService
        .zyncNewsletterInscriptions()
        .then((result: boolean) => {
          if (result) {
            this.showSendMsgConfirmDialog(
              [],
              this.getLabel(this.translations.INSC_RESEND_ALL_CONFIRMATION)
            );
            this.loadData();
          }
        });
    },
    showSendMsgConfirmDialog(emails: string[], message: string) {
      const quasar = (this as any).$q;
      quasar
        .dialog({
          title: this.getLabel(this.transBase.CONFIRM),
          message: message,
          style: "width: 100%",
          persistent: true,
          focus: "cancel",
          ok: {
            color: "primary",
            label: this.getLabel(transBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabel(transBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          this.loading = true;
          if (
            await this.newsletterService.sendNewsletterInscriptionMessage(
              emails
            )
          ) {
            this.notifyStore.setNotify({
              message: this.getLabel(this.translations.INSC_SEND_EMAIL_SUCCESS),
              type: "positive",
              position: "top",
            });
          } else {
            this.notifyStore.setNotify({
              message: this.getLabel(this.translations.INSC_SEND_EMAIL_FAIL),
              type: "negative",
              position: "top",
            });
          }

          this.loading = false;
        });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
    showInscriptionDetails(inscription: AgvNewsletterInscriptionResponse) {
      this.inscriptionSelected = { ...inscription };
      this.openDialog = true;
    },
    async onClose(status: boolean, email: string) {
      this.openDialog = false;
      if (status) {
        this.showSendMsgConfirmDialog(
          [email],
          this.getLabel(this.translations.INSC_RESEND_CONFIRMATION)
        );
        await this.loadData();
      }
    },

    async sendMessage(inscription: AGVNewsletterInscriptionModel) {
      this.showSendMsgConfirmDialog(
        [inscription.email],
        this.getLabel(this.translations.INSC_RESEND_CONFIRMATION)
      );
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
});
