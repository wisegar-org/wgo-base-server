<template>
  <div class="fit">
    <div
      v-if="!!html"
      v-html="getLabel(text)"
      :class="class"
      :style="getStyle()"
    />
    <div v-else :class="class" :style="getStyle()">
      <slot name="default"> {{ getLabel(text) }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { BaseTranslateComponent } from "../BaseComponents";

export default defineComponent({
  props: {
    text: { type: String, default: "" },
    html: { type: Boolean, default: false },
    class: { type: String, default: "text-body1" },
    largeFont: { type: Boolean, default: false },
    tranStore: { type: Object as PropType<TranslationStore>, required: false },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      getTranslation: getLabel,
    };
  },
  methods: {
    getStyle() {
      return this.largeFont ? "font-size: xx-large" : "";
    },
    getLabel(name: string) {
      if (this.tranStore) {
        return this.getTranslation(this.tranStore as any, name);
      }
      return name;
    },
  },
});
</script>
