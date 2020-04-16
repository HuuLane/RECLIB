import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '@/plugins/fontawesome'
import '@/plugins/bootstrap-vue'
import App from '@/App.vue'
import router from '@/views/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import VueLogger from 'vuejs-logger'
import to from 'await-to-js'

Vue.use(VueAxios, axios)

// Making await-to functions globally
Vue.use({
  install () {
    Vue.t = to
    Vue.prototype.$t = to
  }
})

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

Vue.axios.interceptors.response.use(
  res => res,
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // default {}
    Vue.$log.error(err)
    return Promise.resolve({ data: {} })
  }
)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const showToast = function (content, option) {
  vm.$bvToast.toast(content, {
    noCloseButton: true,
    autoHideDelay: 3000,
    solid: true,
    ...option
  })
}

const flashMessage = {
  success (content, option = {}) {
    showToast(content, {
      variant: 'success',
      ...option
    })
  },
  error (content, option = {}) {
    showToast(content, {
      variant: 'danger',
      ...option
    })
  }
}

Vue.use({
  install () {
    Vue.fm = flashMessage
    Vue.prototype.$fm = flashMessage
  }
})
