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
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'title', property: "title", content: "Thaís Imobiliária"},
      { hid: 'keywords', property: "keywords", content: "vendadeimoveis,locaçãodeimoveis,guara,asasul,asanorte,aguasclaras,sudoeste,noroeste,brasilia,apartamento,casa,imobiliariabrasilia"},
      { hid: 'description', name: 'description', content:  'Imovéis para venda e locação'},
      { hid: 'og:description', property: 'og:description', content: "Thaís Imobiliária imovéis para venda e locação"},
      { hid: 'og:site_name', property: 'og:site_name', content: 'Thaís Imobiliária'},
      { hid: 'og:url', property: 'og:url', content: 'https://novo.thaisimobiliaria.com.br/'},   
      { hid: 'og:type', property: 'og:type', content: 'website'},   
      { hid: 'og:image', property: 'og:image', content: "https://managing-images.kenlo.io/unsafe/600x400/filters:quality(100)/storage.googleapis.com/kenlo-sites-images/VWRCUkQ2Tnp3d1BJRDBJVe1s0xgxSbBGOsBT9+RO1zjks-ynciLnlXpdKzsuCVZKPvMZhGt-GI0v+QFtypVh7xY3icsFUfjv4HHembm5wv7fiGO536-3h5Ts7uLDcYCHkIkx36P+GAOhv-Q1TYF+Yx0oNrkjGhayU4mMNSFcqnywpkzMApYcDjsIkihq3TwLiXGSRtX2r1N9gXmfBv-V53TUCe28WXh7OsFfAttJ8h8PpwKpSRFyvwoXqw==.png"}, 
      { hid: 'robots', content: 'index,follow'} 
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vue-carousel-3d', ssr: false },
    {src: '~/plugins/splide.client.js', ssr:false},
    {src: '~/plugins/recaptcha.js', ssr:false},
    {src: '~/plugins/services.plugin.js', ssr:false}
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
    '@nuxtjs/dotenv'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  /*recaptcha: {
    siteKey: process.env.VUE_APP_TOKEN_RECAPTCHA, 
    hideBadge: true, 
    version: 2
  },*/

  env: {
    VUE_APP_SERVER_URI: process.env.VUE_APP_SERVER_URI || 'https://backend.thaisimobiliaria.com.br',
    VUE_APP_TOKEN_RECAPTCHA: process.env.VUE_APP_TOKEN_RECAPTCHA || '6Ld3QNQUAAAAAMU0ZN09cEO5whGn4k60eUeb-wXY',
    VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL || 'https://novo.thaisimobiliaria.com.br'
  }
}
