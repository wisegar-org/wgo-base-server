<template>
  <q-form @submit="editUser">
    <q-card-section class="row q-ma-xs q-pa-xs flex flex-center">
      <div class="col-12 col-md-6">
        <q-input
          v-if="emailList.length <= 1"
          outlined
          :readonly="!!userInput.id"
          class="q-my-sm q-mx-sm"
          v-model="userInput.email"
          :autofocus="true"
          :label="getLabel(translations.COLUMN_EMAIL)"
        />
        <q-select
          v-else
          outlined
          v-model="userInput.email"
          :options="emailList"
          :label="getLabel(translations.COLUMN_EMAIL)"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          outlined
          required
          hide-bottom-space
          class="q-my-sm q-mx-sm"
          v-model="userInput.userName"
          :label="getLabel(translations.COLUMN_USER_NAME)"
          :error="!validUserName"
          :error-message="getLabel(translations.USER_NAME_EXIST_ERROR_MSG)"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          class="q-my-sm q-mx-sm"
          v-model="userInput.name"
          required
          :label="getLabel(translations.COLUMN_NAME)"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          outlined
          required
          class="q-my-sm q-mx-sm"
          v-model="userInput.lastName"
          :label="getLabel(translations.COLUMN_LAST_NAME)"
        />
      </div>
      <div v-if="isEdition" class="col-12 col-md-6">
        <q-input
          outlined
          class="q-my-sm q-mx-sm"
          v-model="userInput.code"
          :label="getLabel(translations.COLUMN_CODE)"
        />
      </div>
      <div v-if="isEdition" class="col-12 col-md-6">
        <InputCopy
          class="q-my-sm q-mx-sm"
          :textCopy="user.certificate"
          :label="getLabel(translations.COLUMN_CERTIFICATE)"
        />
      </div>

      <div class="col-12 col-md-6">
        <InputSecret
          class="q-my-sm q-mx-sm"
          v-model="userInput.password"
          :required="false"
          :label="getLabel(translations.COLUMN_PASSWORD)"
        />
      </div>

      <div class="col-12 col-md-6">
        <InputSecret
          class="q-my-sm q-mx-sm"
          v-model="confirmPassword"
          :required="false"
          :label="getLabel(translations.COLUMN_CONFIRM_PASSWORD)"
          @onEnter="editUser"
          :isError="userInput.password !== confirmPassword"
          :error="getLabel(translations.PASSWORD_EQUALS_ERR)"
        />
      </div>
      <div v-if="isAdminRol" class="col-12 col-md-6">
        <q-select
          outlined
          v-model="userInput.roles"
          multiple
          :options="roles"
          :label="getLabel(translations.COLUMN_ROLES)"
          class="q-my-sm q-mx-sm"
        />
      </div>
      <div v-if="isAdminRol" class="col-12 col-md-6">
        <q-list class="q-my-sm q-mx-sm">
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label class="text-left">{{
                getLabel(translations.COLUMN_IS_CONFIRMED_EMAIL)
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox v-model="userInput.isEmailConfirmed" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-card-actions
      v-if="showBtns"
      align="center"
      vertical
      class="row q-ma-xs q-pa-xs"
    >
      <div class="row col-12 justify-around fit">
        <div class="col-12 col-sm-4 q-pt-xs">
          <q-btn
            outline
            color="primary"
            text-color="secondary"
            align="around"
            class="btn_width_fix"
            @click="close"
            :label="getLabel(tranBase.CLOSE)"
          />
        </div>
        <div class="col-12 col-sm-4 q-pt-xs">
          <q-btn
            outline
            color="primary"
            text-color="secondary"
            align="around"
            class="btn_width_fix"
            :label="getLabel(labelBtn)"
            type="submit"
          />
        </div>
      </div>
    </q-card-actions>
    <Loader :loading="innerLoading || showLoading" />
  </q-form>
</template>

<script lang="ts">
import { AuthService } from "../../../modules/authentication/services/AuthService";
import Loader from "../../../modules/core/components/Loader/Loader.vue";
import { defineComponent, PropType } from "vue";
import InputSecret from "../../../modules/core/components/InputSecret/InputSecret.vue";
import InputCopy from "../../../modules/core/components/InputCopy/InputCopy.vue";
import { BaseTranslateComponent } from "../../../modules/core/components/BaseComponents";
import { IUser } from "@wisegar-org/wgo-base-models/build/core";

import {
  IAuthRegisterParams,
  SUPERADMIN,
} from "@wisegar-org/wgo-base-models/build/authentication";
import { translations as tranBase } from "@wisegar-org/wgo-base-models/build/core";
import { authTranslations as translations } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { TranslationStore } from "../../../modules/translation/store/TranslationStore";
import { AuthStore } from "../../../modules/authentication/store/AuthStore";

export default defineComponent({
  name: "EditUserComponent",
  components: {
    Loader,
    InputSecret,
    InputCopy,
  },
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
    emails: { type: Array as PropType<string[]>, default: [] },
    showBtns: { type: Boolean, default: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const roles: string[] = [];
    let emailList: string[] = [];
    if (this.emails) {
      emailList =
        this.emails.indexOf(this.user.email) === -1
          ? this.emails.concat(this.user.email)
          : this.emails;
    }
    return {
      roles,
      userInput: {
        id: this.user.id,
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email,
        userName: this.user.userName,
        password: "",
        isEmailConfirmed: this.user.isEmailConfirmed,
        code: this.user.code || "",
        roles: this.user.roles,
      } as IAuthRegisterParams,
      emailList,
      confirmPassword: "",
      innerLoading: false,
      showLoading: false,
      validUserName: true,
      translations,
      tranBase,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    async checkUserName() {
      this.showLoading = true;
      const service = new AuthService();
      this.validUserName = await service.validUserName({
        id: this.user.id,
        userName: this.userInput.userName,
      });

      this.showLoading = false;
      return this.validUserName;
    },
    async editUser() {
      await this.checkUserName();
      if (!this.validUserName) return;
      if (this.userInput.password !== this.confirmPassword) return;
      this.showLoading = true;
      const service = new AuthService();
      const user = this.userInput.id
        ? await service.editUser(this.userInput)
        : await service.registerUser({
            name: this.userInput.name,
            lastName: this.userInput.lastName,
            userName: this.userInput.userName,
            email: this.userInput.email,
            password: this.userInput.password,
            isEmailConfirmed: this.userInput.isEmailConfirmed,
            roles: this.userInput.roles,
          } as any);
      if (user) {
        this.$emit("onEdit", user);
      }
      this.showLoading = false;
    },
    close() {
      this.$emit("onClose");
    },
  },
  computed: {
    labelBtn(): string {
      return this.user.id ? tranBase.EDIT : tranBase.SAVE;
    },
    validBtn(): boolean {
      return (
        !!this.userInput.email &&
        !!this.userInput.password &&
        this.userInput.password === this.confirmPassword
      );
    },
    isAdminRol(): boolean {
      return this.authStore.user.roles.indexOf(SUPERADMIN) !== -1;
    },
    isEdition(): boolean {
      return this.userInput.id !== 0;
    },
  },
  async created() {
    this.roles = await this.authStore.loadAllRoles();
  },
  emits: {
    onClose() {
      return true;
    },
    onEdit(user: IUser) {
      return user;
    },
  },
  watch: {
    emails() {
      if (this.emails) {
        this.emailList =
          this.emails.indexOf(this.user.email) === -1
            ? this.emails.concat(this.user.email)
            : this.emails;
      }
    },
  },
});
</script>

<style scoped>
.div_register_style {
  overflow-y: auto;
}
.btn_width_fix {
  min-width: 100px;
}
.max_heigth_card {
  max-height: 90vh;
}
</style>
