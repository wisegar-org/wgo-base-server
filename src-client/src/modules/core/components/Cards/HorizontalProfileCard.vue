<template>
  <q-card
    flat
    bordered
    class="row q-py-md"
    style="
      align-content: space-between;
      justify-content: space-evenly;
      text-align: center;
    "
  >
    <div
      class="col-5 flex"
      style="
        height: 350px;
        align-content: center;
        justify-content: center;
        align-self: center;
      "
    >
      <q-card-section>
        <div class="flex justify-center self-center">
          <q-avatar v-if="!!image && !!image.url" :size="avatarSize">
            <q-img
              class="bg-grey-1 rounded-borders"
              :src="image.url"
              :ratio="1"
            />
          </q-avatar>
          <q-avatar v-else color="primary" :icon="icon" :size="avatarSize" />
        </div>
      </q-card-section>
    </div>
    <q-card-section
      class="col-12 col-sm-7 row align-content: space-between; q-mt-sm q-mb-lg"
    >
      <div class="col-12" style="height: 100%">
        <div class="text-body1">{{ getName() }}</div>
        <div class="text-grey-7 text-body1" v-html="getDescription()" />
      </div>
      <div class="col-12 q-pb-lg text-body1">
        <a :href="getMailTo()" target="_blank"> {{ email }} </a>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IMediaModel } from "@wisegar-org/wgo-base-models/build/core";
import { UtilService } from "../../services/UtilService";
import MediaDiv from "../MediaDiv/MediaDiv.vue";
import { minText } from "./Utils";

export default defineComponent({
  name: "HorizontalProfileCard",
  props: {
    image: { type: Object as PropType<IMediaModel> },
    icon: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  components: {
    MediaDiv,
  },
  setup() {
    return {
      avatarSize: "270px",
    };
  },
  methods: {
    getMailTo() {
      return `mailto:${this.email}`;
    },
    getName() {
      return UtilService.removeTags(this.name);
    },
    getDescription() {
      return minText(UtilService.removeTags(this.description), 1500, 3);
    },
  },
});
</script>
