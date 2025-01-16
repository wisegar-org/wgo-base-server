import { defineComponent, PropType } from "vue";
import UploadImageDiv from "src/modules/storage/components/UploadImageDiv/UploadImageDiv.vue";
import GalleryImage from "src/modules/storage/components/GalleryImage/GalleryImage.vue";
import QCKEditor from "src/modules/core/components/CKEditor/QCKEditor.vue";
import {
  StringDictionary,
  translations as transBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { translations } from "src/models/translations/events";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { AgvEventInputModel, AgvEventResponseModel } from "src/models/models";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { EventService } from "src/modules/agv/services/EventService/EventService";
import {
  EventClassOption,
  EventStateOptions,
  EventTypeOptions,
} from "src/models/Events";
import { QPopupProxy } from "quasar";
import { apiSettings } from "src/api/ApiOptions";
import { IMediaResponse } from "@wisegar-org/wgo-base-models/build/storage";
import { UtilService } from "src/modules/core/services/UtilService";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";

export default defineComponent({
  name: "EventAdminEditor",
  components: {
    GalleryImage,
    UploadImageDiv,
    QCKEditor,
  },
  props: {
    event: { type: Object as PropType<AgvEventResponseModel>, required: true },
  },
  data() {
    const imgTitle: IMediaResponse = this.event.imgTitle || {};
    const imgList: IMediaResponse[] = this.event.imgList || [];
    const { getLabel } = new BaseTranslateComponent();
    const startDate = UtilService.parseDate(
      (this.event.startDate || new Date()).toString(),
      "DD/MM/YYYY"
    );
    const endDate = UtilService.parseDate(
      (this.event.endDate || new Date()).toString(),
      "DD/MM/YYYY"
    );
    const date: StringDictionary | string =
      startDate !== endDate
        ? {
            from: startDate,
            to: endDate,
          }
        : startDate;
    const urlApi = apiSettings.API_BASE;

    return {
      date,
      urlApi,
      imgTitle,
      imgList,
      transBase,
      translations,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();

    const typeOptions = EventTypeOptions;
    const stateOptions = EventStateOptions;
    const classOptions = EventClassOption;
    return {
      typeOptions,
      stateOptions,
      classOptions,
      tranStore: translationStore.translationStore as TranslationStore,
      appStatusStore,
      notifyStore,
    };
  },
  methods: {
    async updateProps() {
      this.appStatusStore.setLoading(true);
      const arg = <AgvEventInputModel>{
        class: this.event.class,
        description: this.event.description,
        enrollment: this.event.enrollment,
        id: this.event.id,
        state: this.event.state,
        title: this.event.title,
        type: this.event.type,
        visible: this.event.visible,
        shortDescription: this.event.shortDescription || "",
        imgTitle: this.imgTitle ? this.imgTitle.id : 0,
        imgList: this.imgList ? this.getImgListIds() : [],
      };
      if (this.date && typeof this.date === "string") {
        const date = this.getFormatServerDate(this.date);
        arg.startDate = date ? new Date(date) : undefined;
        arg.endDate = date ? new Date(date) : undefined;
      } else {
        const { from, to } = this.date as unknown as {
          from: string;
          to: string;
        };
        const startD = this.getFormatServerDate(from);
        arg.startDate = startD ? new Date(startD) : undefined;
        const endD = this.getFormatServerDate(to);
        arg.endDate = endD ? new Date(endD) : undefined;
      }
      const eventService = new EventService();
      const result = this.event.id
        ? await eventService.modifyEvent(arg)
        : await eventService.createEvent(arg);

      if (result) {
        this.notifyStore.setNotify({
          message: `Evento ${
            this.event.id ? "modificato" : "creato"
          } con successo`,
          type: "positive",
          position: "top",
        });
        this.$emit("success");
      }
      this.appStatusStore.setLoading(false);
    },
    setImageTitle(img: IMediaResponse) {
      this.imgTitle = img;
    },

    setListImg(imgs: IMediaResponse[]) {
      this.imgList = imgs;
    },
    closePopUp(popup: unknown) {
      (popup as QPopupProxy).hide();
    },
    getImgListIds() {
      return this.imgList.map((img) => img.id);
    },
    getDateStringValue() {
      if (typeof this.date === "string") {
        return this.date;
      } else {
        return `${(this.date as StringDictionary).from} - ${
          (this.date as StringDictionary).to
        }`;
      }
    },
    getFormatServerDate(value: string | undefined) {
      return value
        ? UtilService.parseDateFormFormat(value, "DD/MM/YYYY", "YYYY/MM/DD")
        : undefined;
    },
    isValid() {
      return !!this.event && !!this.event.title;
    },
  },
  watch: {
    event() {
      this.imgTitle = this.event.imgTitle || {};
      this.imgList = this.event.imgList || [];
      const startDate = UtilService.parseDate(
        (this.event.startDate || new Date()).toString(),
        "DD/MM/YYYY"
      );
      const endDate = UtilService.parseDate(
        (this.event.endDate || new Date()).toString(),
        "DD/MM/YYYY"
      );
      this.date =
        startDate !== endDate
          ? {
              from: startDate,
              to: endDate,
            }
          : startDate;
    },
  },
  emits: ["success"],
});
