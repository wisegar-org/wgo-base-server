<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <NsLtInscriptionAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NsLtInscriptionAdminComponent from "../../../components/newsletter/newsletter-inscriptions/newsletter-inscriptions.components.vue";

export default defineComponent({
  name: "AdminNewsletterInscriptionsPage",
  components: {
    NsLtInscriptionAdminComponent,
  },
});
</script>
