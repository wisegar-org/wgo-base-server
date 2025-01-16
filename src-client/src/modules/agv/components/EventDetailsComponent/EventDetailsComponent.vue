<template>
  <div>
    <div>
      <div v-if="imgList.length === 1">
        <q-img
          height="calc(min(600px,50vw))"
          class="bg-grey-1 rounded-borders"
          :src="imgList[0]"
          fit="contain"
        />
      </div>
      <q-carousel
        v-else-if="showCarousel()"
        animated
        v-model="slide"
        :arrows="showArrow()"
        :navigation="showArrow()"
        infinite
        control-type="unelevated"
        control-color="primary"
        height="calc(min(600px,50vw))"
        class="bg-grey-1 rounded-borders"
      >
        <q-carousel-slide
          class="q-pa-none"
          v-for="(slide, index) in imgList"
          :key="index"
          :name="index"
          :img-src="slide"
          style="background-repeat: no-repeat; background-size: contain"
        >
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="block-text-card">
      <h1 style="font-size: xx-large">
        {{ item.title }}
      </h1>
      <h5>Anno scolastico: {{ item.class }}</h5>
      <p class="text-body1" v-html="item.description"></p>
    </div>
    <EventEnrollmentForm v-if="enrollment" :event="item" />
  </div>
</template>

<script lang="ts" src="./EventDetailsComponent.ts" />

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

.block-text-card {
  padding-top: 3rem;
  padding-bottom: 1rem;
}
</style>
