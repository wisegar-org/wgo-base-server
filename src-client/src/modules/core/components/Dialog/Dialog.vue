<template>
  <q-dialog
    :full-width="fullWidth"
    :full-height="fullHeight"
    v-model="open"
    :persistent="persistent"
    :maximized="$q.platform.is.mobile"
    @escape-key="close"
  >
    <q-card
      :style="`max-width: ${!!maxWidth ? maxWidth : '100%'}; width: ${
        !!width ? width : '100%'
      }`"
    >
      <q-toolbar class="bg-primary text-white">
        <q-avatar :icon="icon" />
        <q-toolbar-title v-if="title">{{ title }}</q-toolbar-title>
        <q-btn
          v-if="showClose"
          flat
          round
          dense
          icon="close"
          @click="close"
          v-close-popup
        />
      </q-toolbar>
      <q-separator />
      <q-card-section>
        <div class="bg-white text-black text-center flex flex-center row">
          <slot name="default"></slot>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Dialog",
  props: {
    title: { type: String, default: "Info" },
    icon: { type: String, default: "info" },
    maxWidth: { type: String, default: "" },
    width: { type: String, default: "" },
    open: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    fullHeight: { type: Boolean, default: false },
    persistent: { type: Boolean, default: false },
    showClose: { type: Boolean, default: false },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  emits: ["close"],
});
</script>
