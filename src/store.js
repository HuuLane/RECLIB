import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userName: null,
    convenientRecord: {}
  },
  mutations: {
    setUserName (state, userName) {
      state.userName = userName
    },
    comfortUser (state, payload) {
      // log('payload', payload)
      state.convenientRecord = { ...payload }
    }
  },
  actions: {
    async sessionLogin (context) {
      const { data } = await Vue.axios({
        url: '/login',
        method: 'GET'
      })
      Vue.$log.info('sessionLogin', data)
      if (data.userName) {
        context.commit('setUserName', data.userName)
      }
    },
    async login (context, payload) {
      const { data } = await Vue.axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
      if (data.userName) {
        context.commit('setUserName', data.userName)
      }
      return data
    },
    async logOut (context) {
      const { data } = await Vue.axios({
        url: '/logout',
        method: 'delete'
      })
      if (data.code === 1) {
        context.commit('setUserName', null)
      }
    }
  }
})
