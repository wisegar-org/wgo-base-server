<template>
  <q-list>
    <template v-for="(menuItem, index) in items">
      <!-- Simple Item -->
      <LeftDrawerItem
        v-if="menuItem.type === 'item' && isUserInRole(menuItem.role)"
        :key="`${id_group}-item-${index}`"
        :menuItem="menuItem"
        :tranStore="tranStore"
        :authStore="authStore"
        :routeService="routeService"
      />
      <!-- Sub menu item group -->
      <q-list
        v-else-if="menuItem.type === 'group' && isUserInRole(menuItem.role)"
        :key="`${id_group}-group-${index}`"
      >
        <q-item
          clickable
          v-ripple
          @click="() => showSubMenu(menuItem, index)"
          :class="!minState ? 'q-pl-md' : 'q-pl-none'"
          :style="getBorderStyle(menuItem)"
        >
          <q-item-section v-show="menuItem.icon" avatar>
            <q-icon :name="menuItem.icon" :color="getColorStyle(menuItem)" />
          </q-item-section>
          <q-item-section :class="getLabelStyle(menuItem)">
            {{ getLabel(menuItem.label) }}
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              :name="menuItem.status ? 'expand_less' : 'expand_more'"
              :color="getColorStyle(menuItem)"
            />
          </q-item-section>
        </q-item>
        <LeftDrawerList
          v-show="!!showMenu[index]"
          :items="menuItem.items"
          :class="!minState ? 'q-pl-md' : 'q-pl-none'"
          :tranStore="tranStore"
          :authStore="authStore"
          :routeService="routeService"
          :minState="minState"
        />
      </q-list>
      <!-- Separator -->
      <q-separator
        v-else-if="menuItem.type === 'separator' && isUserInRole(menuItem.role)"
        :key="`${id_group}-sep-${index}`"
      />
    </template>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NumberDictionaryG } from "@wisegar-org/wgo-base-models/build/core";
import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import LeftDrawerItem from "./left-drawer-item.component.vue";
import { AuthStore } from "../../../modules/authentication/store/AuthStore";
import { TranslationStore } from "../../../modules/translation/store/TranslationStore";
import { RouteService } from "../../../services/RouteService";
import { BaseTranslateComponent } from "../../../modules/core/components/BaseComponents";
import { UtilService } from "../../../services/UtilService";

export default defineComponent({
  name: "LeftDrawerList",
  props: {
    items: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
    minState: Boolean,
  },
  components: {
    LeftDrawerItem,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const showMenu: NumberDictionaryG<boolean> = {};
    return {
      getLabel: (name: string) => getLabel(this.tranStore, name),
      showMenu,
    };
  },
  setup() {
    const id_group = "group-" + Math.random().toString(36).substring(2, 10);
    return {
      id_group,
    };
  },
  methods: {
    showSubMenu(item: any, index: any) {
      item.status = !item.status;
      this.showMenu[index] = !this.showMenu[index];
    },

    isActiveRoute(item: any) {
      return UtilService.isListActive(
        this.routeService.getCurrentPath() || "",
        item.items
      );
    },

    isUserInRole(roles?: string[]) {
      if (!roles || !this.authStore.isUserLogged()) return false;
      return this.authStore.isUserInRole(roles);
    },

    getBorderStyle(item: any) {
      return this.isActiveRoute(item)
        ? "border-right: 5px solid var(--q-primary);"
        : "border-right: 5px solid transparent;";
    },

    getColorStyle(item: any) {
      return this.isActiveRoute(item) ? "primary" : "";
    },

    getLabelStyle(item: any) {
      return this.isActiveRoute(item) ? "text-primary" : "";
    },
  },
});
</script>
