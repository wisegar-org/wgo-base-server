<template>
  <q-card flat>
    <q-form @submit="onSubmit">
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
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.email"
        type="email"
        standout="bg-primary text-white"
        label="Indirizzo email *"
        lazy-rules="ondemand"
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
        lazy-rules="ondemand"
        type="number"
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
        autocomplete="new-password"
        label="Messaggio"
      />

      <div class="row display-flex justify-center q-my-sm">
        <q-btn
          outline
          color="primary"
          text-color="secondary"
          label="Invia"
          type="submit"
        />
      </div>
    </q-form>
    <div v-if="showLoader" class="row justify-center q-pt-xl q-pb-md">
      <q-spinner size="50px" color="primary" />
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactForm",
  props: {
    showLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formContact: {
        nome: "",
        cognome: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSend", this.formContact, this.onReset);
    },
    onReset() {
      this.formContact = {
        nome: "",
        cognome: "",
        email: "",
        phone: "",
        message: "",
      };
    },
  },
  emits: ["onSend"],
});
</script>
