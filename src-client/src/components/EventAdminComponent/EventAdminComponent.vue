<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <TableVue
      :title="translations.TITLE"
      :data="events"
      :schema="schema"
      :height="componentHeight"
      :countData="eventsCount"
      :page="page"
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
              v-model="filterObj.title"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              :label="getLabel(translations.COLUMN_TITLE)"
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
              :options="classOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              filled
              dense
              clearable
              v-model="filterObj.type"
              :label="getLabel(translations.COLUMN_TYPE)"
              :options="typeOptions"
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
              v-model="filterObj.state"
              :label="getLabel(translations.COLUMN_STATE)"
              :options="stateOptions"
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
              v-model="filterObj.enrollment"
              :label="getLabel(translations.COLUMN_ENROLLMENT)"
              :options="enrollmentOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
              emit-value
              map-options
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.visible"
              :label="getLabel(translations.COLUMN_VISIBLE)"
              :options="visibleOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
              emit-value
              map-options
            />
          </div>
        </div>
      </template>
    </TableVue>
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts" src="./EventAdminComponent.ts" />