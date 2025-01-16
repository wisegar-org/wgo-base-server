<template>
  <q-td :props="props" :class="cellClass" @dblclick="onDblClick">
    <TableAvatarColumn
      v-if="props.col.type === 'avatar'"
      :props="props"
      :schema="schema"
    />
    <TableBadgeColumn
      v-if="props.col.type === 'badges'"
      :props="props"
      :schema="schema"
    />
    <TableCommandColumn
      v-if="props.col.type === 'iconCommands'"
      :props="props"
      :schema="schema"
    />
    <TableDateColumn
      v-if="props.col.type === 'date'"
      :props="props"
      :schema="schema"
    />
    <TableDecimalColumn
      v-if="props.col.type === 'decimal'"
      :props="props"
      :schema="schema"
    />
    <TableIconColumn
      v-if="props.col.type === 'icon'"
      :props="props"
      :schema="schema"
    />
    <TableIconStateColumn
      v-if="props.col.type === 'iconsState'"
      :props="props"
      :schema="schema"
    />
    <TableMenuColumn
      v-if="props.col.type === 'menu'"
      :props="props"
      :schema="schema"
    />

    <TableSelectColumn
      v-if="props.col.type === 'select'"
      :props="props"
      :schema="schema"
      @rowSelect="onRowSelect"
    />
    <!-- Default render -->
    <TableDefaultColumn
      v-if="!props.col.type"
      :props="props"
      :schema="schema"
    />
  </q-td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableAvatarColumn from "./Columns/TableAvatarColumn.vue";
import TableBadgeColumn from "./Columns/TableBadgeColumn.vue";
import TableCommandColumn from "./Columns/TableCommandColumn.vue";
import TableDateColumn from "./Columns/TableDateColumn.vue";
import TableDecimalColumn from "./Columns/TableDecimalColumn.vue";
import TableDefaultColumn from "./Columns/TableDefaultColumn.vue";
import TableIconColumn from "./Columns/TableIconColumn.vue";
import TableIconStateColumn from "./Columns/TableIconStateColumn.vue";
import TableMenuColumn from "./Columns/TableMenuColumn.vue";
import TableSelectColumn from "./Columns/TableSelectColumn.vue";

export default defineComponent({
  name: "TableColumns",
  props: ["props", "schema"],
  components: {
    TableAvatarColumn,
    TableBadgeColumn,
    TableCommandColumn,
    TableDateColumn,
    TableDecimalColumn,
    TableDefaultColumn,
    TableIconColumn,
    TableIconStateColumn,
    TableMenuColumn,
    TableSelectColumn,
  },
  computed: {
    cellClass(): string | undefined {
      const rowClass =
        this.schema && this.schema.rowClass
          ? this.schema.rowClass(this.props.row)
          : "";
      const cellClass = this.props.col.cellClass
        ? this.props.col.cellClass(this.props.row)
        : "";
      return rowClass || cellClass ? `${rowClass} ${cellClass}` : undefined;
    },
  },
  methods: {
    onRowSelect(value: boolean): any {
      let row = this.props.row;
      row.select = value;
      this.$emit("rowSelect", row);
    },
    onDblClick() {
      this.$emit("dbclick", this.props.row);
    },
  },
  emits: ["rowSelect", "dbclick"],
});
</script>
