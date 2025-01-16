<template>
  <q-btn size="sm" flat round icon="more_vert">
    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <div v-close-popup v-for="(v, k) in props.col.extra" :key="k">
          <q-item
            v-if="v.type == 'item'"
            clickable
            @click="doAction(v.action, props.row)"
          >
            <q-item-section avatar>
              <q-icon color="primary" :name="v.icon" />
            </q-item-section>
            <q-item-section>{{ getLabel(v.label) }}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableMenuColumn",
  props: ["props", "schema"],
  methods: {
    doAction(action: string | unknown, props: unknown, extra: unknown = null) {
      this.$emit("action", action, props, extra);
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
  emits: ["action"],
});
</script>
