<template>
  <div>
    <h1 class="text-center" style="font-size: xx-large">
      {{ getLabel(title) }}
    </h1>
    <div class="row justify-center">
      <div class="row display-flex justify-between col-12 q-pa-none">
        <div class="col-12 col-md-8">
          <q-input
            outlined
            v-model="textSearch"
            standout="bg-primary text-white"
            label="Ricerca..."
            clearable
            debounce="500"
          />
        </div>
        <div class="col-12 col-md-3">
          <q-select
            outlined
            standout="bg-primary text-white"
            v-model="filterClass"
            :options="options"
            label="Classe"
          />
        </div>
      </div>
    </div>
    <ItemListComponent
      :items="items"
      @onItemClick="onItemClick"
      :loading="loading"
    />
    <div class="flex justify-center q-pt-md">
      <q-pagination
        v-model="pagination.page"
        :max="pagination.max"
        direction-links
        boundary-links
        active-design="unelevated"
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./EventListComponent.ts" /> 