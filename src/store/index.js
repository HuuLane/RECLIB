import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: []
  },
  mutations: {
    loading (state, payload) {
      state.user.push(...payload)
    }
  },
  actions: {
    async testApi ({ commit }) {
      const { data } = await Vue.axios({
        url: `https://api.github.com/users`,
        method: 'GET'
      })
      commit('loading', data)
    }
  }
})
