import { IAddressItem } from "src/models/Item";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "LinkCard",
  props: {
    item: {
      type: Object as PropType<IAddressItem>,
      default: { img: "", name: "", url: "" } as IAddressItem,
    },
  },
  methods: {
    getBasicImage() {
      if (this.item && this.item.img) return this.item.img;
      return "https://cdn.quasar.dev/img/parallax1.jpg";
    },
  },
});
