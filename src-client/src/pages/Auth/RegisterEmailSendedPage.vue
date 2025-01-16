<template>
  <div>
    <EmailSendedComponent
      v-if="!!email"
      :tranStore="tranStore"
      :email="email"
      @onHome="goToHome"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import EmailSendedComponent from "src/modules/authentication/components/EmailSendedComponent.vue";
import { RouteService } from "src/modules/core/services/RouteService";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "RegisterEmailSendedPage",
  components: {
    EmailSendedComponent,
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      email: (route.query.email as string) || "",
      routeService: new RouteService(router as Router),
      seoComponent,
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
  },
  mounted() {
    this.seoComponent.setSeoData({
      title: "Accesso",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina di accesso.",
      },
    } as unknown as ISeoModel);
  },
});
</script>
