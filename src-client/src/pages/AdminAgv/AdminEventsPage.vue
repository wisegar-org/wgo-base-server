<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <EventAdminComponent :page="page" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventAdminComponent from "../../components/EventAdminComponent/EventAdminComponent.vue";

export default defineComponent({
  name: "AdminEventsPage",
  components: {
    EventAdminComponent,
  },
  props: {
    page: { type: Number, default: 0 },
  },
});
</script>
