<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <TableVue
      :title="translations.TITLE"
      :data="inscriptions"
      :schema="schema"
      :height="componentHeight"
      :countData="inscriptionsCount"
      @getPagination="getDataByConfig"
    >
      <template v-slot:subtitle>
        <div class="fit row col-12">
          <div class="col-12 col-sm-3">
            <q-input
              debounce="500"
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filterObj.nome"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              :label="getLabel(translations.COLUMN_NAME)"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              debounce="500"
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filterObj.email"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              :label="getLabel(translations.COLUMN_EMAIL)"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              debounce="500"
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filterObj.phone"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              :label="getLabel(translations.COLUMN_PHONE)"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              debounce="500"
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filterObj.eventTitle"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              :label="getLabel(translations.COLUMN_EVENT_TITLE)"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.eventClass"
              :label="getLabel(translations.COLUMN_COURSE)"
              :options="eventClassOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.class"
              :label="getLabel(translations.COLUMN_CLASS)"
              :options="appContentStore.pollDataObj.options.class"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
        </div>
      </template>
    </TableVue>
    <InscriptionAdminDetails
      :open="openDialog"
      @close="onClose"
      :inscription="inscriptionSelected"
    />
  </div>
</template>

<script lang="ts" src="./InscriptionAdminComponent.ts" />