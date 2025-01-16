<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-form @submit="onResend">
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
                {{ getLabel(translations.RESEND_EMAIL_TITLE) }}
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
            <q-input
              square
              outlined
              class="q-mb-sm q-mx-sm q-mt-md"
              v-model="email"
              required
              :autofocus="true"
              :label="getLabel(translations.COLUMN_EMAIL)"
            />
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              v-if="!hideReister"
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="getLabel(tranBase.SEND)"
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
import Loader from "../../core/components/Loader/Loader.vue";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { BaseTranslateComponent } from "../../core/components/BaseComponents";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "../../translation/store/TranslationStore";

export default defineComponent({
  name: "ResendConfirmComponent",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    hideReister: {
      type: Boolean,
    },
  },
  components: {
    Loader,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      email: "",
      showLoading: false,
      tranBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async onResend() {
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.resendConfirmation({ email: this.email });
      if (result) {
        this.$emit("onResend", this.email);
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
    onResend(email: string) {
      return email;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
