<template>
  <DialogVue
    :open="open"
    icon="language"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="() => $emit('close')"
  >
    <div>
      <div class="row">
        <div class="col-12 col-sm-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            v-model="inscription.nome"
            :label="getLabel(translations.COLUMN_NAME)"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            v-model="inscription.cognome"
            :label="getLabel(translations.COLUMN_LAST_NAME)"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            :modelValue="inscription.class || '-'"
            lazy-rules="ondemand"
            :label="getLabel(translations.COLUMN_CLASS)"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            v-model="inscription.email"
            type="email"
            lazy-rules="ondemand"
            :label="getLabel(translations.COLUMN_EMAIL)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            v-model="inscription.phone"
            :label="getLabel(translations.COLUMN_PHONE)"
            type="number"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            class="q-ma-sm"
            readonly
            :modelValue="getFormatDate(inscription.date)"
            :label="getLabel(translations.COLUMN_INSCRIPTION_DATE)"
          />
        </div>
      </div>

      <q-input
        square
        outlined
        class="q-ma-sm"
        readonly
        v-model="inscription.message"
        autogrow
        :label="getLabel(translations.COLUMN_MESSAGE)"
      />

      <q-card-actions class="text-primary justify-center">
        <q-btn
          unelevated
          color="primary"
          align="center"
          class="col-12 col-sm-auto"
          @click="() => $emit('close')"
          :label="getLabel(transBase.CLOSE)"
          style="width: 150px"
        />
      </q-card-actions>
    </div>
  </DialogVue>
</template>

<script lang="ts" src="./InscriptionAdminDetails.ts" />