<template>
  <Dialog
    :open="open"
    icon="person"
    :title="getLabel(translations.EDIT_USER_TITLE)"
    :persistent="true"
    :showClose="true"
    maxWidth="700px"
    @close="close"
  >
    <EditUserComponentVue
      :user="user"
      @onEdit="onSave"
      @onClose="close"
      :tranStore="tranStore"
      :authStore="authStore"
      :emails="emails"
    />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AuthStore } from "../../store/AuthStore";
import { IUser } from "@wisegar-org/wgo-base-models/build/core";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import EditUserComponentVue from "./EditUserComponent.vue";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";

export default defineComponent({
  name: "EditUserDialog",
  components: {
    Dialog,
    EditUserComponentVue,
  },
  props: {
    open: { type: Boolean, default: false },
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
    emails: { type: Array as PropType<string[]>, default: [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSave(user: IUser) {
      this.$emit("onEdited", user);
    },
  },
  emits: {
    close() {
      return true;
    },
    onEdited(user: IUser) {
      return user;
    },
  },
});
</script>
