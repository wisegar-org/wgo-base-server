<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <NsLtMessageAdminComponent :page="page" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NsLtMessageAdminComponent from "../../../components/NsLtMessageAdminComponent/NsLtMessageAdminComponent.vue";

export default defineComponent({
  name: "AdminNewsletterMessagesPage",
  components: {
    NsLtMessageAdminComponent,
  },
  props: {
    page: { type: Number, default: 0 },
  },
});
</script>
