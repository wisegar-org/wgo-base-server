<template>
  <div>
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

    <q-btn unelevated flat dense @click="openLoadFile" :for="id_input" style="">
      <div v-if="!!imageURL">
        <q-img
          :src="imageURL"
          :ratio="ratio"
          :width="width"
          fit="contain"
          class="rounded-borders"
        />
      </div>

      <q-icon v-else :size="sizeIcon" name="photo" color="primary" />
    </q-btn>
    <Loader :loading="showLoader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IMediaModel } from "@wisegar-org/wgo-base-models/build/core";
import { IMediaInputArg } from "@wisegar-org/wgo-base-models/build/storage";
import Loader from "../../../core/components/Loader/Loader.vue";
import { MediaService } from "../../services/MediaService";

export default defineComponent({
  name: "UploadImageDiv",
  components: {
    Loader,
  },
  props: {
    img: {
      type: Object as PropType<IMediaModel>,
    },
    ratio: { type: Number, default: 4 / 3 },
    icon: { type: String, default: "" },
    width: { type: String, default: "min(max(30vw, 250px), 500px)" },
    sizeIcon: { type: String, default: "150px" },
    urlApi: { type: String, required: true },
  },
  data() {
    const imageURL = this.img ? this.img.url : "";
    return {
      imageURL,
    };
  },
  setup(props) {
    const id_input =
      "upload-button-" + Math.random().toString(36).substring(2, 10);

    return {
      id_input,
      showLoader: false,
    };
  },
  methods: {
    openLoadFile() {
      (this.$refs[this.id_input] as any).pickFiles();
    },
    showLoading(loading: boolean) {
      this.showLoader = loading;
      // this.$emit("showLoading", loading);
    },
    async onChangeUploadImage(file: any) {
      this.showLoading(true);
      const mediaService = new MediaService();
      const result = await mediaService.uploadFile(
        <IMediaInputArg>{
          file: file.target.files[0],
          isPublic: true,
        },
        this.urlApi
      );
      if (result && result.id) {
        this.imageURL = result.url as string;
        this.$emit("onSavedImg", result);
      }
      this.showLoading(false);
    },
  },
  watch: {
    img() {
      this.imageURL = this.img ? this.img.url : "";
    },
  },
  emits: ["showLoading", "onSavedImg"],
});
</script>
