import Vue from 'vue'
import VuePusher from 'vue-pusher'

Vue.use(VuePusher, {
  api_key: 'dd66f370bd2ee1506087',
  options: {
    cluster: 'ap2',
    forceTLS: true
  }
})
