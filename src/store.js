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
      try {
        const { data } = await Vue.axios({
          url: '/session',
          method: 'GET'
        })
        Vue.$log.info('sessionLogin', data)
        if (data.userName) {
          context.commit('setUserName', data.userName)
          Vue.fm.success('Keep the last login status')
        } else {
          Vue.fm.warning('点击前往登录, 即刻使用体验帐号', {
            to: '/login'
          })
        }
      } catch (error) {
        Vue.$log.error(error)
        Vue.fm.NETERR()
      }
    },
    async login (context, payload) {
      try {
        const { data } = await Vue.axios({
          url: '/session',
          method: 'POST',
          data: payload
        })
        if (data.userName) {
          context.commit('setUserName', data.userName)
        }
        return data
      } catch (error) {
        Vue.$log.error(error)
        Vue.fm.NETERR()
      }
    },
    async logout (context) {
      try {
        const { data } = await Vue.axios({
          url: '/session',
          method: 'delete'
        })
        if (data.code === 1) {
          context.commit('setUserName', null)
        }
      } catch (error) {
        Vue.$log.error(error)
        Vue.fm.NETERR()
      }
    }
  }
})
