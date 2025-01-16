<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <div class="block-text-card-up block-text-card-down">
        <h1 class="text-center" style="font-size: xx-large">Indirizzi utili</h1>
        <div class="row">
          <div
            v-for="(addr, key) in address"
            :key="key"
            class="col-md-4 col-sm-6 col-12 q-pa-lg"
          >
            <LinkCard :item="addr" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";
import LinkCard from "src/modules/agv/components/LinkCard/LinkCard.vue";

export default defineComponent({
  name: "LinkUtilPage",
  components: {
    LinkCard,
  },
  setup() {
    return {
      address: [
        {
          name: "Municipio di Vezia",
          url: "http://www.vezia.ch",
          img: "images/logos/vezia.ch.ico",
        },
        {
          name: "Conferenza Cantonale Genitori",
          url: "https://genitorinforma.ch/it/",
          img: "images/logos/Logo_CCG.png",
        },
        {
          name: "Pedibus",
          url: "http://www.pedibus.ch",
          img: "images/logos/pedibus.png",
        },
        {
          name: "ASPI",
          url: "http://www.aspi.ch",
          img: "images/logos/aspi.png",
        },
        {
          name: "Federazione Ticinese Famiglie diurne",
          url: "http://www.famigliediurne.ch",
          img: "images/logos/cropped-logo_mammediurne.png",
        },
        {
          name: "ZURICH precorsovita",
          url: "https://www.zurichvitaparcours.ch/it",
          img: "images/logos/zurich_precorso_logo_it.png",
        },
        {
          name: "Svizzera Mobile",
          url: "https://www.schweizmobil.ch/it/veloland/veloland.html",
          img: "images/logos/svizzera_logo_vl.svg",
        },
        {
          name: "Internet - INFOGIOVANI",
          url: "https://www4.ti.ch/generale/infogiovani/salute-e-benessere/nonsolodroghe/internet/",
          img: "images/logos/ti-ch.png",
        },
        {
          name: "Infofamiglie",
          url: "https://www3.ti.ch/DSS/infofamiglie/",
          img: "images/logos/logo_infofamiglie.gif",
        },
        {
          name: "Salute Psi",
          url: "https://www.santepsy.ch/it/pages/risorse-a-disposizione-dei-futuri-genitori-e-di-genitori-di-bambini-piccoli-1011",
          img: "images/logos/logo-santepsy_it.png",
        },
        {
          name: "Forum Genitorialità",
          url: "https://www.xn--genitorialit-99a.ch/it/",
          img: "images/logos/logo_fg.jpg",
        },
        {
          name: "Veloland",
          url: "https://www.schweizmobil.ch/it/veloland/veloland.html",
          img: "images/logos/logo-desktop_it2.png",
        },
        {
          name: "Escursioni in Ticino",
          url: "https://www.ticino.ch/it/explore/excursions.html",
          img: "images/logos/ticinoturismo.svg",
        },
      ],
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
      title: "Link Utili",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina dell'indirizzi utili.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
