<template>
  <div class="row justify-center">
    <PollComponent
      class="col-12 col-md-10"
      :pollData="appContentStore.pollDataObj"
      v-if="showPage()"
      @onClose="closePage"
    />
  </div>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import { useAppContentStore } from "../stores/appContentStore";
import PollComponent from "src/modules/agv/components/PollComponent/PollComponent.vue";

export default defineComponent({
  name: "PollDataPage",
  components: {
    PollComponent,
  },
  setup() {
    const appContentStore = useAppContentStore();
    return {
      appContentStore,
    };
  },
  data() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
  methods: {
    closePage() {
      window.close();
    },
    showPage() {
      return (
        this.appContentStore.pollDataObj.header &&
        this.appContentStore.pollDataObj.header.title
      );
    },
  },
  async mounted() {
    this.seoComponent.setSeoData({
      title: "Formulario",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina del formulario.",
      },
    } as unknown as ISeoModel);
    await this.appContentStore.loadPollData();
  },
});
</script>
