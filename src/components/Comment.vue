<template>
  <div>
    <h1>评论板</h1>
    <!-- 评论框 -->
    <b-input type="text" :disabled="!isLogin" placeholder="输入内容" v-model="commentContent"/>
    <!-- 提交按钮 -->
    <div id="btn-submit-comment">
      <b-btn
        variant="outline-dark"
        squared
        block
        @click="submitComment"
        :disabled="!isLogin"
      >搞个大新闻</b-btn>
      <b-tooltip v-if="!isLogin" target="btn-submit-comment" placement="right">
        <strong>登录即可歌颂党国</strong>
      </b-tooltip>
    </div>
    <!-- 展示板 -->
    <table class="table table-sm" v-if="getCommentsIsOkay">
      <tbody v-if="res.code === 1">
        <tr v-for="(item, index) in res.comments" :key="index">
          <th scope="row">{{index}}L</th>
          <td>
            <code>{{item.name}}</code> 说:
          </td>
          <td><b> {{item.content}}</b></td>
          <td>
            <code>{{transDate(item.date)}}</code>
          </td>
        </tr>
      </tbody>
      <div v-else class="text-center my-4">{{res.msg}}</div>
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
// eslint-disable-next-line
import { timeConverter, log, objectIsEmpty } from '@/assets/utils'
export default {
  name: 'Comment',
  created () {
    const vm = this
    vm.getComments()
  },
  data () {
    return {
      api: process.env.VUE_APP_COMMENT,
      commentContent: null,
      res: {},
      infoafterComment: {}
    }
  },
  methods: {
    transDate (timestamp) {
      return timeConverter(timestamp)
    },
    getComments () {
      const vm = this
      vm.axios({
        method: 'GET',
        url: `${vm.api}/${vm.id}`
      }).then(({ data }) => {
        // log('data', data)
        vm.res = { ...data }
      }).catch(err => {
        log('err', err)
      })
    },
    async submitComment () {
      const vm = this
      const { data } = await vm.axios({
        method: 'PUT',
        url: vm.api,
        data: {
          id: vm.id,
          content: vm.commentContent
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
        vm.commentContent = null
      }
      vm.$refs['bv-modal-msg'].hide()
    }
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    getCommentsIsOkay () {
      return !objectIsEmpty(this.res)
    },
    isLogin () {
      return Boolean(this.userName)
    }
  },
  props: {
    id: String
  }
}
</script>
<style lang="scss">
</style>
