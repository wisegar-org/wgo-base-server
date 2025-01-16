<template>
  <DialogVue
    :open="open"
    icon="how_to_reg"
    :title="getLabel(translations.INSC_DIALOG_TITLE)"
    :persistent="true"
    :showClose="true"
    maxWidth="600px"
    @close="() => $emit('close', false)"
  >
    <div>
      <div class="row">
        <q-form @submit="saveInscription">
          <div class="col-12 col-md-6 q-px-md q-pt-md">
            <q-input
              square
              outlined
              class="q-ma-sm"
              dense
              required
              v-model="inscription.email"
              type="email"
              lazy-rules="ondemand"
              label="Indirizzo email"
              :rules="[
                (val) => (!!val && isValid()) || 'Il campo è obbligatiorio',
              ]"
            />
          </div>
          <div class="col-12 col-md-6 q-px-md">
            <q-select
              class="q-ma-sm"
              dense
              filled
              required
              :readonly="!inscription.id"
              v-model="inscription.status"
              label="Stato"
              :options="statusOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <q-card-section class="justify-center text-primary row">
            <q-btn
              unelevated
              @click="() => $emit('close', false)"
              color="primary"
              align="center"
              class="col-12 col-sm-auto q-mt-sm q-mx-xl"
              :label="getLabel(transBase.CLOSE)"
              style="min-width: 150px"
            />
            <q-btn
              unelevated
              type="submit"
              color="primary"
              align="center"
              class="col-12 col-sm-auto q-mt-sm q-mx-xl"
              :label="getLabel(transBase.SAVE)"
              style="min-width: 150px"
            />
          </q-card-section>
        </q-form>
      </div>
    </div>
  </DialogVue>
</template>

<script lang="ts" src="./NsLtInscriptionAdminEditor.ts" />