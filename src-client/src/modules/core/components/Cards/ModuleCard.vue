<template>
  <q-card
    flat
    bordered
    class="row q-py-md cursor-pointer"
    style="
      min-height: 480px;
      align-content: space-between;
      justify-content: space-evenly;
      text-align: center;
    "
    clickable
    @click="goToPath"
  >
    <div class="col-12">
      <q-card-section>
        <div class="flex justify-center">
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

      <q-card-section>
        <div>{{ name }}</div>
        <div class="q-pt-none text-grey-7" v-html="getDescription()" />
      </q-card-section>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MediaDiv from "../MediaDiv/MediaDiv.vue";
import { minText } from "./Utils";
import { useRoute } from "vue-router";
import { IMediaModel } from "@wisegar-org/wgo-base-models/build/core";

export default defineComponent({
  name: "ModuleCard",
  props: {
    image: { type: Object as PropType<IMediaModel> },
    icon: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    path: { type: String, default: "" },
    labelBtn: { type: String, default: "" },
  },
  components: {
    MediaDiv,
  },
  setup() {
    const route = useRoute();
    return {
      route,
      avatarSize: "170px",
    };
  },
  methods: {
    goToPath() {
      if ((this as any).$route.path !== this.path) {
        window.open(this.path, "_blank");
        // void this.$router.push(this.path);
      }
    },

    getDescription() {
      return minText(this.description, 300, 3);
    },
  },
});
</script>
