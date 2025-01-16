<template>
  <q-layout view="hHh Lpr lff" class="row" style="justify-content: center">
    <q-header>
      <q-toolbar>
        <LeftDrawer
          v-if="menuItems.length > 0"
          :items="menuItems"
          :authStore="authStore"
          :tranStore="tranStore"
          :routeService="routeService"
        />
        <q-avatar @click="goToHome" class="cursor-pointer">
          <img src="favicon.ico" />
        </q-avatar>
        <q-toolbar-title>
          {{ getLabel(title || tranBase.APP_TITLE) }}
        </q-toolbar-title>

        <div class="row">
          <LanguageSelector :langStore="langStore" class="q-mx-sm" />
          <LoginBtn
            :user="authStore.user"
            :tranStore="tranStore"
            :authStore="authStore"
            :emails="emails"
            @onLoginClick="goToLogin"
            @onLogoutClick="logout"
            @onSaveUser="onSave"
            @onAdminClick="goToAdmin"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container
      class="row justify-evenly"
      :style="{ width: '100%', 'max-width': maxWidth }"
    >
      <router-view :class="viewClasses" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteService } from "../../services/RouteService";
import LeftDrawer from "../Menu/LeftDrawer.vue";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { BaseTranslateComponent } from "../BaseComponents";
import LoginBtn from "../LoginBtn/LoginBtn.vue";
import LanguageSelector from "../../../language/components/LanguageSelector/LanguageSelector.vue";
import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { LanguageStore } from "../../../language/store/LanguageStore";
import { AuthStore } from "../../../authentication/store/AuthStore";
import { AdminBasePath } from "@wisegar-org/wgo-base-models/build/core/router";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";

export default defineComponent({
  name: "AdminMainLayout",
  props: {
    menuItems: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    emails: { type: Array as PropType<string[]>, default: [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
    homePath: { type: String, default: "/" },
    title: { type: String, default: "" },
    viewClasses: { type: String, default: "col-12" },
    maxWidth: { type: String, default: "1800px" },
  },
  components: {
    LeftDrawer,
    LoginBtn,
    LanguageSelector,
  },
  setup(props) {
    const { getLabel } = new BaseTranslateComponent();

    return {
      tranBase,
      getLabel: (name: string) => getLabel(props.tranStore, name),
    };
  },
  methods: {
    goToPath(path: string) {
      this.routeService.goTo(path);
    },
    onSave(user: any) {
      this.$emit("onSaveUser", user);
    },
    goToLogin() {
      this.goToPath(AuthPaths.authLogin.path);
    },
    goToHome() {
      this.goToPath(this.homePath);
    },
    goToAdmin() {
      this.goToPath(AdminBasePath);
    },
    logout() {
      this.authStore.resetState();
      this.goToHome();
    },
  },
  emits: ["onSaveUser"],
});
</script>
