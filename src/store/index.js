import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: [],
    items: {}
  },
  mutations: {
    loading (state, payload) {
      state.user.push(...payload)
    },
    saveRowDataIntoItems (state, payload) {
      if (Array.isArray(payload)) {
        for (let i = 0; i < payload.length; i++) {
          const item = payload[i]
          state.items[item._id] = item
        }
      } else {
        state[payload._id] = payload
      }
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
