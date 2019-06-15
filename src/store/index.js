import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// eslint-disable-next-line
const { log } = console
export default new Vuex.Store({
  state: {
    userName: null
    // isLogin: false
  },
  mutations: {
    checkResponse (state, payload) {
      const code = Number(payload.code)
      if (code === 1) {
        // 登录成功
        state.userName = payload.userName
      }
    },
    readUserState (state, payload) {
      if (payload) {
        state.userName = payload
      }
    }
  },
  actions: {
    async readUserState ({ commit, state }) {
      const { data } = await Vue.axios({
        url: process.env.VUE_APP_LOGIN,
        method: 'GET',
        withCredentials: true
      })
      commit('readUserState', data)
    },
    async login ({ commit, state }, payload) {
      log('**login')
      const { data } = await Vue.axios({
        url: process.env.VUE_APP_LOGIN,
        method: 'PUT',
        data: payload
      })
      commit('checkResponse', data)
    }
  }
})
