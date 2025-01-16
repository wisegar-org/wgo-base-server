import { ItemState } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { ItemService } from "src/services/Content/ContentService";
import { EventService } from "src/modules/agv/services/EventService/EventService";
import { defineComponent } from "vue";
import EventEnrollmentForm from "../EventEnrollmentForm/EventEnrollmentForm.vue";

export default defineComponent({
  name: "EventDetailsComponent",
  props: {
    itemId: { type: Number, default: 0 },
  },
  components: {
    EventEnrollmentForm,
  },
  data() {
    const item: AgvEventResponseModel = <AgvEventResponseModel>{};
    const slide = 1;
    const nameCourse = "";
    const enrollment = false;
    const imgList: string[] = [];
    return {
      item,
      slide,
      nameCourse,
      enrollment,
      imgList,
      eventService: new EventService(),
      itemService: new ItemService(),
    };
  },
  methods: {
    showArrow(): boolean {
      return !!this.imgList && this.imgList.length > 1;
    },
    showCarousel(): boolean {
      return !!this.imgList && this.imgList.length > 0;
    },
    setItemList() {
      this.imgList = this.item.imgList
        ? this.item.imgList
            .filter((img) => !!img.url)
            .map((img) => img.url || "")
        : [];
    },
  },
  async created() {
    this.item = await this.eventService.getEvent(
      parseInt(this.itemId.toString())
    );

    if (this.item) {
      this.setItemList();
      this.item.enrollment =
        this.itemService.compareStrDate(
          this.item.startDate,
          new Date(Date.now())
        ) < 0 || this.item.state === ItemState.Cancelled
          ? false
          : this.item.enrollment;
    }
    this.enrollment =
      this.item && !!this.item.enrollment.toString()
        ? !!this.item.enrollment
        : true;
    this.nameCourse = this.item ? this.item.title : "-";
  },
});
