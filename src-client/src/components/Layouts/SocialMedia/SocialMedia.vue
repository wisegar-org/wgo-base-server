<template>
  <div class="flex self-center fit">
    <q-btn
      v-if="contentStore.contentObj.facebook"
      dense
      flat
      unelevated
      class="q-ml-none"
      fit
      @click="(evnt) => goToLink(evnt, contentStore.contentObj.facebook)"
    >
      <img
        src="../../../assets/icons8-facebook.svg"
        alt="facebook media link"
        :width="size"
        :height="size"
      />
    </q-btn>
    <q-btn
      v-if="contentStore.contentObj.instagram"
      dense
      flat
      unelevated
      class="q-ml-none"
      @click="(evnt) => goToLink(evnt, contentStore.contentObj.instagram)"
    >
      <img
        src="../../../assets/icons8-instagram.svg"
        alt="instagram media link"
        :width="size"
        :height="size"
      />
    </q-btn>
  </div>
</template>

<script lan="ts" src="./SocialMedia.ts" />
