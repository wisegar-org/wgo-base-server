<template>
  <div>
    <div class="block-text-card-down">
      <TextVue class="q-my-none text-h1" :largeFont="true" text="Chi siamo:" />
      <TextVue
        class="text-body1 q-pt-md"
        text="L’Assemblea Genitori è costituita dai genitori di tutti gli allievi
        della Scuola Elementare e dell’Infanzia e il suo Comitato viene eletto
        durante la riunione annuale."
      />
      <TextVue
        class="text-body1 q-pt-md"
        text="Essa dà l’opportunità ai membri del Comitato di organizzare varie
        attività da svolgere con i bambini durante i doposcuola. È inoltre
        un’occasione di discussione e condivisione di eventuali proposte; si
        deve infatti all’iniziativa dell’Assemblea Generale dei Genitori la
        creazione della mensa scolastica."
      />
      <TextVue
        class="text-body1 q-pt-md"
        text="Il nostro Comitato non è a fine di lucro."
      />
      <br /><br />
      <TextVue
        class="text-body1"
        text="Se siete incuriositi e interessati a entrare nel Comitato Genitori
        sarete i benvenuti! Contattateci tramite il formulario qui sotto:"
      />
      <br />
    </div>
    <ComitatoContactForm />

    <div class="block-text-card-up block-text-card-down" />
    <div
      v-if="contentStore.contentObj.comitatoMembri"
      class="block-text-card-up block-text-card-down"
    >
      <div class="row text-body1">
        <div v-html="contentStore.contentObj.comitatoMembri" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ComitatoComponent.ts" />

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}

.block-text-card-up {
  padding-top: 3rem;
}

.block-text-card-down {
  padding-bottom: 1rem;
}
</style>