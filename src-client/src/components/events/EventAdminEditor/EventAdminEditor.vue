<template>
  <div class="fit">
    <q-card-section class="q-py-sm">
      <div class="row" style="width: 100%">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6 text-left">
              {{ getLabel(translations.EDITOR_TITLE) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <div class="col-12 col-sm-auto q-ml-sm q-mb-sm">
              <q-btn
                outline
                color="primary"
                text-color="secondary"
                :label="getLabel(transBase.GO_BACK)"
                class="fit"
                no-caps
                @click="$emit('success')"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <div class="flex justify-center">
      <UploadImageDiv
        :img="imgTitle"
        :onSavedImg="setImageTitle"
        :showLoading="appStatusStore.loading"
        :urlApi="urlApi"
        @onSavedImg="setImageTitle"
      />
    </div>
    <q-input
      outlined
      class="q-ma-sm"
      v-model="event.title"
      lazy-rules="ondemand"
      :autofocus="true"
      :label="getLabel(translations.COLUMN_TITLE)"
      :rules="[(val) => !!val || 'Il campo è obbligatiorio']"
    />
    <div class="q-ma-sm q-mb-lg">
      <QCKEditor
        v-model="event.description"
        height="400px"
        :label="getLabel(translations.COLUMN_DESCRIPTION)"
        :urlApi="urlApi"
      />
    </div>
    <div class="q-ma-sm q-mb-lg">
      <QCKEditor
        v-model="event.shortDescription"
        height="200px"
        :label="getLabel(translations.COLUMN_SHORT_DESCRIPTION)"
        :urlApi="urlApi"
      />
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          outlined
          v-model="event.class"
          :label="getLabel(translations.COLUMN_CLASS)"
          :options="classOptions"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[(val) => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          outlined
          v-model="event.type"
          :label="getLabel(translations.COLUMN_TYPE)"
          :options="typeOptions"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[(val) => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          outlined
          v-model="event.state"
          :label="getLabel(translations.COLUMN_STATE)"
          :options="stateOptions"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[(val) => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          clearable
          outlined
          :modelValue="getDateStringValue()"
          readonly
          :label="getLabel(translations.COLUMN_DATES)"
          class="q-pa-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
                ref="startDateEventAdmin"
              >
                <q-date
                  v-model="date"
                  range
                  mask="DD/MM/YYYY"
                  @range-end="() => closePopUp($refs.startDateEventAdmin)"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          :label="getLabel(translations.COLUMN_VISIBLE)"
          v-model="event.visible"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          :label="getLabel(translations.COLUMN_ENROLLMENT)"
          v-model="event.enrollment"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
    </div>
    <div class="q-pa-sm q-pt-lg">
      <GalleryImage
        :onModify="setListImg"
        :label="getLabel(translations.COLUMN_GALLERY)"
        :btnLabel="getLabel(transBase.ADD)"
        :mediaList="imgList"
        :urlApi="urlApi"
        @onModify="setListImg"
      />
    </div>
    <q-card-section class="justify-center text-primary row">
      <q-btn
        outline
        color="primary"
        text-color="secondary"
        @click="() => updateProps()"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto q-mt-sm q-mx-xl"
        :label="getLabel(transBase.SAVE)"
        style="width: 150px"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts" src="./EventAdminEditor.ts" />
