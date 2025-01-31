<template>
  <div style="align-self: center">
    <div v-if="isLogged" class="row">
      <q-btn-dropdown
        flat
        :label="userEmail"
        :icon="iconBtn"
        no-caps
        color="white"
        text-color="black"
        unelevated
      >
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup @click="() => showUserProfile(true)">
            <q-item-section>{{
              getLabel(translations.EDIT_PROFILE)
            }}</q-item-section>
          </q-item>
          <q-item
            v-if="isAdminUser()"
            clickable
            v-close-popup
            @click="goToAdmin"
          >
            <q-item-section>{{
              getLabel(translations.APP_ADMIN_TITLE)
            }}</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onLogout">
            <q-item-section>{{ getLabel(translations.LOGOUT) }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <EditUserDialog
        :open="open"
        :tranStore="tranStore"
        :authStore="authStore"
        @close="() => showUserProfile(false)"
        :user="getUser"
        :emails="emails"
        @onEdited="onEdited"
      />
    </div>
    <q-btn
      outline
      v-else
      icon="login"
      @click="onLogin"
      :label="getLoginLabel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EditUserDialog from "../../../authentication/components/EditUser/EditUserDialog.vue";
import { BaseTranslateComponent } from "../BaseComponents";
import { IUser, translations } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { AuthStore } from "../../../authentication/store/AuthStore";
import { AdminBasePath } from "@wisegar-org/wgo-base-models/build/core/router";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: false,
    },
    emails: { type: Array as PropType<string[]>, default: [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
  },
  components: {
    EditUserDialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      open: false,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
    };
  },
  methods: {
    showUserProfile(status: boolean) {
      this.open = status;
    },
    onLogin() {
      this.$emit("onLoginClick");
    },
    onLogout() {
      this.$emit("onLogoutClick");
    },
    onEdited(user: IUser) {
      this.showUserProfile(false);
      this.$emit("onSaveUser", user);
    },
    isAdminUser() {
      return (
        this.authStore.isUserInRole([SUPERADMIN]) &&
        `${(this as any).$route.path}`.indexOf(`${AdminBasePath}/`) === -1
      );
    },
    goToAdmin() {
      this.$emit("onAdminClick");
    },
  },
  computed: {
    isLogged(): boolean {
      return !!this.user && !!this.user.id;
    },
    userEmail(): string {
      return !(this as any).$q.platform.is.mobile && this.user?.userName
        ? this.user.userName
        : "";
    },
    iconBtn(): string {
      return !(this as any).$q.platform.is.mobile ? "" : "person";
    },
    getLoginLabel(): string {
      return !(this as any).$q.platform.is.mobile
        ? this.getLabel(translations.LOGIN)
        : "";
    },
    getUser(): IUser {
      return this.user ? this.user : <IUser>{};
    },
  },
  emits: {
    onLoginClick: () => {
      return true;
    },
    onLogoutClick: () => {
      return true;
    },
    onSaveUser(user: IUser) {
      return user;
    },
    onAdminClick: () => {
      return true;
    },
  },
});
</script>

<style scoped>
.user_email_style {
  display: flex;
  align-items: center;
}
</style>
