import { defineComponent } from "vue";
import SocialMedia from "../SocialMedia/SocialMedia.vue";

export default defineComponent({
  name: "FooterComponent",
  components: {
    SocialMedia,
  },
  setup() {
    return {
      version: process.env.VERSION,
    };
  },
  methods: {
    getYear() {
      const day = new Date();
      return day.getFullYear();
    },
  },
});
