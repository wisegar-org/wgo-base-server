<template>
  <q-page class="row justify-evenly">
    <div class="col-12"><SocialMediaAdminContent /></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SocialMediaAdminContent from "../../components/SocialMediaAdminContent/SocialMediaAdminContent.vue";
export default defineComponent({
  name: "AdminSocialMediaContentPage",
  components: {
    SocialMediaAdminContent,
  },
});
</script>