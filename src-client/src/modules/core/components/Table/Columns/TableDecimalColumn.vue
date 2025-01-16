<template>
  <div :style="{ 'text-align': 'right' }">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import currency from "currency.js";

export default defineComponent({
  name: "TableDecimalColumn",
  props: ["props", "schema"],
  computed: {
    value(): string {
      const value = this.props.value;
      if (!value) return "";
      if (value === 0) return "";
      const decimal = this.props.col.extra ? this.props.col.extra.decimal : 0;
      const format = {
        symbol: "",
        separator: "'",
        precision: decimal,
      };
      return currency(value as number, format).format();
    },
  },
});
</script>
