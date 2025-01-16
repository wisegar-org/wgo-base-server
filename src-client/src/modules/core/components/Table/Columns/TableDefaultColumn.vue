<template>
  <div
    class="ellipsis"
    :style="{
      'min-width': props.col.width + 'px',
      width: '100%',
    }"
    v-html="getLabel(props.value)"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableDefaultColumn",
  props: ["props", "schema"],
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
