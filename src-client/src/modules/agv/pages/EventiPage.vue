<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <EventListComponent
        :eventType="eventType"
        :detailPath="detailPath"
        title="WGO_EVENTI"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import EventListComponent from "src/modules/agv/components/EventListComponent/EventListComponent.vue";
import { ITemType } from "src/models/Item";
import { eventiItemDetailsPageRoute } from "../routes/eventiItemDetailsPageRoute";

export default defineComponent({
  name: "CorsiPage",
  components: {
    EventListComponent,
  },
  setup() {
    return {
      eventType: ITemType.Event,
      detailPath: eventiItemDetailsPageRoute.path,
    };
  },
  data() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
  mounted() {
    this.seoComponent.setSeoData({
      title: "Eventi",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina eventi.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
