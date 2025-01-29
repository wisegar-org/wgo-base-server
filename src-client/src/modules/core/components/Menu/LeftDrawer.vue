<template>
  <div>
    <q-btn
      flat
      dense
      round
      unelevated
      icon="menu"
      aria-label="Menu"
      @click="openMenu"
    />
    <q-drawer
      v-model="show"
      :width="350"
      :breakpoint="500"
      :mini="!show || minState"
      bordered
      content-class="bg-grey-3 hide-scrollbar fit"
      :side="side"
    >
      <q-scroll-area class="text-black fit">
        <q-list class="fit">
          <q-item v-if="authStore.user" clickable @click="toogleMinState">
            <div class="column full-width">
              <div class="row justify-center full-width">
                <q-avatar
                  :size="minState ? '32px' : '72px'"
                  :font-size="minState ? '32px' : '72px'"
                  icon="account_circle"
                  text-color="black"
                >
                </q-avatar>
              </div>
              <div
                class="text-subtitle1 row justify-center full-width ellipsis"
                style="white-space: nowrap"
                v-if="!minState"
              >
                {{ authStore.user.email }}
              </div>
            </div>
          </q-item>
          <q-separator v-if="authStore.user" />
          <LeftDrawerList
            :items="items"
            :tranStore="tranStore"
            :authStore="authStore"
            :routeService="routeService"
            :minState="minState"
            class="fit"
          />
        </q-list>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="
            () => {
              toogleMinState();
            }
          "
        />
      </div>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AuthStore } from "../../../authentication/store/AuthStore";
import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { RouteService } from "../../../../services/RouteService";
import LeftDrawerList from "./LeftDrawerList.vue";

export default defineComponent({
  name: "LeftDrawer",
  props: {
    items: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
    side: { type: String as PropType<"left" | "right">, default: "left" },
  },
  components: {
    LeftDrawerList,
  },
  data() {
    return {
      show: false,
      minState: false,
    };
  },
  setup() {},
  methods: {
    openMenu() {
      this.show = !this.show;
    },
    toogleMinState() {
      this.minState = !this.minState;
    },
  },
});
</script>

<style scoped>
.q-scrollarea__content {
  width: fit-content !important;
}
</style>
