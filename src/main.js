import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '@/plugins/bootstrap-vue'
import App from '@/App.vue'
import router from '@/views/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import VueLogger from 'vuejs-logger'
import VueTimeago from 'vue-timeago'
import axiosRetry from 'axios-retry'

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
})

// Exponential back-off retry delay between requests
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })
Vue.use(VueAxios, axios)

const loggerOptions = {
  isEnabled: true,
  logLevel: 'error',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: false,
  separator: '|',
  showConsoleColors: true
}

if (process.env.VUE_APP_DEV === 'true') {
  Vue.config.productionTip = true
  Vue.axios.defaults.withCredentials = true
  Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
  loggerOptions.logLevel = 'debug'
}

Vue.use(VueLogger, loggerOptions)

// Vue.axios.interceptors.response.use(
//   res => res,
//   err => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // default {}
//     Vue.$log.error(err)
//     return Promise.resolve({ data: {} })
//   }
// )

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const flashMessage = new Proxy(
  {},
  {
    get (target, key) {
      if (key === 'error') {
        key = 'danger'
      }
      if (!target.hasOwnProperty(key)) {
        // GLOBAL HACK
        if (key === 'NETERR') {
          target[key] = function () {
            vm.$bvToast.toast('Fail to connect server', {
              variant: 'danger',
              noCloseButton: true,
              autoHideDelay: 3000,
              solid: true
            })
          }
        } else {
          target[key] = function (content, option = {}) {
            vm.$bvToast.toast(content, {
              variant: key,
              // default
              noCloseButton: true,
              autoHideDelay: 3000,
              solid: true,
              ...option
            })
          }
        }
      }
      return target[key]
    }
  }
)

Vue.use({
  install () {
    Vue.fm = flashMessage
    Vue.prototype.$fm = flashMessage
  }
})
