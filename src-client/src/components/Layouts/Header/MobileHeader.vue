<template>
  <q-toolbar>
    <q-avatar @click="goToHome" class="cursor-pointer">
      <img src="icons/favicon.png" alt="favicon" />
    </q-avatar>
    <q-toolbar-title @click="goToHome" class="cursor-pointer">
      {{ title }}
    </q-toolbar-title>
    <SimpleDrawer
      :items="menuItems"
      :authStore="authStore"
      :tranStore="tranStore"
      :routeService="routeService"
      side="right"
      @openAdmin="goToAdmin"
    />
  </q-toolbar>
</template>

<script lang="ts" src="./MobileHeader.ts" />