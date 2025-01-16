<template>
  <div class="q-pa-md">
    <TextVue
      class="text-center text-h1"
      text="Assemblea Genitori Vezia"
      :largeFont="true"
    />
    <TextVue
      class="text-h5 text-center q-pt-md"
      text="BENVENUTI NEL VOSTRO NUOVO SITO"
    />
    <TextVue class="text-body1 q-pt-xl" text="Cari Bambini e Cari Genitori," />
    <TextVue
      class="text-body1 q-pt-sm"
      text="qui troverere le informazioni sui prossimi appuntamenti,
              doposcuola ed eventi organizzati dal Comitato Genitori o dal
              nostro Comune."
    />
    <TextVue
      class="text-body1 q-pt-sm"
      text="Venite a dare un’occhiata... stiamo lavorando per voi!"
    />
    <div class="row justify-center q-py-lg">
      <div class="col-12">
        <BannerComponent
          :text="appContentStore.pollDataObj?.textBanner?.text"
          :button="appContentStore.pollDataObj?.textBanner?.clickText"
          :url="pullPath"
        />
      </div>
    </div>
    <div class="row justify-center q-py-lg">
      <div class="col-12">
        <BannerComponent
          :text="appContentStore.pollDataObj?.textBannerReedme?.text"
          :button="appContentStore.pollDataObj?.textBannerReedme?.clickText"
          :url="rulesPath"
        />
      </div>
    </div>
    <div class="row justify-center" v-if="!loadingEvents">
      <div v-if="!!corso" class="col-sm-8 col-md-6">
        <ItemCard
          title="Prossimo Corso"
          :item="corso"
          @onEventClick="(item: any) => onItemClick(item, false)"
        />
      </div>

      <div v-if="!!evento" class="col-sm-8 col-md-6">
        <ItemCard
          title="Prossimo Evento"
          :item="evento"
          @onEventClick="(item: any) => onItemClick(item, true)"
        />
      </div>
    </div>
    <div v-else class="row justify-center q-pt-xl q-pb-md">
      <q-spinner size="50px" color="primary" />
    </div>
  </div>
</template>

<script lang="ts" src="./HomeComponent.ts" />