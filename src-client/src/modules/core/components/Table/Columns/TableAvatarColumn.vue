<template>
  <q-avatar
    v-show="icon"
    size="sm"
    :rounded="rounded"
    :color="color"
    :text-color="textColor"
    :icon="icon"
    @click="doAction('avatar', props.row)"
  >
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableAvatarColumn",
  props: ["props", "schema"],
  computed: {
    rounded(): boolean {
      return true;
    },
    textColor() {
      return "white";
    },
    color(): string {
      if (this.props.col.extra && this.props.col.extra.color) {
        if (typeof this.props.col.extra.color == "function") {
          return this.props.col.extra.color(this.props.row);
        } else {
          return this.props.col.extra.color;
        }
      }
      return "blue";
    },
    icon(): string {
      return this.props.value;
    },
  },
  methods: {
    doAction(action: string | unknown, props: unknown, extra: unknown = null) {
      this.$emit("action", action, props, extra);
    },
  },
  emits: ["action"],
});
</script>
