<template>
  <q-footer>
    <div v-if="$q.screen.gt.sm" class="row flex space-between">
      <div class="text-body col-2 self-center q-px-sm">
        <div class="q-pa-none">Version: {{ version }}</div>
      </div>
      <div class="text-center q-toolbar__title q-pa-sm col-md-8 col-10">
        Copyright © Assemblea Genitori Vezia {{ getYear() }}
      </div>
      <div class="col-2">
        <SocialMedia class="q-pr-sm justify-end" :size="40" />
      </div>
    </div>
    <div v-else class="row justify-center">
      <div class="text-center text-h6 q-py-sm col-10">
        <div class="q-pa-none">Copyright ©</div>
        <div class="q-pa-none">Assemblea Genitori Vezia</div>
        <div class="q-pa-none">
          {{ getYear() }}
        </div>
      </div>

      <div class="col-12 q-py-none">
        <SocialMedia :size="56" class="justify-center" />
      </div>
      <div class="text-body col-12 self-center text-center q-pt-sm">
        <div class="q-pa-none">Version: {{ version }}</div>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts" src="./FooterComponent.ts" />