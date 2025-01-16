<template>
  <div
    class="myckeditor"
    :style="{
      border: '1px solid #695656',
    }"
  >
    <div v-if="label" class="q-py-sm label_component">
      {{ label }}
    </div>
    <div
      :style="{
        height: height,
      }"
    >
      <ckeditor
        :modelValue="modelValue"
        :editor="editor"
        @input="onInput"
        @ready="onReady"
        :config="editorConfig"
        ref="editor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import { UploadAdapter } from "./UploadAdapter";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default defineComponent({
  name: "QCKEditor",
  props: {
    height: {
      type: String,
      default: "",
    },
    label: { type: String, default: "" },
    urlApi: { type: String, required: true },
    required: { type: Boolean, default: false },
    modelValue: { type: String, default: "" },
  },
  components: {
    ckeditor: (CKEditor as any).component,
  },
  model: {
    prop: "text",
    event: "change",
  },
  data() {
    return {
      text: "",
      editor: DecoupledEditor,
      editorConfig: {},
    };
  },
  methods: {
    onReady(editor: any) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: any
      ) => {
        return new UploadAdapter(loader, this.urlApi);
      };
    },
    onInput(text: string) {
      this.$emit("update:modelValue", text);
    },
    validate() {
      return !this.required || !!this.text;
    },
  },
});
</script>

<style scoped>
.ck-content {
  height: calc(100% - 40px);
}
.cke_chrome {
  border: 1px solid #695656;
}
.label_component {
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
