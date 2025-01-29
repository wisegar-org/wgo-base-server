<template>
  <q-item clickable @click="goToPath" :style="getBorderStyle()">
    <q-item-section avatar>
      <q-icon :name="menuItem.icon" :color="getColorStyle()" />
    </q-item-section>
    <q-item-section :class="getLabelStyle()">
      {{ getLabel(menuItem.label) }}
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BaseTranslateComponent } from "../BaseComponents";
import { RouteService } from "../../../../services/RouteService";
import { IMenuItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { AuthStore } from "../../../authentication/store/AuthStore";

export default defineComponent({
  name: "LeftDrawerItem",
  props: {
    menuItem: {
      type: Object as PropType<IMenuItem>,
      required: true,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
  },
  setup(props) {
    const { getLabel } = new BaseTranslateComponent();
    return {
      getLabel: (name: string) => getLabel(props.tranStore, name),
    };
  },
  methods: {
    isActiveRoute() {
      return this.routeService.getCurrentPath() === this.menuItem.link;
    },
    getBorderStyle() {
      return this.isActiveRoute()
        ? "border-right: 5px solid var(--q-primary);"
        : "border-right: 5px solid transparent;";
    },
    getColorStyle() {
      return this.isActiveRoute() ? "primary" : "black";
    },
    getLabelStyle() {
      return this.isActiveRoute() ? "text-primary" : "black";
    },
    goToPath() {
      this.routeService.goTo(this.menuItem.link);
    },
  },
});
</script>
