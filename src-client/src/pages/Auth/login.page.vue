<template>
  <LoginComponent
    :tranStore="tranStore"
    :hideReister="true"
    @onLogin="onLogin"
    @onRegister="goToRegister"
    @onHome="goToHome"
    @onResetPassword="goToResetPassword"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "../../components/auth/login.component.vue";
import { ISuccesLogin } from "@wisegar-org/wgo-base-models/build/authentication";
import { RouteService } from "src/services/RouteService";
import { useRouter, Router } from "vue-router";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { useAuthStore } from "../../stores/authStore";
import { Paths } from "../../router/paths";
import { useTranslationStore } from "../../stores/translationStore";
import { useMeta } from "quasar";
import { BaseSeoDataComponent } from "src/modules/core/components/BaseComponents";
import { TranslationStore } from "src/modules/translation/store/TranslationStore";
import { ISeoModel } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
  },
  props: {
    path: String,
  },
  data() {
    const router = useRouter();
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);
    return {
      routeService: new RouteService(router as Router),
      seoComponent,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const translationStore = useTranslationStore();
    return {
      authStore: authStore.authStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onLogin(value: ISuccesLogin) {
      console.log("Component login result");
      console.log(value);
      this.authStore.setLogin(value);
      this.routeService.goTo(this.path || Paths.home.path);
    },
    goToRegister() {
      this.routeService.goTo(AuthPaths.authRegister.path);
    },
    goToHome() {
      this.routeService.goTo(Paths.home.path);
    },
    goToResetPassword() {
      this.routeService.goTo(AuthPaths.authResetPassword.path);
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
