<template>
  <div class="row display-flex justify-center">
    <div ref="placeholder" style="height: 1px" />
    <div v-if="!loading" class="col-12">
      <div v-for="(item, key) in items" :key="key" class="q-pa-none q-py-md">
        <ItemComponent :item="item" @onItemClick="onClick" />
      </div>
    </div>
    <div v-else class="q-pt-xl q-pb-md">
      <q-spinner size="50px" color="primary" />
    </div>
  </div>
</template>

<script lang="ts" src="./ItemListComponent.ts" />