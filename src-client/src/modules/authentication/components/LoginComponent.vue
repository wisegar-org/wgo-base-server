<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div
      v-if="!innerLoading"
      class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10"
    >
      <q-card flat square bordered class="q-ma-lg">
        <q-item class="bg-primary text-white">
          <q-item-section avatar top>
            <q-icon
              name="img:favicon.ico"
              class="login_icon cursor-pointer"
              size="3.4em"
              @click="goToHome"
            />
          </q-item-section>
          <q-item-section top class="self-center">
            <div class="text-h6 text-left">
              {{ getLabel(translations.LOGIN_TITLE) }}
            </div>
          </q-item-section>
          <q-item-section top side class="self-center">
            <q-btn
              class="gt-xs text-white"
              flat
              dense
              :label="getLabel(tranBase.HOME)"
              @click="goToHome"
            />
          </q-item-section>
        </q-item>
        <q-form @submit="loginUser" class="q-pa-sm">
          <q-card-section class="q-ma-sm">
            <q-input
              square
              outlined
              required
              class="q-my-sm"
              v-model="user"
              :autofocus="true"
              :label="getLabel(translations.USER_LB)"
            />

            <InputSecret
              class="q-my-lg"
              v-model="password"
              :label="getLabel(translations.PASSWORD_LB)"
              @onEnter="loginUser"
              :hideBtnSpace="true"
              :required="true"
            />
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              v-if="!hideReset && !!showReset"
              flat
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="getLabel(translations.GO_TO_RESET)"
              @click="goToResetPassword"
            />
            <q-btn
              unelevated
              v-if="!hideReister"
              flat
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="getLabel(translations.GO_TO_REGISTER)"
              @click="goToRegisterUser"
            />
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix col-12 col-sm-4"
              :label="getLabel(tranBase.LOGIN)"
              type="submit"
            /> </q-card-actions
        ></q-form>
        <!-- <div class="full-width row justify-center text-grey text-caption">
          Version: {{ version }} - API Version: {{ apiVersion }}
        </div> -->
      </q-card>
    </div>
    <Loader :loading="innerLoading || showLoading" />
  </div>
</template>

<script lang="ts">
import { AuthService } from "../services/AuthService";
import Loader from "../../core/components/Loader/Loader.vue";
import { defineComponent, PropType } from "vue";
import InputSecret from "../../core/components/InputSecret/InputSecret.vue";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { BaseTranslateComponent } from "../../core/components/BaseComponents";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "../../translation/store/TranslationStore";
import { ISuccesLogin } from "@wisegar-org/wgo-base-models/build/authentication";

export default defineComponent({
  name: "LoginComponent",
  components: {
    Loader,
    InputSecret,
  },
  props: {
    hideReister: {
      type: Boolean,
    },
    hideReset: {
      type: Boolean,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      user: "",
      password: "",
      innerLoading: false,
      showLoading: false,
      showReset: false,
      version: "0",
      apiVersion: "0",
      tranBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async loginUser() {
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.loginUser({
        user: this.user,
        password: this.password,
      });
      this.showLoading = false;
      if (result) {
        this.$emit("onLogin", result);
      } else {
        this.showReset = true;
      }
    },
    goToRegisterUser() {
      this.$emit("onRegister");
    },
    goToHome() {
      this.$emit("onHome");
    },
    goToResetPassword() {
      this.$emit("onResetPassword");
    },
  },
  emits: {
    onLogin(payload: ISuccesLogin) {
      return payload;
    },
    onRegister() {
      return true;
    },
    onHome() {
      return true;
    },
    onResetPassword() {
      return true;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
