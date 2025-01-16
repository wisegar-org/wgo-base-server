<template>
  <q-toolbar class="full-width">
    <q-avatar @click="goToHome" class="cursor-pointer">
      <img src="icons/favicon.png" alt="favicon" />
    </q-avatar>
    <div
      class="text-h6 q-px-md col-10 col-sm-9 col-md-6"
      style="max-width: 450px; font-size: 21px; font-weight: normal"
    >
      <div class="cursor-pointer" @click="goToHome" style="width: fit-content">
        {{ getLabel(title) }}
      </div>
    </div>
    <q-tabs align="right" class="fit flex justify-between">
      <q-route-tab
        v-for="(path, key) in menuList"
        :key="'webMenu-' + key"
        :name="path.name"
        :label="getLabel(path.label)"
        class="q-px-md fit"
        :to="path.path"
      />
      <q-btn
        v-if="isUserAdmin()"
        flat
        stretch
        class="q-tab--inactive q-px-md fit"
        :label="getLabel(transBase.APP_ADMIN_TITLE)"
        @click="openNewTab"
      />
    </q-tabs>
  </q-toolbar>
</template>

<script lang="ts" src="./WebHeader.ts" />

<style scoped>
.q-tab--inactive {
  max-width: 160px !important;
}
.q-tab--active {
  max-width: 160px !important;
}
</style>
