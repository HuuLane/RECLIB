<template>
  <div>
    <table class="table table-sm" v-if="data.rentOut">
      <tbody>
        <tr v-for="(item, index) in data.rentOut" :key="index">
          <th scope="row">{{index}}</th>
          <td>
            一个叫
            <code>{{item.name}}</code> 的家伙, 其归还日期为:
            <code>{{transDate(item.date)}}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 借书按钮 -->
    <div id="btn-borrow-book">
      <b-btn
        variant="outline-dark"
        squared
        class="ml-auto"
        block
        @click="borrowBooks"
        :disabled="!isLogin"
      >剩余: {{stockNum}} 我想借</b-btn>
      <b-tooltip v-if="!isLogin" target="btn-borrow-book" placement="right">
        <strong>登录可借</strong>
      </b-tooltip>
    </div>
    <!-- 模块消息 -->
    <b-modal ref="bv-modal-msg" centered hide-footer>
      <template slot="modal-title">RECLAB</template>
      <div class="d-block text-center">
        <h3>{{info.msg}}</h3>
      </div>
      <b-button class="mt-3" block variant="outline-dark" @click="closeModal">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>
// eslint-disable-line
import { timeConverter, log } from '@/utils.js'
export default {
  name: 'BookStock',
  created () {
    const vm = this
    log('vm.id', vm.id)
    vm.getStock()
  },
  props: {
    id: String
  },
  data () {
    return {
      api: process.env.VUE_APP_STOCK,
      data: {},
      info: {}
    }
  },
  computed: {
    stockNum () {
      const vm = this
      if (!vm.data.count) {
        return 'Loading..'
      }
      return vm.data.count - vm.data.rentOut.length
    },
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    isLogin () {
      return Boolean(this.userName)
    }
  },
  methods: {
    transDate (timestamp) {
      const dateOfReturn = Number(timestamp) + (30 * 24 * 3600) * 1000
      return timeConverter(dateOfReturn)
    },
    getStock () {
      const vm = this
      vm.axios({
        method: 'GET',
        url: `${vm.api}/${vm.id}`
      }).then(({ data }) => {
        // log('data', data)
        vm.data = { ...data.stock }
      }).catch(err => {
        log('err', err)
      })
    },
    async borrowBooks () {
      const vm = this
      const { data: res } = await vm.axios({
        method: 'PUT',
        url: vm.api,
        data: {
          id: vm.id
        }
      })
      // 写入 info
      vm.info = { ...res }
      // 成功, 再次 get 库存
      vm.getStock()
      // 控制弹窗
      vm.$refs['bv-modal-msg'].show()
    },
    closeModal () {
      const vm = this
      vm.$refs['bv-modal-msg'].hide()
    }
  }
}
</script>
<style lang="scss">
</style>
