import { BaseTranslateComponent } from "src/modules/core/components/BaseComponents";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { useTranslationStore } from "src/stores/translationStore";
import { defineComponent, reactive, ref, watch } from "vue";
import { EventService } from "src/modules/agv/services/EventService/EventService";
import ItemListComponent from "../ItemListComponent/ItemListComponent.vue";

export default defineComponent({
  name: "EventListComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    detailPath: {
      type: String,
      required: true,
    },
  },
  components: {
    ItemListComponent,
  },
  data() {
    const items: AgvEventResponseModel[] = [];
    const textSearch = ref("");
    const filterClass = ref("");
    const options: string[] = [];
    const loading = false;
    const pagination = reactive({
      rowsPerPage: 5,
      descending: true,
      page: 1,
      sortBy: "startDate",
      rowsNumber: 0,
      max: 1,
    });

    watch(
      pagination,
      () => {
        this.loadData();
      },
      { deep: true }
    );

    const { getLabel } = new BaseTranslateComponent();

    return {
      items,
      textSearch,
      filterClass,
      options,
      loading,
      pagination,
      eventService: new EventService(),
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    const tranStore = useTranslationStore();

    return {
      tranStore: tranStore.translationStore,
    };
  },
  methods: {
    async loadData() {
      if (!this.filterClass) return true;
      this.loading = true;
      const arg = {
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: {
          title: this.textSearch,
          class: this.filterClass !== "Tutte" ? this.filterClass : "",
          visible: "true",
          type: this.eventType,
        },
      };
      const result = await this.eventService.allEventsByPage(arg);
      this.pagination.rowsNumber = result.count;
      const pages = Math.floor(result.count / this.pagination.rowsPerPage);
      this.pagination.max =
        result.count % this.pagination.rowsPerPage === 0 ? pages : pages + 1;
      this.items = result.events;
      this.loading = false;
    },
    async onItemClick(item: IItem) {
      const location = {
        path: this.detailPath,
        query: {
          id: item.id.toString(),
        },
      };
      await this.$router.push(location);
    },
  },
  async created() {
    this.loading = true;
    await this.loadData();
    const options: string[] = await this.eventService.allEventClass(
      this.eventType
    );
    this.options = ["Tutte"].concat(options);
    this.filterClass = this.options[this.options.length - 1];
  },
  watch: {
    textSearch() {
      this.loadData();
    },
    filterClass() {
      this.loadData();
    },
  },
});
