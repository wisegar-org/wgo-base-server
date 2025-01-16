<template>
  <q-card flat class="fit">
    <q-card-section class="q-py-md">
      <div class="row items-center justify-between q-table">
        <div class="col-12 col-sm-auto no-wrap">
          <div class="q-table__title ellipsis text-h6">
            {{ getLabel(translations.TITLE_SM) }}
          </div>
        </div>
        <div class="flex justify-end col-12 col-sm-auto row">
          <q-btn
            unelevated
            color="primary"
            icon="save"
            :label="getLabel(transBase.SAVE)"
            @click="() => onSaveData()"
            class="col-12 col-sm-auto"
            no-caps
          />
        </div>
      </div>
    </q-card-section>
    <div ref="placeholder" style="height: 1px"></div>
    <q-card-section>
      <div class="q-py-sm">
        <q-input
          dense
          filled
          v-model="data.facebook"
          lazy-rules="ondemand"
          label="Facebook"
          clearable
        >
          <template v-slot:after>
            <q-btn
              :disabled="!data.facebook"
              round
              dense
              flat
              icon="open_in_new"
              @click="(evnt) => goToLink(evnt, data.facebook)"
            />
          </template>
        </q-input>
      </div>
      <div class="q-py-sm">
        <q-input
          dense
          filled
          v-model="data.instagram"
          lazy-rules="ondemand"
          label="Instagram"
          clearable
        >
          <template v-slot:after>
            <q-btn
              :disabled="!data.instagram"
              round
              dense
              flat
              icon="open_in_new"
              @click="(evnt) => goToLink(evnt, data.instagram)"
            />
          </template>
        </q-input>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./SocialMediaAdminContent.ts" />