<template>
  <div class="q-pa-none q-gutter-sm">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        {{ label }}
      </q-card-section>
      <q-editor
        dense
        ref="editorRef"
        @paste="onPaste"
        max-height="150px"
        min-height="5rem"
        v-model="toEdit[propToEdit]"
        :toolbar="toolbar"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { StringDictionary } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "EditorToolbar",
  props: {
    toEdit: { type: Object as PropType<StringDictionary>, required: true },
    propToEdit: { type: String, required: true },
    label: { type: String, default: "" },
    hideFonts: { type: Boolean, default: true },
    hideViewCode: { type: Boolean, default: true },
    hideAlign: { type: Boolean, default: true },
    hideFormat: { type: Boolean, default: true },
    hideFontFormating: { type: Boolean, default: true },
    hideInsertTypes: { type: Boolean, default: true },
  },
  data() {
    this.toEdit[this.propToEdit] = this.toEdit[this.propToEdit] || "";
    const toolbar: any[] = [];
    if (!this.hideViewCode) toolbar.push(["fullscreen", "viewsource"]);
    toolbar.push(["undo", "redo"]);
    if (!this.hideAlign)
      toolbar.push([
        {
          label: (this as any).$q.lang.editor.align,
          icon: (this as any).$q.iconSet.editor.align,
          fixedLabel: true,
          list: "only-icons",
          options: ["left", "center", "right", "justify"],
        },
      ]);

    if (!this.hideFormat)
      toolbar.push(
        ["bold", "italic", "strike", "underline", "subscript", "superscript"],
        ["quote", "unordered", "ordered", "outdent", "indent"]
      );

    if (!this.hideInsertTypes)
      toolbar.push(["token", "hr", "link", "custom_btn"]);
    if (!this.hideFontFormating)
      toolbar.push([
        {
          label: (this as any).$q.lang.editor.formatting,
          icon: (this as any).$q.iconSet.editor.formatting,
          list: "no-icons",
          options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
        },
        {
          label: (this as any).$q.lang.editor.fontSize,
          icon: (this as any).$q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "size-1",
            "size-2",
            "size-3",
            "size-4",
            "size-5",
            "size-6",
            "size-7",
          ],
        },
        {
          label: (this as any).$q.lang.editor.defaultFont,
          icon: (this as any).$q.iconSet.editor.font,
          fixedIcon: true,
          list: "no-icons",
          options: [
            "default_font",
            "arial",
            "arial_black",
            "comic_sans",
            "courier_new",
            "impact",
            "lucida_grande",
            "times_new_roman",
            "verdana",
          ],
        },
        "removeFormat",
      ]);

    return {
      toolbar,
    };
  },
  methods: {
    onPaste(evt: any) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === "INPUT") return;
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        (this.$refs.editorRef as any).runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        (this.$refs.editorRef as any).runCmd("insertText", text);
      } else if (
        (window as any).clipboardData &&
        (window as any).clipboardData.getData
      ) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          (this.$refs.editorRef as any).runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },
  },
});
</script>

<style scoped>
.label_component {
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.border_component_editor:hover {
  border-color: rgba(0, 0, 0, 1);
}
</style>
