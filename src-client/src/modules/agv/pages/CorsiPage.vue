<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <EventListComponent
        :eventType="eventType"
        :detailPath="detailPath"
        title="WGO_CORSI"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventListComponent from "src/modules/agv/components/EventListComponent/EventListComponent.vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import { ITemType } from "src/models/Item";
import { corsiItemDetailsPageRoute } from "../routes/corsiItemDetailsPageRoute";

export default defineComponent({
  name: "CorsiPage",
  components: {
    EventListComponent,
  },
  setup() {
    return {
      eventType: ITemType.Course,
      detailPath: corsiItemDetailsPageRoute.path,
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
      title: "Corsi",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina di corsi.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
