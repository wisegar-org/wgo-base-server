<template>
  <q-inner-loading :showing="loading" style="z-index: 9999">
    <q-spinner size="50px" color="primary" />
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
