<template>
  <q-icon v-show="name" :name="name" :color="color" size="md">
    <q-tooltip v-if="tooltip">{{ getLabel(tooltip) }} </q-tooltip>
  </q-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableIconColumn",
  props: ["props", "schema"],
  computed: {
    color(): string {
      if (this.props.col.extra && this.props.col.extra.color) {
        if (typeof this.props.col.extra.color == "function") {
          return this.props.col.extra.color(this.props.row);
        } else {
          return this.props.col.extra.color;
        }
      }
      return "teal";
    },
    tooltip(): string {
      if (this.props.col.extra && this.props.col.extra.tooltip) {
        if (typeof this.props.col.extra.tooltip == "function") {
          return this.props.col.extra.tooltip(this.props.row);
        } else {
          return this.props.col.extra.tooltip;
        }
      }
      return "teal";
    },
    name(): string {
      return this.props.value;
    },
  },
  methods: {
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
});
</script>
