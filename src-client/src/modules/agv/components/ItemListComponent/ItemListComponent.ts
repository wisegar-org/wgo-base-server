import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { defineComponent, PropType } from "vue";
import ItemComponent from "src/modules/agv/components/ItemComponent/ItemComponent.vue";

export default defineComponent({
  name: "ItemListComponent",
  components: {
    ItemComponent,
  },
  props: {
    items: {
      type: Array as PropType<IItem[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },
  methods: {
    onClick(item: AgvEventResponseModel) {
      this.$emit("onItemClick", item);
    },
  },
  watch: {
    items() {
      this.$nextTick(() => {
        if (window.scrollY > 100) {
          const offset = this.$refs.placeholder as HTMLElement;
          window.scrollTo({ top: offset.offsetTop - 50, behavior: "smooth" });
        }
      });
    },
  },
  emits: ["onItemClick"],
});
