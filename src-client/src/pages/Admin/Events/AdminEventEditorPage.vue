<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <EventAdminEditor
        v-if="eventObj.type"
        :event="eventObj"
        @success="onSuccess"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { AgvEventResponseModel } from "../../../models/models";
import { defineComponent } from "vue";
import EventAdminEditor from "../../../components/EventAdminEditor/EventAdminEditor.vue";
import { UtilService } from "../../../services/UtilService";
import { useAppStatusStore } from "../../../stores/appStatusStore";
import { RouteService } from "../../../services/RouteService";
import { Router } from "vue-router";
import { EventService } from "../../../modules/agv/services/EventService/EventService";

export default defineComponent({
  name: "AdminEventEditorPage",
  components: {
    EventAdminEditor,
  },
  props: {
    event: { type: Number, default: 0 },
    page: { type: Number, default: 0 },
  },
  data() {
    const classDefault = UtilService.getDefaultClass();
    const eventObj: AgvEventResponseModel = {} as AgvEventResponseModel;
    const eventService = new EventService();
    const routeService = new RouteService(this.$router as unknown as Router);
    return {
      classDefault,
      eventObj,
      eventService,
      routeService,
    };
  },
  setup() {
    const appStatusStore = useAppStatusStore();

    return {
      appStatusStore,
    };
  },
  methods: {
    async loadEvent() {
      if (this.event) {
        const result = await this.eventService.getEvent(this.event);
        if (result) this.eventObj = { ...result };
      } else {
        this.eventObj = {
          id: 0,
          title: "",
          description: "",
          shortDescription: "",
          class: this.classDefault,
          type: "Evento",
          startDate: undefined,
          endDate: undefined,
          visible: true,
          enrollment: true,
          state: "In sospeso",
          inscriptions: 0,
          imgList: [],
          imgTitle: undefined,
        } as AgvEventResponseModel;
      }
    },
    onSuccess() {
      this.routeService.goTo(AGVEventsAdminPaths.events.path, {
        page: this.event ? this.page : 1,
      });
    },
  },
  async created() {
    this.appStatusStore.setLoading(true);
    await this.loadEvent();
    this.appStatusStore.setLoading(false);
  },
});
</script>
