<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar class="text-black">
        <LeftDrawer
          :items="menuItems"
          :authStore="authStore"
          :tranStore="tranStore"
          :routeService="routeService"
        />
        <q-toolbar-title>
          {{ getLabel(title || tranBase.APP_ADMIN_TITLE) }}
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
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteService } from "../services/RouteService";
import LeftDrawer from "../components/core/menu/left-drawer.component.vue";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { BaseTranslateComponent } from "../modules/core/components/BaseComponents";
import LoginBtn from "../modules/core/components/LoginBtn/LoginBtn.vue";
import LanguageSelector from "../modules/language/components/LanguageSelector/LanguageSelector.vue";
import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { TranslationStore } from "../modules/translation/store/TranslationStore";
import { LanguageStore } from "../modules/language/store/LanguageStore";
import { AuthStore } from "../modules/authentication/store/AuthStore";
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
    logout() {
      this.authStore.resetState();
      this.goToPath(this.homePath);
    },
  },
  emits: ["onSaveUser"],
});
</script>
