import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userName: null
  },
  mutations: {
    setUserName (state, userName) {
      state.userName = userName
    }
  },
  actions: {
    async sessionLogin (context) {
      const { data } = await Vue.axios({
        url: '/session',
        method: 'GET'
      })
      Vue.$log.info('sessionLogin', data)
      if (data.userName) {
        context.commit('setUserName', data.userName)
      }
    },
    async login (context, payload) {
      const { data } = await Vue.axios({
        url: '/session',
        method: 'POST',
        data: payload
      })
      if (data.userName) {
        context.commit('setUserName', data.userName)
      }
      return data
    },
    async logout (context) {
      const { data } = await Vue.axios({
        url: '/session',
        method: 'delete'
      })
      if (data.code === 1) {
        context.commit('setUserName', null)
      }
    }
  }
})
