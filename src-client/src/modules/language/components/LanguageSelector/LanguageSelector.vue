<template>
  <div>
    <q-btn-dropdown
      v-if="!$q.platform.is.mobile"
      no-caps
      flat
      outline
      unelevated
      :icon="iconBtn"
      :label="langStore.selectedLang.code"
    >
      <q-list>
        <q-item
          v-for="(item, index) in langStore.allLanguage()"
          :key="`languageSelector-${index}-${item.id}`"
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
    <q-btn-dropdown
      v-else
      no-caps
      flat
      outline
      unelevated
      :label="langStore.selectedLang.code"
    >
      <q-list>
        <q-item
          v-for="(item, index) in langStore.allLanguage()"
          :key="`languageSelector-${index}-${item.id}`"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ILanguageModel } from "@wisegar-org/wgo-base-models/build/language";
import { LanguageStore } from "../../store/LanguageStore";

export default defineComponent({
  name: "LanguageSelector",
  props: {
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  setup() {},
  methods: {
    async selectLanguage(lang: ILanguageModel) {
      await this.langStore.setSelectedLang(lang);
    },
  },
  computed: {
    iconBtn(): string | boolean {
      return (this as any).$q.platform.is.mobile ? "null" : "language";
    },
  },
});
</script>
