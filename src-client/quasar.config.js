/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const { configure } = require("quasar/wrappers");
const path = require("path");

const quasarConfig = configure(function (ctx) {
  const getEnvironmentByFile = require("./quasar.env.js");
  const resultEnv = getEnvironmentByFile();
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: false,
          files: "./src/**/*.{ts,tsx,js,jsx,vue}",
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ["i18n", "axios", "store", "wgo"],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ["app.css"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      "line-awesome",
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: "hash", // available values: 'hash', 'history'
      env: {
        ENV: ctx.prod ? "production" : "development",
        API_BASE: ctx.prod
          ? resultEnv.APP_WEB_HOST
          : resultEnv.APP_WEB_HOST_DEV,
        API_GRAPHQL: ctx.prod
          ? `${resultEnv.APP_WEB_HOST}/graphql`
          : `${resultEnv.APP_WEB_HOST_DEV}/graphql`,
        VERSION: resultEnv.VERSION,
      },
      distDir: "../build/backoffice",
      // transpile: false,
      publicPath: "/backoffice",

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      extendWebpack(cfg) {
        if (cfg.resolve.fallback) {
          cfg.resolve.fallback["child_process"] = false;
          cfg.resolve.fallback["https"] = false;
          cfg.resolve.fallback.fs = require.resolve("fs-extra");
        } else {
          cfg.resolve.fallback = {
            child_process: false,
            https: false,
            fs: require.resolve("fs-extra"),
          };
        }

        // Fix library components render
        if (!cfg.resolve.alias) {
          cfg.resolve.alias = {};
        }
        cfg.resolve.alias.vue = path.resolve("./node_modules/vue");
        cfg.resolve.alias.https = path.resolve("./node_modules/agent-base");
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: "http",
      },
      port: resultEnv.PORT,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        // brand: {
        //   primary: "#221D23",
        //   secondary: "#FFFFF",
        //   accent: "#D5573B",
        //   dark: "#FFFFF",
        //   positive: "#80a32c",
        //   negative: "##94C9A9",
        //   info: "#D5573B",
        //   warning: "#C6ECAE",
        // },
        notify: {
          type: "positive",
          color: "#D5573B",
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Notify", "Dialog", "Meta"],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: resultEnv.PORT, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      // chainWebpackWebserver (/* chain */) {},

      middlewares: [
        ctx.prod ? "compression" : "",
        "api",
        "render", // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      // chainWebpackCustomSW (/* chain */) {},

      manifest: {
        name: "WG Manager Tool",
        short_name: "WG Manager Tool",
        description: "",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#ACCF5A",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "client-template",
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    },
  };
});

module.exports = quasarConfig;
