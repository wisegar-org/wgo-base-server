<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <HomeComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import HomeComponent from "src/modules/agv/components/HomeComponent/HomeComponent.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    HomeComponent,
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
      title: "Home",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina iniziale.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
