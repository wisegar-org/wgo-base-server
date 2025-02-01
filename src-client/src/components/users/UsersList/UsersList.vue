<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.USER_TITLE"
      :data="users"
      :schema="schema"
      :height="componentHeight"
    />
    <EditUserDialog
      :authStore="authStore"
      :open="open"
      :tranStore="tranStore"
      :user="selectedUser"
      @close="onClose"
      @onEdited="onEdit"
    />
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getAuthUserListSchema } from "./UsersListSchema";
import Table from "../../../modules/core/components/Table/Table.vue";
import EditUserDialog from "../EditUser/EditUserDialog.vue";
import Loader from "../../../modules/core/components/Loader/Loader.vue";

import {
  ITableLeftButton,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { IUser } from "@wisegar-org/wgo-base-models/build/core";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "../../../modules/core/components/BaseComponents";
import { TranslationStore } from "../../../modules/translation/store/TranslationStore";
import { AuthStore } from "../../../modules/authentication/store/AuthStore";

export default defineComponent({
  name: "UsersList",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
  },
  components: {
    Table,
    EditUserDialog,
    Loader,
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row: any) => {
      (this as any).showDetails(row);
      console.log("click on", row);
    };

    const deleteUser = async (row: any) => {
      await (this as any).deleteUser(row);
    };
    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
      {
        icon: "delete",
        tooltip: transBase.DELETE,
        fnAction: deleteUser,
      },
    ];

    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () =>
          fnAction(<IUser>{
            id: 0,
            name: "",
            lastName: "",
            code: "",
            email: "",
            userName: "",
            certificate: "",
            isEmailConfirmed: false,
            roles: [],
            address: "",
            cap: "",
            phone: "",
          }),
      },
    ];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getAuthUserListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = (this as any).$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const users: IUser[] = [];
    return {
      users,
      loading: false,
      selectedUser: {} as IUser,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    showDetails(user: IUser) {
      this.selectedUser = user;
      this.open = true;
    },
    async onEdit(user: IUser) {
      this.onSuccess(
        this.selectedUser.id
          ? translations.EDIT_USER_SUCCESS
          : translations.ADD_USER_SUCCESS
      );
      this.onClose();
    },
    async onSuccess(token: string) {
      this.$emit("success", this.getLabel(token));
      this.loadUsers();
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onClose() {
      this.open = false;
    },
    async loadUsers() {
      this.loading = true;
      this.users = await this.authStore.loadAllUsers();
      this.loading = false;
    },
    async deleteUser(user: IUser) {
      (this as any).$q
        .dialog({
          title: this.getLabel(transBase.CONFIRM),
          message: this.getLabel(translations.DELETE_USER_MSG),
          persistent: true,
          style: "width: 100%",
          focus: "cancel",
          ok: {
            color: "primary",
            label: this.getLabel(transBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabel(transBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          const result = await this.authStore.deleteUser({ id: user.id });
          if (result) this.onSuccess(translations.DELETE_USER_SUCCESS);
        });
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadUsers();
  },
  unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
