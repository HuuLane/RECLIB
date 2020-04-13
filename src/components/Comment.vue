<template>
  <div>
    <h3>评论板</h3>
    <!-- 提交按钮 -->
    <div id="btn-submit-comment">
      <b-input-group size="lg" class="mr-sm-2">
        <!-- 评论框 -->
        <b-form-input
          type="text"
          trim
          :disabled="!isLogin"
          placeholder="输入内容"
          v-model="content"
          @keyup.enter="submitComment"
        />
        <!-- 按钮 -->
        <b-input-group-append>
          <b-button
            variant="outline-dark"
            block
            @click="submitComment"
            :disabled="!isLogin"
          >submit</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-tooltip v-if="!isLogin" target="btn-submit-comment" placement="top">
        <strong>please login first</strong>
      </b-tooltip>
    </div>
    <!-- 展示板 -->
    <table class="table table-borderless my-3" v-if="hasComments">
      <tbody v-if="res.code === 1">
        <tr v-for="(item, index) in res.comments" :key="index">
          <th scope="row">{{index}}L</th>
          <td>
            <code>{{item.user.name}}</code> 说:
          </td>
          <td>
            <b>{{item.content}}</b>
          </td>
          <td>
            <code>{{transDate(item.date)}}</code>
          </td>
        </tr>
      </tbody>
      <div v-else class="text-center my-5">
        <b>{{res.msg}}</b>
      </div>
    </table>

    <!-- 模块消息 -->
    <b-modal ref="bv-modal-msg" centered hide-footer>
      <template slot="modal-title">RECLAB</template>
      <div class="d-block text-center">
        <h3>{{infoafterComment.msg}}</h3>
      </div>
      <b-button class="mt-3" block variant="outline-dark" @click="closeModal">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import { timeConverter, objectIsEmpty } from '@/utils.js'
export default {
  name: 'Comment',
  created () {
    const vm = this
    vm.getComments()
  },
  data () {
    return {
      api: '/comment',
      content: null,
      res: {},
      infoafterComment: {}
    }
  },
  methods: {
    transDate (timestamp) {
      return timeConverter(timestamp)
    },
    async getComments () {
      const vm = this
      const [err, { data }] = await vm.$t(vm.axios.get(`${vm.api}/${vm.id}`))
      if (err) {
        // TODO retry
        vm.$log.info('fail to getComments', err)
      }
      vm.$log.info('data', data)
      vm.res = { ...data }
    },
    async submitComment () {
      const vm = this
      if (!vm.content) {
        return
      }
      const { data } = await vm.axios({
        method: 'POST',
        url: vm.api,
        data: {
          id: vm.id,
          content: vm.content
        }
      })
      // 写入 afterCommentInfo
      vm.infoafterComment = { ...data }
      // 成功, 再次 get 库存
      vm.getComments()
      // 控制弹窗
      vm.$refs['bv-modal-msg'].show()
    },
    closeModal () {
      const vm = this
      if (vm.infoafterComment.code === 1) {
        vm.content = null
      }
      vm.$refs['bv-modal-msg'].hide()
    }
  },
  computed: {
    hasComments () {
      return !objectIsEmpty(this.res)
    },
    isLogin () {
      return Boolean(this.$store.state.userName)
    }
  },
  props: {
    id: String
  }
}
</script>
<style lang="scss">
</style>
