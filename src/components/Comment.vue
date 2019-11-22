<template>
  <div>
    <h3>评论板</h3>
    <div id="btn-submit-comment">
      <b-input-group size="lg" class="mr-sm-2">
        <!-- Comment box -->
        <b-form-input
          type="text"
          trim
          :disabled="!isLogin"
          placeholder="输入内容"
          v-model="content"
          @keyup.enter="submitComment"
        />
        <!-- Button -->
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
    <!-- Display board -->
    <table class="table table-borderless my-3" v-if="hasComments">
      <tbody v-if="res.comments.length">
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
        <b>no comment yet</b>
      </div>
    </table>
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
      res: {}
    }
  },
  methods: {
    transDate (timestamp) {
      return timeConverter(timestamp)
    },
    async getComments () {
      const vm = this
      const [err, { data }] = await vm.$t(vm.axios.get(`${vm.api}?book=${vm.id}`))
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
      const { data:res } = await vm.axios({
        method: 'POST',
        url: vm.api,
        data: {
          id: vm.id,
          content: vm.content
        }
      })
      if (res.code === 1) {
        vm.content = null
        vm.getComments()
        this.$fm.success('Comment successfully')
      } else {
        this.$fm.error('Fail to comment:' + res.msg)
      }
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
