<template>
  <div class="row justify-center">
    <q-card v-if="!!showPage()" class="my-card col-12 col-md-10" flat>
      <q-card-section q-pb-xl>
        <div class="row display-flex justify-center">
          <div class="col-0 col-sm-2 col-md-2 image-div-justify">
            <q-img fit="contain" src="icons/favicon.png" />
          </div>

          <q-card-section
            class="col-12 col-sm-10 col-md-8 col-lg-8 column display-flex justify-center self-center"
          >
            <div
              class="row display-flex justify-center"
              style="width: 100%; max-width: 800px"
            >
              <div class="col-md-11 col-12 q-pa-sm">
                <div style="display: flex; justify-content: center">
                  <h5 class="q-pa-none q-ma-sm text-center text-primary">
                    {{ appContentStore.pollDataObj.header.title }}
                  </h5>
                </div>
                <div style="display: flex; justify-content: center">
                  <h6 class="q-pa-none q-ma-sm text-center text-primary">
                    {{ appContentStore.pollDataObj.header.address }}
                  </h6>
                </div>
                <div style="display: flex; justify-content: center">
                  <h6 class="q-pa-none q-ma-sm text-center text-primary">
                    <a>{{ appContentStore.pollDataObj.header.email }}</a>
                  </h6>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card-section>
      <q-card-section class="q-py-xl">
        <div
          v-html="appContentStore.pollDataObj.textBannerReedme.description"
          class="textDescription"
        />
      </q-card-section>
      <q-card-actions class="text-primary justify-center q-pt-xl">
        <q-btn
          unelevated
          label="Close"
          color="primary"
          @click="closePage"
          align="center"
          class="col-12 col-sm-auto"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import { useAppContentStore } from "src/modules/agv/stores/appContentStore";

export default defineComponent({
  name: "PollRulesPage",
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
      title: "Regolamento",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina del regolamento.",
      },
    } as unknown as ISeoModel);
    await this.appContentStore.loadPollData();
  },
});
</script>

<style scoped>
.image-div-justify {
  justify-content: center;
  align-self: center;
}
</style>
