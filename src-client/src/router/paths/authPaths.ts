import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { RouteRecordRaw } from "vue-router";
import { Paths } from "../paths";

export const AuthPathRouter: RouteRecordRaw = {
  path: Paths.home.path,
  component: () => import("layouts/EmptyLayout.vue"),
  children: [
    {
      path: AuthPaths.authLoginParam.path,
      name: AuthPaths.authLoginParam.name,
      component: () => import("src/pages/Auth/login.page.vue"),
      props: (route) => {
        return {
          path: route.query.path,
        };
      },
      meta: {
        auth: AuthPaths.authLoginParam.auth,
      },
    },
    {
      path: AuthPaths.authLogin.path,
      name: AuthPaths.authLogin.name,
      component: () => import("src/pages/Auth/login.page.vue"),
      props: (route) => {
        return {
          path: route.query.path,
        };
      },
      meta: {
        auth: AuthPaths.authLogin.auth,
      },
    },
    {
      path: AuthPaths.authRegister.path,
      name: AuthPaths.authRegister.name,
      component: () => import("src/pages/Auth/RegisterPage.vue"),
      meta: {
        auth: AuthPaths.authRegister.auth,
      },
    },
    {
      path: AuthPaths.authEmailSended.path,
      name: AuthPaths.authEmailSended.name,
      component: () => import("src/pages/Auth/RegisterEmailSendedPage.vue"),
      props: (route) => {
        return {
          email: route.params.email,
        };
      },
      meta: {
        auth: AuthPaths.authEmailSended.auth,
      },
    },
    {
      path: AuthPaths.authConfirmEmail.path,
      name: AuthPaths.authConfirmEmail.name,
      component: () => import("src/pages/Auth/RegisterConfirmEmailPage.vue"),
      props: (route) => {
        return {
          token: route.params.token,
        };
      },
      meta: {
        auth: AuthPaths.authConfirmEmail.auth,
      },
    },
    {
      path: AuthPaths.authChangePassword.path,
      name: AuthPaths.authChangePassword.name,
      component: () => import("src/pages/Auth/RegisterChangePasswordPage.vue"),
      props: (route) => {
        return {
          token: route.params.token,
        };
      },
      meta: {
        auth: AuthPaths.authChangePassword.auth,
      },
    },
    {
      path: AuthPaths.authResendConfirmation.path,
      name: AuthPaths.authResendConfirmation.name,
      component: () => import("src/pages/Auth/RegisterResendConfirmPage.vue"),
      meta: {
        auth: AuthPaths.authResendConfirmation.auth,
      },
    },
    {
      path: AuthPaths.authResetPassword.path,
      name: AuthPaths.authResetPassword.name,
      component: () => import("src/pages/Auth/RegisterResetPasswordPage.vue"),
      meta: {
        auth: AuthPaths.authResetPassword.auth,
      },
    },
  ],
};
