<template>
  <q-card flat class="fit">
    <q-card-section class="q-pt-md q-pb-none">
      <div class="row items-center justify-between q-table">
        <div class="col-12 col-sm-auto no-wrap">
          <div class="q-table__title ellipsis text-h6">
            {{ getLabel(translations.TITLE) }}:
            {{ getLabel(getTranslationKey(template.title)) }}
          </div>
        </div>
        <div class="flex justify-end col-12 col-sm-auto row">
          <div class="col-12 col-sm-auto q-ml-sm row">
            <q-btn
              unelevated
              color="primary"
              icon="send"
              :label="getLabel(translations.SEND_TEST)"
              class="col-12 q-my-sm"
              no-caps
              @click="sendTest"
            />
          </div>
          <div v-if="objectToken.length" class="col-12 col-sm-auto q-ml-sm row">
            <q-btn-dropdown
              unelevated
              color="primary"
              label="Tokens"
              class="col-12 q-my-sm"
            >
              <q-list>
                <q-item
                  v-for="(item, key) in objectToken"
                  :key="'tempateeditor-' + key"
                  clickable
                  v-close-popup
                  @click="() => writeToken(item)"
                >
                  <q-item-section>
                    <q-item-label>{{ item }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="col-12 col-sm-auto q-ml-sm row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(transBase.SAVE)"
              class="col-12 q-my-sm"
              no-caps
              @click="onSave"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <div ref="placeholder" style="height: 1px"></div>
    <q-card-section :style="`height: ${componentHeight}px`">
      <QCKEditor
        v-model="template.body"
        :height="`${componentHeight - 34}px`"
        :urlApi="urlApi"
        ref="editor"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" src="./TemplateAdminComponent.ts" />