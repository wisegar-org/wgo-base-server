<template>
  <q-card flat>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      v-if="appContentStore.pollDataObj.labels"
    >
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.nome"
        standout="bg-primary text-white"
        label="Nome *"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[
          (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
        ]"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.cognome"
        standout="bg-primary text-white"
        label="Cognome *"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[
          (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
        ]"
      />
      <q-select
        v-if="!!appContentStore.pollDataObj.labels.class"
        class="q-my-sm"
        filled
        v-model="formContact.class"
        :label="`${appContentStore.pollDataObj.labels.class} *`"
        :options="appContentStore.pollDataObj.options.class"
        standout="bg-primary text-white"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[
          (val) => (!!val && val.length > 0) || 'Il campo è obbligatiorio',
        ]"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.email"
        standout="bg-primary text-white"
        type="email"
        lazy-rules="ondemand"
        label="Indirizzo email *"
        autocomplete="new-password"
        :rules="[
          (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
        ]"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.phone"
        standout="bg-primary text-white"
        label="Telefono *"
        type="number"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[
          (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
        ]"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.message"
        standout="bg-primary text-white"
        type="textarea"
        label="Messaggio"
        autocomplete="new-password"
        lazy-rules="ondemand"
      />

      <div class="row display-flex justify-center q-my-sm">
        <q-btn unelevated label="Invia" type="submit" color="primary" />
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts" src="./EventEnrollmentForm.ts" />
