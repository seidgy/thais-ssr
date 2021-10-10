const webpack = require("webpack");
import getSiteMeta from "./utils/meta";
const meta = getSiteMeta();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8000 // default: 3000
  },
  head: {
    title: 'Thaís Imobiliária',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },
      { hid: 'title', name: "title", content: "Thaís Imobiliária"},
      { hid: 'keywords', name: "keywords", content: "vendadeimoveis,locaçãodeimoveis,guara,asasul,asanorte,aguasclaras,sudoeste,noroeste,brasilia,apartamento,casa,imobiliariabrasilia"},
      { hid: 'description', name: 'description', content:  'Imovéis para venda e locação'},
      { hid: 'robots', name: 'robots', content: 'index,follow'} 
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss',
    '~/node_modules/bootstrap/dist/css/bootstrap.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/carousel.client.js', ssr: false },
    { src: '~/plugins/splide.client.js', ssr: false },
    { src: '~/plugins/recaptcha.js', ssr: false },
    { src: '~/plugins/services.plugin.js', ssr: false },
    { src: '~/plugins/bootstrap.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "vue-toastification/nuxt",
    //"@nuxtjs/recaptcha",
    ['@netsells/nuxt-hotjar', { 
        id: '2045955', 
        sv: '6',
    }],
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/content'
  ],

  content: {
    // Options
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ]
  },

  env: {
    VUE_APP_SERVER_URI: process.env.VUE_APP_SERVER_URI || 'https://backend.thaisimobiliaria.com.br',
    VUE_APP_TOKEN_RECAPTCHA: process.env.VUE_APP_TOKEN_RECAPTCHA || '6Ld3QNQUAAAAAMU0ZN09cEO5whGn4k60eUeb-wXY',
    VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL || 'https://novo.thaisimobiliaria.com.br'
  },
}
