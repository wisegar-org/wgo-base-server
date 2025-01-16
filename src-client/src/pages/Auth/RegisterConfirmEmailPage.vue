<template>
  <div>
    <ConfirmEmailComponent
      v-if="!!token"
      :tranStore="tranStore"
      :token="token"
      @onConfirm="onEmailConfirm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter, Router } from "vue-router";
import { RouteService } from "src/modules/core/services/RouteService";
import ConfirmEmailComponent from "src/modules/authentication/components/ConfirmEmailComponent.vue";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "RegisterConfirmEmailPage",
  components: { ConfirmEmailComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as Router),
      token: (route.query.token as string) || "",
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
    onEmailConfirm(confirmed: boolean) {
      if (confirmed) {
        this.routeService.goTo(AuthPaths.authLogin.path);
      } else {
        this.routeService.goTo(AuthPaths.authResendConfirmation.path);
      }
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
