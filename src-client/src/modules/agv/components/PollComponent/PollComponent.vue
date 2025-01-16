<template>
  <q-card
    v-if="!!pollData && !!pollData.header && !!pollData.header.title"
    class="my-card"
    flat
  >
    <q-card-section>
      <div class="row display-flex justify-center">
        <div class="col-0 col-sm-2 col-md-2 image-div-justify">
          <q-img src="icons/favicon.png" fit="contain" />
        </div>

        <q-card-section
          class="
            col-12 col-sm-10 col-md-8 col-lg-8
            column
            display-flex
            justify-center
            self-center
          "
        >
          <div
            class="row display-flex justify-center"
            style="width: 100%; max-width: 800px"
          >
            <div class="col-md-11 col-12 q-pa-sm">
              <div style="display: flex; justify-content: center">
                <h5 class="q-pa-none q-ma-sm text-center text-primary">
                  {{ pollData.header.title }}
                </h5>
              </div>
              <div style="display: flex; justify-content: center">
                <h6 class="q-pa-none q-ma-sm text-center text-primary">
                  {{ pollData.header.address }}
                </h6>
              </div>
              <div style="display: flex; justify-content: center">
                <h6 class="q-pa-none q-ma-sm text-center text-primary">
                  <a>{{ pollData.header.email }}</a>
                </h6>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card-section>
    <q-card-section>
      <div v-html="pollData.content.description" />
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="q-my-lg" v-html="pollData.labels.childGroup" />
        <q-input
          class="q-my-sm"
          filled
          v-model="formPoll.name"
          :label="pollData.labels.name"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
          ]"
        />
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.class"
          :label="pollData.labels.class"
          :options="pollData.options.class"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.photo"
          :label="pollData.labels.photo"
          :options="pollData.options.yesOrNo"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <p class="q-ma-sm" style="color: gray">
          {{ pollData.labels.photoHelp }}
        </p>
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.allergy"
          :label="pollData.labels.allergy"
          standout="bg-primary text-white"
          :options="pollData.options.yesOrNo"
          autocomplete="new-password"
          lazy-rules="ondemand"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <q-input
          v-if="formPoll.allergy === pollData.options.yesOrNo[0]"
          class="q-my-sm"
          filled
          v-model="formPoll.foodAllergy"
          :label="pollData.labels.foodAllergy"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              formPoll.allergy === 'No' ||
              (val && val.length > 0) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.intolerance"
          :label="pollData.labels.intolerance"
          :options="pollData.options.yesOrNo"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <q-input
          v-if="formPoll.intolerance === pollData.options.yesOrNo[0]"
          class="q-my-sm"
          filled
          v-model="formPoll.foodIntolerance"
          :label="pollData.labels.foodIntolerance"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              formPoll.intolerance === 'No' ||
              (val && val.length > 0) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <div class="q-my-lg" v-html="pollData.labels.parentGroup" />
        <q-input
          class="q-my-sm"
          filled
          v-model="formPoll.parentName"
          :label="pollData.labels.parentName"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
          ]"
        />
        <q-input
          class="q-my-sm"
          filled
          v-model="formPoll.parentEmail"
          :label="pollData.labels.parentEmail"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
          ]"
        />
        <q-input
          class="q-my-sm"
          filled
          v-model="formPoll.phone"
          :label="pollData.labels.phone"
          standout="bg-primary text-white"
          type="number"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) => (val && val.length > 0) || 'Il campo è obbligatiorio',
          ]"
        />
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.disposition"
          standout="bg-primary text-white"
          :label="pollData.labels.disposition"
          :options="pollData.options.yesOrNo"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <q-select
          class="q-my-sm"
          filled
          v-model="formPoll.interest"
          :label="pollData.labels.interest"
          standout="bg-primary text-white"
          :options="pollData.options.yesOrNo"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[
            (val) =>
              (!!val && val !== pollData.labels.yesOrNoHolder) ||
              'Il campo è obbligatiorio',
          ]"
        />
        <div class="q-pt-lg" v-html="pollData.content.parting" />
        <div class="row display-flex justify-center q-my-sm">
          <q-btn
            unelevated
            label="Invia"
            type="submit"
            color="primary"
            class="col-12 col-sm-auto q-mt-sm"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./PollComponent.ts" />

<style scoped>
.image-div-justify {
  justify-content: center;
  align-self: center;
}
</style>
