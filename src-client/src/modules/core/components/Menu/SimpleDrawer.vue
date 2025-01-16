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
      :breakpoint="0"
      bordered
      fullWidth
      overlay
      behavior="mobile"
      @click="openMenu"
      :side="side"
    >
      <q-scroll-area class="fit bg-primary">
        <q-tabs shrink vertical class="text-white">
          <q-route-tab
            v-for="(path, key) in items"
            :key="'webMenu-' + key"
            :name="path.label"
            :label="getLabel(path.label)"
            class="q-px-md"
            :to="path.link"
          />
          <q-btn
            class="text-white col-12"
            v-if="isUserAdmin()"
            flat
            stretch
            :label="getLabel(translations.APP_ADMIN_TITLE)"
            @click="openNewTab"
          />
        </q-tabs>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteService } from "../../services/RouteService";
import { BaseTranslateComponent } from "../BaseComponents";
import LeftDrawerList from "./LeftDrawerList.vue";
import { translations } from "@wisegar-org/wgo-base-models/build/core";
import { IMenuItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { AuthStore } from "../../../authentication/store/AuthStore";
import { AdminBasePath } from "@wisegar-org/wgo-base-models/build/core/router";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";

export default defineComponent({
  name: "SimpleDrawer",
  props: {
    items: {
      type: Array as PropType<IMenuItem[]>,
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
      translations,
    };
  },
  setup(props) {
    const { getLabel } = new BaseTranslateComponent();
    return {
      adminPath: AdminBasePath,
      getLabel: (name: string) => getLabel(props.tranStore as any, name),
    };
  },
  methods: {
    openMenu() {
      this.show = !this.show;
    },
    isUserAdmin() {
      return this.authStore.isUserInRole([SUPERADMIN]);
    },
    openNewTab(evnt: Event) {
      evnt.preventDefault();
      this.$emit("openAdmin");
    },
  },
  emits: ["openAdmin"],
});
</script>
