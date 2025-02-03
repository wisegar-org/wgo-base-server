<template>
  <div v-if="!!text">
    <q-banner rounded dense class="bg-grey-3">
      <template v-slot:avatar>
        <q-intersection
          transition="rotate"
          :threshold="0.1"
          style="height: 150px"
        >
          <q-icon name="info" color="primary" size="60px" />
        </q-intersection>
      </template>
      <h4>Banner</h4>
      <div v-html="getLabel(text)" />

      <template v-slot:action>
        <q-btn
          v-if="button"
          outline
          color="primary"
          text-color="secondary"
          :label="getLabel(button)"
          @click="openPage"
        />
      </template>
    </q-banner>
  </div>
</template>

<script lang="ts" src="./banner.component.ts" />
