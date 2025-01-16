<template>
  <q-card class="my-card" flat style="heigth: 100%; max-heigth: 400px">
    <q-card-section class="row q-pa-none justify-center">
      <q-avatar size="140px">
        <img :src="getBasicImage()" alt="img basic" />
      </q-avatar>
      <p class="text-center full-width q-ma-sm text-body1">{{ item.name }}</p>
      <div class="q-ma-none">
        <a
          class="col-sm-6 col-12 q-pa-sm full-width text-body1"
          :href="item.url"
        >
          Vai al sito
        </a>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./LinkCard.ts" />
  
<style lang="sass" scoped>
h4
    margin: 0.5rem
    padding: 0.5rem
    font-size: 1.5rem

.my-card
    width: 100%

.article-content
    display: inline-block
    vertical-align: top
    padding: 1rem
    line-height: 1.4
    overflow: hidden
    text-overflow: ellipsis
    max-height: 130px
</style>
