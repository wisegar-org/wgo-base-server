import { AGVNewsletterInscriptionStatusEnum } from "src/models/Newsletter";
import { AGVTemplateEnum } from "src/models/Templates";
import {
  AuthTemplateEnum,
  SUPERADMIN,
} from "@wisegar-org/wgo-base-models/build/authentication";
import {
  AdminBasePath,
  IRouteObject,
} from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";
import { AGV_ADMIN_ROLE } from "src/models/models";

export const AGVTemplateAdminPaths: IRouteObject = {
  template: {
    path: `${AdminBasePath}/template`,
    label: "WGO_AGV_TEMPLATE_ADMIN",
    name: "agv_admin_template",
  },
  templateInscription: {
    path: `${AdminBasePath}/template/inscription`,
    label: "WGO_AGV_TEMPLATE_INSCRIPTION_ADMIN",
    name: "agv_admin_template_inscription",
  },
  templateInscriptionRept: {
    path: `${AdminBasePath}/template/inscriptionRept`,
    label: "WGO_AGV_TEMPLATE_INSCRIPTION_REPEAT_ADMIN",
    name: "agv_admin_template_inscription_repeat",
  },
  templateEmailComitato: {
    path: `${AdminBasePath}/template/emailComitato`,
    label: "WGO_AGV_TEMPLATE_COMITATO_EMAIL_ADMIN",
    name: "agv_admin_template_comitato_email",
  },
  templateEmailContact: {
    path: `${AdminBasePath}/template/emailContact`,
    label: "WGO_AGV_TEMPLATE_CONTACT_EMAIL_ADMIN",
    name: "agv_admin_template_contact_email",
  },
  templateEmailPoll: {
    path: `${AdminBasePath}/template/emailPoll`,
    label: "WGO_AGV_TEMPLATE_FORM_EMAIL_ADMIN",
    name: "agv_admin_template_form_email",
  },
  templateNewsletterPending: {
    path: `${AdminBasePath}/template/newsPend`,
    label: "WGO_AGV_TEMPLATE_NEWSLETTER_PENDING_EMAIL_ADMIN",
    name: "agv_admin_template_template_pending_email",
  },
  templateNewsletterConfirmed: {
    path: `${AdminBasePath}/template/newsConf`,
    label: "WGO_AGV_TEMPLATE_NEWSLETTER_CONFIRMED_EMAIL_ADMIN",
    name: "agv_admin_template_template_confirmed_email",
  },
  templateNewsletterCancelled: {
    path: `${AdminBasePath}/template/newsCancl`,
    label: "WGO_AGV_TEMPLATE_NEWSLETTER_CANCELLED_EMAIL_ADMIN",
    name: "agv_admin_template_template_cancelled_email",
  },
  templateAuthConfirmPassword: {
    path: `${AdminBasePath}/template/confirmPass`,
    label: "WGO_TEMPLATE_AUTH_CONFIRM_PASS_ADMIN",
    name: "agv_admin_template_auth_confirm_pass_email",
  },
  templateAuthConfirmChangeDefaultPassword: {
    path: `${AdminBasePath}/template/changePass`,
    label: "WGO_TEMPLATE_AUTH_CHANGE_PASS_ADMIN",
    name: "agv_admin_template_auth_change_pass_email",
  },
  templateAuthResetPassword: {
    path: `${AdminBasePath}/template/resetPass`,
    label: "WGO_TEMPLATE_AUTH_RESET_PASS_ADMIN",
    name: "agv_admin_template_auth_reset_pass_email",
  },
};

const getAdminTemplatePage = (url: string, type: string) => ({
  path: url,
  meta: {
    auth: true,
    role: [SUPERADMIN, AGV_ADMIN_ROLE],
  },
  component: () => import("pages/AdminAgv/AdminTemplatePage.vue"),
  props: () => ({ type }),
});

export const AGVTemplatePathRouter: RouteRecordRaw = {
  path: AGVTemplateAdminPaths.template.path,
  component: () => import("layouts/MainLayout.vue"),
  children: [
    {
      path: AGVTemplateAdminPaths.template.path,
      redirect: AGVTemplateAdminPaths.templateInscription.path,
    },
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateInscription.path,
      AGVTemplateEnum.Inscription
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateInscriptionRept.path,
      AGVTemplateEnum.InscriptionRepeated
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateEmailComitato.path,
      AGVTemplateEnum.EmailComitato
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateEmailContact.path,
      AGVTemplateEnum.EmailContact
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateEmailPoll.path,
      AGVTemplateEnum.EmailPoll
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateNewsletterPending.path,
      AGVNewsletterInscriptionStatusEnum.Waiting
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateNewsletterConfirmed.path,
      AGVNewsletterInscriptionStatusEnum.Confirmed
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateNewsletterCancelled.path,
      AGVNewsletterInscriptionStatusEnum.Cancelled
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateAuthConfirmPassword.path,
      AuthTemplateEnum.ConfirmEmail
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateAuthConfirmChangeDefaultPassword.path,
      AuthTemplateEnum.ConfirmChangeDefaultPassword
    ),
    getAdminTemplatePage(
      AGVTemplateAdminPaths.templateAuthResetPassword.path,
      AuthTemplateEnum.ResetPassword
    ),
  ],
};
