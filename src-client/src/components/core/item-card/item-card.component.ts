import { AgvEventResponseModel } from "src/models/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ItemCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    item: {
      type: Object as PropType<AgvEventResponseModel>,
    },
  },
  methods: {
    getBasicImage() {
      if (this.item && this.item.imgTitle) return this.item.imgTitle.url;
      return "https://cdn.quasar.dev/img/parallax1.jpg";
    },
    onItemClick() {
      if (this.item) this.$emit("onEventClick", this.item);
    },
  },
  emits: ["onEventClick"],
});
