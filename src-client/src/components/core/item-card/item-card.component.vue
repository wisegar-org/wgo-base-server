<template>
  <q-card class="my-card" flat>
    <div class="text-h5 q-mt-sm q-mb-xs text-center">
      {{ title }}
    </div>
    <div
      class="row justify-center centers items-center"
      style="height: 250px; width: auto"
      v-if="item"
    >
      <q-icon
        v-if="!item.imgTitle"
        size="300px"
        name="photo"
        color="primary"
        @click="() => onItemClick()"
        class="cursor-pointer"
      />
      <img
        v-else
        rounded-borders
        fill
        :alt="item.imgTitle.url"
        style="max-width: 350px; height: 100%; border-radius: 10px"
        @click="() => onItemClick()"
        :src="item.imgTitle.url"
        class="cursor-pointer"
        img-class="roundImage"
      />
    </div>
    <q-card-section v-if="item">
      <div class="text-h5 q-my-sm">
        <q-item
          clickable
          v-ripple
          @click="() => onItemClick()"
          class="justify-center"
        >
          {{ item.title }}
        </q-item>
      </div>
      <div class="text-body1 text-grey text-justify">
        <div v-html="item.shortDescription" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./item-card.component.ts" />

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

.roundImage
    border-radius: 10px
</style>
