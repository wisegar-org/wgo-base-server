<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
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
              {{ getLabel(translations.EMAIL_SENDED_TITLE) }}
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
        <q-card-section class="q-ma-sm q-pt-md">
          <div class="q-ma-md">
            {{ getLabel(translations.SENDED_TO_LB) }} {{ email }}
          </div>
          <div class="q-my-sm q-mx-sm">
            {{ getLabel(translations.CHECK_EMAIL_MSG) }}
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm">
          <q-btn
            unelevated
            v-if="!hideReister"
            flat
            dense
            color="primary"
            align="around"
            class="btn_width_fix q-mb-md col-12 col-sm-4"
            :label="getLabel(tranBase.HOME)"
            @click="goToHome"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { BaseTranslateComponent } from "../../core/components/BaseComponents";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "../../translation/store/TranslationStore";

export default defineComponent({
  name: "EmailSendedComponent",
  props: {
    email: {
      type: String,
      default: "",
    },
    hideReister: { type: Boolean, default: false },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      tranBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    goToHome() {
      this.$emit("onHome");
    },
  },
  emits: {
    onHome() {
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
