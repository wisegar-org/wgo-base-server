<template>
  <div
    class="ellipsis"
    :style="{
      'min-width': props.col.width + 'px',
      width: props.col.width + 'px',
    }"
  >
    {{ getDate(props.value, props.col.extra) }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UtilService } from "../../../../../services/UtilService";

export default defineComponent({
  name: "TableDateColumn",
  props: ["props", "schema"],
  methods: {
    getDate(value: string, extra: unknown) {
      if (!value) return "";
      return UtilService.parseDate(value, extra as string);
    },
  },
});
</script>
