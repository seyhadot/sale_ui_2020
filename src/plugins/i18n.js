import Vuei18n from 'vue-i18n'
import Vue from 'vue'
import { appLocale } from './i18n/appLocale'
Vue.use(Vuei18n)

export const i18n = new Vuei18n({
  locale: 'km',
  fallbackLocale: 'km',
  messages: appLocale
})
