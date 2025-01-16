import { AgvEventResponseModel } from "src/models/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ItemComponent",
  props: {
    item: {
      type: Object as PropType<AgvEventResponseModel>,
      required: true,
    },
  },
  methods: {
    getBasicImage() {
      if (this.item && this.item.imgTitle) return this.item.imgTitle;
      return "https://cdn.quasar.dev/img/parallax1.jpg";
    },
    onClick() {
      this.$emit("onItemClick", this.item);
    },
  },
  emits: ["onItemClick"],
});
