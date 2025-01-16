<template>
  <q-header>
    <WebHeader
      v-if="$q.screen.width >= 1024"
      :title="getLabel(transBase.APP_TITLE)"
      :menuList="paths"
    />
    <MobileHeader
      v-else
      :title="getLabel(transBase.APP_TITLE)"
      :menuList="paths"
    />
  </q-header>
</template>

<script lang="ts" src="./HeaderComponent.ts" />