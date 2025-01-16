import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { EventService } from "src/modules/agv/services/EventService/EventService";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";
import { defineComponent } from "vue";
import TextVue from "src/modules/core/components/Text/Text.vue";
import { Router } from "vue-router";
import BannerComponent from "src/components/BannerComponent/BannerComponent.vue";
import ItemCard from "src/components/ItemCard/ItemCard.vue";
import { pollDataPageRoute } from "../../routes/pollDataPageRoute";
import { pollRulesPageRoute } from "../../routes/pollRulesPageRoute";
import { eventiItemDetailsPageRoute } from "../../routes/eventiItemDetailsPageRoute";
import { corsiItemDetailsPageRoute } from "../../routes/corsiItemDetailsPageRoute";
import { RouteService } from "src/modules/core/services/RouteService";

export default defineComponent({
  name: "HomeComponent",
  components: {
    TextVue,
    ItemCard,
    BannerComponent,
  },
  data() {
    const corso: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const evento: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const routerService = new RouteService(this.$router as unknown as Router);
    return {
      corso,
      evento,
      loadingEvents: false,
      routerService,
      pullPath: pollDataPageRoute.path,
      rulesPath: pollRulesPageRoute.path,
    };
  },
  setup() {
    const appContentStore = useAppContentStore();
    return {
      appContentStore,
    };
  },
  methods: {
    async onItemClick(item: IItem, isEvent: boolean) {
      const location = {
        path: isEvent
          ? eventiItemDetailsPageRoute.path
          : corsiItemDetailsPageRoute.path,
        query: {
          id: item.id.toString(),
        },
      };
      this.routerService.goTo(location.path, location.query);
      // await this.$router.push(location);
    },
  },
  async created() {
    await this.appContentStore.loadPollData();

    this.loadingEvents = true;
    const eventService = new EventService();
    const nextsEvents = await eventService.getNextEvents();
    this.corso = nextsEvents.corso as AgvEventResponseModel;
    this.evento = nextsEvents.evento as AgvEventResponseModel;
    this.loadingEvents = false;
  },
});
