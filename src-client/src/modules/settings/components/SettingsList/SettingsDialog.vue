<template>
  <Dialog
    :open="open"
    icon="settings"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="setSetting" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12">
            <q-input
              square
              outlined
              readonly
              class="q-my-sm q-mx-sm"
              v-model="settings.type_settings"
              required
              :label="getLabel(translations.COLUMN_TYPE_SETTINGS)"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              readonly
              class="q-my-sm q-mx-sm"
              v-model="keyValue"
              required
              :label="getLabel(translations.COLUMN_SETTING)"
            />
          </div>
          <div class="col-12">
            <InputSecret
              v-if="typeof settings.value === 'object' && isPasswordField"
              class="q-my-md q-mx-sm"
              v-model="settings.value.value"
              :required="true"
              :label="getLabel(translations.COLUMN_VALUE)"
              :hideBtnSpace="true"
            />
            <q-input
              v-else-if="typeof settings.value === 'object' && isNumberField"
              autofocus
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="settings.value.value"
              required
              type="number"
              :label="getLabel(translations.COLUMN_VALUE)"
            />
            <q-list
              v-else-if="typeof settings.value === 'object' && isBooleanField"
              class="q-my-sm q-mx-sm"
            >
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label class="text-left">{{
                    getLabel(translations.COLUMN_VALUE)
                  }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-checkbox v-model="settings.value.value" />
                </q-item-section>
              </q-item>
            </q-list>
            <q-input
              v-else-if="typeof settings.value === 'object'"
              autofocus
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="settings.value.value"
              required
              :label="getLabel(translations.COLUMN_VALUE)"
            />
            <q-input
              v-else
              autofocus
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="settings.value"
              required
              :label="getLabel(translations.COLUMN_VALUE)"
            />
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-py-md">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="getLabel(tranBase.SAVE)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISettingsModel } from "@wisegar-org/wgo-base-models/build/settings";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { settingsTranslations as translations } from "@wisegar-org/wgo-base-models/build/settings/translations";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { SettingsService } from "../../services/SettingsService";
import InputSecret from "../../../core/components/InputSecret/InputSecret.vue";
import { TranslationStore } from "../../../translation/store/TranslationStore";

export default defineComponent({
  name: "SettingsDialog",
  props: {
    open: { type: Boolean, default: false },
    stting: {
      type: Object as PropType<ISettingsModel>,
      default: {} as ISettingsModel,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
    InputSecret,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const keyValue = "";
    return {
      settings: {} as ISettingsModel,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
      tranBase,
      keyValue,
      settingsService: new SettingsService(),
    };
  },
  methods: {
    async setSetting() {
      const input = {
        key: this.settings.key,
        type_settings: this.settings.type_settings,
        value: {
          type: (this.settings.value as any).type,
          value: `${(this.settings.value as any).value}`,
        },
      };
      const result = await this.settingsService.postSettings(input);
      if (result) {
        this.$emit(
          "success",
          this.isPasswordField
            ? { type: "password", value: "" }
            : this.settings.value,
          this.getLabel(this.translations.SET_SUCCESS)
        );
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
  computed: {
    isPasswordField() {
      return (this.settings.value as any).type === "password";
    },
    isNumberField() {
      return (this.settings.value as any).type === "number";
    },
    isBooleanField() {
      return (this.settings.value as any).type === "boolean";
    },
  },
  emits: ["close", "success"],
  watch: {
    stting() {
      this.settings = { ...this.stting };
      if (this.isBooleanField) {
        (this.settings.value as any).value =
          (this.settings.value as any).value === "true";
      }
      this.keyValue =
        this.getLabel(`WGO_SETTINGS_${this.stting.key}`) +
        ` (${this.stting.key})`;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
