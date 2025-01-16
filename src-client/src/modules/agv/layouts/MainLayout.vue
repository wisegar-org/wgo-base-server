<template>
  <q-layout view="hHh Lpr fff" style="display: flex; justify-content: center">
    <HeaderComponent />
    <FooterComponent />
    <q-page-container class="q-pa-sm" style="width: 100%; max-width: 1500px">
      <LogoComponent v-if="$q.screen.width >= 1024" />
      <router-view class="q-py-xl" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "src/components/Layouts/Header/HeaderComponent.vue";
import FooterComponent from "src/components/Layouts/Footer/FooterComponent.vue";
import LogoComponent from "src/components/Layouts/Logo/LogoComponent.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
    LogoComponent,
  },
});
</script>
