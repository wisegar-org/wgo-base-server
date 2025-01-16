<template>
  <q-card class="my-card" flat bordered style="heigth: 100%; max-heigth: 400px">
    <q-card-section class="row q-pa-none">
      <div class="col-md-6 col-12 self-center" style="heigth: 100%">
        <div
          class="row justify-center centers items-center"
          style="height: 100%; width: auto"
        >
          <q-icon
            v-if="!item.imgTitle"
            size="300px"
            name="photo"
            color="primary"
          />
          <img
            v-else
            rounded-borders
            fill
            style="width: 100%; height: 100%; border-radius: 3px"
            :src="item.imgTitle.url"
            :alt="item.imgTitle.url"
            img-class="roundImage"
          />
        </div>
      </div>
      <q-card-section class="col-md-6 col-12 column q-pa-none justify-between">
        <q-card-section>
          <p class="text-h5 text-center full-width">{{ item.title }}</p>
          <q-separator />
          <div
            class="article-content text-justify"
            v-html="item.shortDescription"
          />
        </q-card-section>
        <q-card-section>
          <q-separator />
          <q-card-actions class="display-flex justify-center">
            <q-btn unelevated color="primary" @click="onClick">
              Leggere di più
            </q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./ItemComponent.ts" />