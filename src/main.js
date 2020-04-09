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

Vue.use(VueAxios, axios)

if (process.env.VUE_APP_DEV === 'true') {
  Vue.config.productionTip = true
  Vue.axios.defaults.withCredentials = true
  Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
