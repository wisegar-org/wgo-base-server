<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <WGTable
      :title="translations.INSC_TITLE"
      :data="inscriptions"
      :schema="schema"
      :height="componentHeight"
      :countData="inscriptionsCount"
      @getPagination="getDataByConfig"
    >
      <template v-slot:subtitle>
        <div class="fit row col-12 justify-end">
          <div class="col-12 col-md-3">
            <q-input
              class="q-ma-sm"
              outline
              color="primary"
              text-color="secondary"
              clearable
              v-model="filterObj.email"
              type="email"
              lazy-rules="ondemand"
              debounce="500"
              :label="getLabel(translations.INSC_COLUMN_EMAIL)"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-select
              class="q-ma-sm"
              clearable
              v-model="filterObj.status"
              :label="getLabel(translations.INSC_COLUMN_STATUS)"
              :options="statusOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
        </div>
      </template>
    </WGTable>
    <NsLtInscriptionAdminEditor
      :open="openDialog"
      :inscription="inscriptionSelected"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" src="./newsletter-inscriptions.components.ts" />
