<template>
  <q-page class="row justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Ecco le nostre coordinate bancarie:</div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              IBAN: CH40 8080 8007 3682 5421 4
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              Assemblea dei Genitori di Vezia
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">Istituti Scolastico</div>
            <div class="text-h5 q-mt-sm q-mb-xs">6943 Vezia</div>
            <div class="text-caption text-grey">
              Il tuo supporto ci permettere di organizzare altre attivita per i
              nostro bambini e di migliorare la qualita della loro vita
              scolastica.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="images/qr-agv.png" />
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat color="primary" @click="funOnClick">Contattaci</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent, onMounted } from "vue";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import { useRouterService } from "src/services/RouterService";
import { contattoPageRoute } from "src/modules/agv/routes/contattoPageRoute";

export default defineComponent({
  name: "DonationPage",
  components: {},
  setup() {
    const routerService = useRouterService();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    const funOnClick = () => {
      routerService.goToRoute(contattoPageRoute);
    };
    onMounted(() => {
      seoComponent.setSeoData({
        title: "Contatto",
        webSite: "Assemblea Genitori di Vezia",
        description: {
          name: "description",
          content:
            "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina dei contatti.",
        },
      } as unknown as ISeoModel);
    });
    return {
      seoComponent,
      funOnClick,
    };
  },
});
</script>
src/modules/agv/routes/ContattoPageRoute
