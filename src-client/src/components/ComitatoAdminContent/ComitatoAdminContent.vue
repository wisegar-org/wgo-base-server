<template>
  <q-card flat class="fit">
    <q-card-section class="q-py-md">
      <div class="row items-center justify-between q-table">
        <div class="col-12 col-sm-auto no-wrap">
          <div class="q-table__title ellipsis text-h6">
            {{ getLabel(translations.TITLE_COMITATO) }}
          </div>
        </div>
        <div class="flex justify-end col-12 col-sm-auto row">
          <q-btn
            outline
            color="primary"
            text-color="secondary"
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
    <q-card-section :style="{ height: `${componentHeight}px` }">
      <Editor
        :toEdit="data"
        propToEdit="content"
        :label="getLabel(translations.TITLE_COMITATO_LABEL)"
        class="fit"
        :fullHeight="true"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./ComitatoAdminContent.ts" />
