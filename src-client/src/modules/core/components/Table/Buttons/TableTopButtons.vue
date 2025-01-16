<template>
  <div v-if="schema.leftButtons">
    <q-btn
      v-for="(v, k) in schema.leftButtons"
      :key="k"
      :color="v.color"
      :icon="v.icon"
      size="sm"
      class="q-mr-md"
      unelevated
      @click="v.fnAction"
    >
      {{ getLabel(v.label) }}
      <q-tooltip v-if="v.tooltip">{{ getLabel(v.tooltip) }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITableSchema } from "@wisegar-org/wgo-base-models/build/core/Table";

export default defineComponent({
  name: "TableTopButtons",
  props: {
    schema: {
      type: Object as PropType<ITableSchema>,
      default: { schema: {}, title: "", code: "id" },
    },
  },
  methods: {
    getLabel(name: string) {
      if (name && this.schema?.translationStore) {
        return this.schema.translationStore.getTranslation(name);
      }

      return name;
    },
  },
  setup() {},
});
</script>
