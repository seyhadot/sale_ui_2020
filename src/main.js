import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './plugins/i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import './assets/styles/global.scss'
import { MediaQueries, CommonBands } from 'vue-media-queries'
import { store } from './store/store'
import '../src/plugins/vue-cookie'
import numeral from 'numeral';
Vue.use(require('vue-moment'))

const mediaQueries = new MediaQueries({
  bands: CommonBands.Tailwind
})

Vue.use(mediaQueries)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  mediaQueries: mediaQueries,
  mixins: [CommonBands.Tailwind.mixin],
  render: (h) => h(App)
}).$mount('#app')
Vue.filter('numeralGen', function (val, store, showCurrency = true) {
  const suffix = showCurrency ? store.baseCurrency === "KHR" ? "៛" : "$" : "";
  const formatVal = store && store.baseCurrency === 'KHR' ? numeral(val).format('"0,0"') : numeral(val).format('"0,0.00"');
  return ` ${formatVal} ${suffix}`;
});
