<template>
  <q-form class="fit" @submit="saveMessage">
    <q-card flat class="fit">
      <q-card-section class="q-pt-md q-pb-none">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(title) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <div class="col-12 col-sm-auto q-ml-sm row">
              <q-btn
                unelevated
                color="primary"
                icon="send"
                :label="getLabel(translations.MSG_EDITOR_SEND_TEST)"
                class="col-12 q-my-sm"
                no-caps
                @click="sendTest"
              />
            </div>
            <div
              v-if="objectToken.length"
              class="col-12 col-sm-auto q-ml-sm row"
            >
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
                type="submit"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <div ref="placeholder" style="height: 1px"></div>
      <q-card-section :style="`height: ${componentHeight}px`">
        <div>
          <q-input
            dense
            filled
            v-model="message.title"
            lazy-rules="ondemand"
            :label="getLabel(translations.MSG_COLUMN_TITLE)"
            required
            :rules="[(val) => !!val || 'Il campo è obbligatiorio']"
          />
        </div>

        <QCKEditor
          v-model="message.message"
          :height="`${componentHeight - 94}px`"
          :urlApi="urlApi"
          ref="editor"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script lang="ts" src="./NsLtMessageAdminEditor.ts" />