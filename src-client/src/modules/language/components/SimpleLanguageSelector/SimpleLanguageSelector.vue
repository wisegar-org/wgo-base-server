<template>
  <q-btn-dropdown
    no-caps
    unelevated
    color="primary"
    style="width: 100%"
    class=""
  >
    <template v-slot:label>
      <div class="row col-11" :style="styleBtn">
        <q-icon left name="language"> </q-icon>
        <div class="text-center q-pl-sm">
          {{ selectedCode }}
        </div>
      </div>
    </template>
    <q-list>
      <q-item
        v-for="(item, index) in languages"
        :key="`simpleLanguageSelector-${index}-${item.id}`"
        @click="() => selectLanguage(item)"
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>{{ item.code }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";

export default defineComponent({
  name: "SimpleLanguageSelector",
  props: {
    languages: { type: Array as PropType<ILanguageModel[]>, default: [] },
    selected: { type: Object as PropType<ILanguageModel> },
    styleBtn: { type: String, default: "" },
  },
  setup() {},
  methods: {
    async selectLanguage(lang: ILanguageModel) {
      this.$emit("select", lang);
    },
  },
  computed: {
    selectedCode(): string {
      return this.selected?.code || "";
    },
  },
  emits: ["select"],
});
</script>
