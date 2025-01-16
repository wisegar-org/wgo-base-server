<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <ComitatoAdminContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComitatoAdminContent from "../../components/ComitatoAdminContent/ComitatoAdminContent.vue";

export default defineComponent({
  name: "AdminComitatoContentPage",
  components: {
    ComitatoAdminContent,
  },
});
</script>
