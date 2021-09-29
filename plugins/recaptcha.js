import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_TOKEN_RECAPTCHA, autoHideBadge: true, size: 'invisible'})