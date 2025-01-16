<template>
  <q-input square outlined readonly :label="label" v-model="textCopy">
    <template v-slot:append>
      <q-icon
        name="content_copy"
        @click="copyToClipBoard"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputCopy",
  props: {
    label: {
      type: String,
      default: "",
    },
    textCopy: {
      type: String,
      default: "",
    },
  },
  methods: {
    async copyToClipBoard() {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        await navigator.clipboard.writeText(this.textCopy);
    },
  },
});
</script>
