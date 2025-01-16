<template>
  <q-card flat class="fit">
    <q-card-section class="q-pt-md q-pb-none">
      <div class="row items-center justify-between q-table">
        <div class="col-12 col-sm-auto no-wrap">
          <div class="q-table__title ellipsis text-h6">
            {{ getLabel(templateTranslations.TITLE) }}:
            {{ getLabel(getTranslationKey()) }}
          </div>
        </div>
        <div class="flex justify-end col-12 col-sm-auto row">
          <div class="col-12 col-sm-auto q-ml-sm row">
            <q-btn
              unelevated
              color="primary"
              icon="send"
              :label="getLabel(templateTranslations.SEND_TEST)"
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
    <Loader :loading="loading" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  ObjectDictionary,
  translations as transBase,
} from "@wisegar-org/wgo-base-models/build/core";
import { ITemplateResponse } from "@wisegar-org/wgo-base-models/build/template";
import QCKEditor from "../../../core/components/CKEditor/QCKEditor.vue";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "../../../core/components/BaseComponents";
import { TemplateService } from "../../../template/services/TemplateService";
import { EmailService } from "../../../email/services/EmailService";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { templateTranslations } from "@wisegar-org/wgo-base-models/build/template/translations";
import Loader from "../../../core/components/Loader/Loader.vue";
import { AuthStore } from "../../../authentication/store/AuthStore";

export default defineComponent({
  name: "TemplateEditor",
  props: {
    type: { type: String, default: "" },
    objectToken: { type: Array as PropType<string[]>, default: () => [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    selectedLangId: { type: Number, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    testData: {
      type: Object as PropType<ObjectDictionary>,
      default: () => ({}),
    },
    urlApi: { type: String, required: true },
  },
  components: {
    QCKEditor,
    Loader,
  },
  data() {
    const template: ITemplateResponse = {
      id: 0,
      body: "",
      documentType: "",
      title: "",
    };
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    return {
      loading: false,
      template,
      transBase,
      templateTranslations,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      getLabel: (name: string) =>
        getLabel(this.tranStore as unknown as TranslationStore, name),
    };
  },
  setup() {
    return {
      templateService: new TemplateService(),
      emailService: new EmailService(),
    };
  },
  methods: {
    async loadTemplate() {
      if (this.type) {
        this.loading = true;
        const template = await this.templateService.getTemplateByType(
          this.type
        );
        this.loading = false;
        if (template) {
          this.template = {
            id: template.id,
            body: template.body,
            title: template.title,
            documentType: template.documentType,
          };
          return;
        }
      }
      this.template = {
        id: 0,
        body: "",
        documentType: "",
        title: "",
      };
    },
    async onSave() {
      if (await this.templateService.setTemplate(this.template)) {
        this.$emit(
          "onSuccess",
          this.getLabel(this.templateTranslations.SAVE_SUCCESS)
        );
      } else {
        this.$emit(
          "onFail",
          this.getLabel(this.templateTranslations.SAVE_FAIL)
        );
      }
    },
    async sendTest() {
      this.loading = true;
      if (
        await this.emailService.sendEmailFromToAddressAndApp({
          subject: `${this.getLabel(this.transBase.TEST)}: ${this.getLabel(
            this.getTranslationKey()
          )}`,
          body: this.template.body,
          to: `<${this.authStore.user?.email}> "${this.authStore.user?.name} ${this.authStore.user?.lastName}"`,
          data: JSON.stringify(this.testData),
        })
      ) {
        this.loading = false;
        this.$emit(
          "onSuccess",
          this.getLabel(this.templateTranslations.SEND_SUCCESS)
        );
        return true;
      } else {
        this.loading = false;
        this.$emit(
          "onFail",
          this.getLabel(this.templateTranslations.SEND_FAIL)
        );
        return false;
      }
    },
    getTranslationKey() {
      return this.type ? `WGO_${this.type.toLocaleUpperCase()}_TITLE` : "";
    },
    writeToken(text: string) {
      const model = (this.$refs.editor as ObjectDictionary).$refs.editor
        .instance.model;

      model.change((writer: ObjectDictionary) => {
        writer.insertText(
          `${text}`,
          model.document.selection.getFirstPosition()
        );
      });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
  },
  watch: {
    type(): void {
      this.loadTemplate();
    },
    selectedLangId(): void {
      this.loadTemplate();
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadTemplate();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["onSuccess", "onFail"],
});
</script>
