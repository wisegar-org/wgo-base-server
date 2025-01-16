<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-form @submit="onReset" ref="form">
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
                {{ getLabel(translations.CHANGE_PASSWORD_TITLE) }}
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
          <q-card-section class="q-ma-sm">
            <InputSecret
              class="q-my-md q-mx-sm"
              v-model="password"
              :required="true"
              :label="getLabel(translations.PASSWORD_LB)"
              :error="getLabel(translations.PASSWORD_EQUALS_ERR)"
              :hideBtnSpace="true"
            />
            <InputSecret
              class="q-my-lg q-mx-sm"
              v-model="confirmPassword"
              :required="true"
              :label="getLabel(translations.CONFIRM_PASSWORD_LB)"
              @onEnter="onReset"
              :isError="password !== confirmPassword"
              :hideBtnSpace="true"
              :error="getLabel(translations.PASSWORD_EQUALS_ERR)"
            />
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="getLabel(tranBase.CHANGE)"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
    <Loader :loading="showLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AuthService } from "../services/AuthService";
import InputSecret from "../../core/components/InputSecret/InputSecret.vue";
import Loader from "../../core/components/Loader/Loader.vue";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { BaseTranslateComponent } from "../../core/components/BaseComponents";
import { TranslationStore } from "../../translation/store/TranslationStore";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "ResetPasswordComponent",
  props: {
    token: {
      type: String,
      default: "",
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Loader,
    InputSecret,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      password: "",
      confirmPassword: "",
      translationsContent: {},
      showLoading: false,
      tranBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async onReset() {
      if (this.password !== this.confirmPassword) return;
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.changeResetPassword({
        token: this.token,
        password: this.password,
      });
      if (result) {
        this.$emit("onChangePassword");
      }
      this.showLoading = false;
    },
    goToHome() {
      this.$emit("onHome");
    },
  },
  emits: {
    onHome() {
      return true;
    },
    onChangePassword() {
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
