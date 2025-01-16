<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <ComitatoComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import ComitatoComponent from "src/modules/agv/components/ComitatoComponent/ComitatoComponent.vue";

export default defineComponent({
  name: "ComitatoPage",
  components: {
    ComitatoComponent,
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
      title: "Comitato",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina del comitato.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
