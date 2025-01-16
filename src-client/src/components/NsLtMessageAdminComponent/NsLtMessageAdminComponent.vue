<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <TableVue
      :title="translations.MSG_TITLE"
      :data="messages"
      :schema="schema"
      :height="componentHeight"
      :countData="messagesCount"
      @getPagination="getDataByConfig"
    >
      <template v-slot:subtitle>
        <div class="fit row col-12 justify-end">
          <div class="col-12 col-md-3">
            <q-input
              dense
              filled
              clearable
              class="q-ma-sm"
              v-model="filterObj.title"
              type="email"
              lazy-rules="ondemand"
              debounce="500"
              :label="getLabel(translations.MSG_COLUMN_TITLE)"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.status"
              :label="getLabel(translations.MSG_COLUMN_STATUS)"
              :options="statusOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
        </div>
      </template>
    </TableVue>
  </div>
</template>

<script lang="ts" src="./NsLtMessageAdminComponent.ts" />