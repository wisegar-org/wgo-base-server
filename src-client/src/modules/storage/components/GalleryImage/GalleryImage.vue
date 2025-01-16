<template>
  <div class="q-pa-none q-gutter-sm">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        <div class="row items-center no-wrap justify-between">
          <div class="col">
            {{ label }}
          </div>
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="add"
              :label="btnLabel"
              class="q-ml-sm"
              no-caps
              @click="addImageToGallery"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="mediaListCheck.length">
        <div class="row">
          <div
            v-for="(media, index) in mediaListCheck"
            :key="id_input + index"
            class="col-12 col-sm-4 q-pa-sm"
          >
            <q-img
              :src="media.url"
              :ratio="19 / 9"
              width="100%"
              fit="contain"
              class="rounded-borders cursor-pointer"
              @click="() => deleteFile(media)"
            >
              <q-icon
                v-if="!media.delete"
                class="absolute all-pointer-events bg-white rounded-borders"
                size="20px"
                name="done"
                color="primary"
                style="
                  top: 8px;
                  left: 8px;
                  border-color: primary;
                  border-style: solid;
                "
              />
              <q-icon
                v-else
                class="absolute all-pointer-events bg-white rounded-borders"
                size="20px"
                name="clear"
                color="red"
                style="
                  top: 8px;
                  left: 8px;
                  border-color: primary;
                  border-style: solid;
                "
              />
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-file
      @input="
        (val) => {
          onChangeUploadImage(val);
        }
      "
      :ref="id_input"
      accept="image/*"
      style="display: none"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  IMediaResponseCheck,
  IMediaResponse,
  IMediaInputArg,
} from "@wisegar-org/wgo-base-models/build/storage";
import { MediaService } from "../../services/MediaService";

export default defineComponent({
  name: "GalleryImage",
  props: {
    label: {
      type: String,
      default: "",
    },
    btnLabel: {
      type: String,
      default: "",
    },
    mediaList: {
      type: Array as PropType<IMediaResponse[]>,
      default: [],
    },
    urlApi: { type: String, required: true },
  },
  data() {
    const mediaListCheck: IMediaResponseCheck[] = (this.mediaList || []).map(
      (media: any) => ({ ...media, delete: false } as IMediaResponseCheck)
    );
    return {
      mediaListCheck,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
    };
  },
  methods: {
    addImageToGallery() {
      (this.$refs[this.id_input] as any).pickFiles();
    },
    getAddItems() {
      return this.mediaListCheck
        .filter((media: IMediaResponseCheck) => !media.delete)
        .map((media: IMediaResponseCheck) => media as IMediaResponse);
    },
    deleteFile(file: IMediaResponseCheck) {
      file.delete = !file.delete;
      this.$emit("onModify", this.getAddItems());
    },
    async onChangeUploadImage(file: any) {
      const mediaService = new MediaService();
      const result = await mediaService.uploadFile(
        <IMediaInputArg>{
          file: file.target.files[0],
          isPublic: true,
        },
        this.urlApi
      );
      if (result && result.id) {
        this.mediaListCheck.push({
          ...result,
          delete: false,
        } as IMediaResponseCheck);
        this.$emit("onModify", this.getAddItems());
      }
    },
  },
  watch: {
    mediaList() {
      this.mediaListCheck = this.mediaList.map(
        (media: any) => ({ ...media, delete: false } as IMediaResponseCheck)
      );
    },
  },
  emits: ["onModify"],
});
</script>
