<template>
  <q-checkbox v-model="value" size="sm" @input="onRowSelect">
    <q-tooltip v-if="tooltip">{{ getLabel(tooltip) }} </q-tooltip>
  </q-checkbox>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableSelectColumn",
  props: ["props", "schema"],
  data() {
    return {
      value: false,
    };
  },
  computed: {
    tooltip(): string | false {
      if (this.props.col.extra && this.props.col.extra.tooltip) {
        if (typeof this.props.col.extra.tooltip == "function") {
          return this.props.col.extra.tooltip(this.props.row);
        } else {
          return this.props.col.extra.tooltip;
        }
      }
      return false;
    },
  },
  methods: {
    onRowSelect(): void {
      return this.$emit("rowSelect", this.value);
    },
    getLabel(name: string) {
      if (
        this.schema?.translationStore &&
        name &&
        !this.props.col.nonTranslate
      ) {
        return this.schema.translationStore.getTranslation(name);
      }
      return name;
    },
  },
  emits: ["rowSelect"],
});
</script>
