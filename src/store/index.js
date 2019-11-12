import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userName: null,
    convenientRecord: {}
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
    },
    comfortUser (state, payload) {
      // log('payload', payload)
      state.convenientRecord = { ...payload }
    }
  },
  actions: {
    async readUserState ({ commit, state }) {
      const { data } = await Vue.axios({
        url: process.env.VUE_APP_LOGIN,
        method: 'GET'
      })
      commit('readUserState', data)
    },
    async login ({ commit, state }, payload) {
      const { data } = await Vue.axios({
        url: process.env.VUE_APP_LOGIN,
        method: 'POST',
        data: payload
      })
      commit('checkResponse', data)
      return data
    },
    async logOut ({ commit, state }) {
      const { data } = await Vue.axios({
        url: process.env.VUE_APP_LOGOUT,
        method: 'delete'
      })
      if (data.code === 1) {
        state.userName = null
      }
    }
  }
})
