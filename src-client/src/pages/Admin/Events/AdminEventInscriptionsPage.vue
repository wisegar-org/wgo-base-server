<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <InscriptionAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InscriptionAdminComponent from "../../../components/InscriptionAdminComponent/InscriptionAdminComponent.vue";

export default defineComponent({
  name: "AdminEventInscriptionsPage",
  components: {
    InscriptionAdminComponent,
  },
});
</script>
