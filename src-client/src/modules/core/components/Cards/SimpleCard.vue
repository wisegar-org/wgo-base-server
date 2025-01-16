<template>
  <q-card flat bordered style="min-height: 350px" class="text-center q-pa-md">
    <q-card-section class="q-pb-none">
      <div class="text-body1 q-pb-sm">{{ getTitle() }}</div>
    </q-card-section>

    <q-card-section
      class="q-pt-none text-grey-7 text-body1"
      v-html="getDescription()"
    >
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { minText } from "./Utils";
import { UtilService } from "../../services/UtilService";

export default defineComponent({
  name: "SimpleCard",
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  methods: {
    getTitle() {
      return UtilService.removeTags(this.title);
    },
    getDescription() {
      return minText(UtilService.removeTags(this.description), 380, 3);
    },
  },
});
</script>
