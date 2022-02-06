import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  head: {
    titleTemplate: "Edubase - v 1.0.0",
    title: "edubase",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  publicRuntimeConfig: {
    baseUrl:
      process.env.BASE_URL_DEV || "https://api-edubase.app.madvertlabs.com/",
    underMaintenance: process.env.UNDERMAINTENANCE || false
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  //Auth

  auth: {
    strategies: {
      // The strategies are ways that we want to implement our authentication with here we just use local strategy
      local: {
        // The name of our strategy
        token: {
          // The token config
          property: "token", // The token property name that API will provide us when we log in
          global: true, // This determines if the authentication token is automatically included in all custom axios requests.
          required: true, // This option can be used to disable all token handling.
          type: "Bearer", // Authorization header type to be used in axios requests.
          maxAge: 3600 //  We don't use maxAge, because we provide expiry time for token from API
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" }, // our endpoint for sending request to the API
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: false // our endpoint for getting data from the API
        },
        user: {
          property: "user", // The user object that API will provide us when we log in
          autoFetch: false // if it was true will send a request to API to call the user endpoint
        },
        redirect: {
          login: "/login",
          logout: "/login",
          home: "/"
        }
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/api.js" },
    { src: "@/plugins/axios.js" },
    { src: "@/plugins/vuex-persist.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://localhost:5000/akb",
    headers: {
      token: "madvert"
    }
  },
  loading: {
    color: "blue",
    height: "3px",
    continuous: true
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          batchCol: colors.grey.darken4,
          toolbar: colors.grey.darken4,
          nav: colors.grey.darken4,
          navicon: "#ffffff"
        },
        light: {
          primary: "#3f51b5",
          secondary: "#b0bec5",
          anchor: "#8c9eff",
          batchCol: colors.grey.lighten5,
          toolbar: colors.grey.lighten5,
          nav: colors.blue.darken1,
          navicon: "#ffffff"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
