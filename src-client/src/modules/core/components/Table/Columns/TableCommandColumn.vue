<template>
  <div>
    <q-btn
      v-for="(v, k) in props.col.extra"
      v-show="showBtn(v)"
      :key="k"
      size="sm"
      :flat="!v.label"
      :round="!v.label"
      :outline="!!v.label"
      :label="getLabel(v.label)"
      color="primary"
      :icon="v.icon"
      @click="
        () => {
          if (v.fnAction) v.fnAction(props.row);
        }
      "
    >
      <q-tooltip v-if="v.tooltip">{{ getLabel(v.tooltip) }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { ITableRowButton } from "@wisegar-org/wgo-base-models/build/core/Table";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableCommandColumn",
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
    showBtn(v: ITableRowButton) {
      if (v.fnShow) {
        return v.fnShow(this.props.row);
      }
      return true;
    },
  },
});
</script>
