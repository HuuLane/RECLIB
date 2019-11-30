<template>
  <div>
    <div id="btn-submit-comment" v-if="!profile">
      <b-input-group size="lg" class="mr-sm-2">
        <!-- Comment box -->
        <b-form-input
          type="text"
          trim
          :disabled="!isLogin"
          placeholder="Add a public comment..."
          v-model="newCommentInput"
          @keyup.enter="submitComment"
        />
        <!-- Button -->
        <b-input-group-append>
          <b-button
            variant="outline-dark"
            block
            @click="submitComment"
            :disabled="!isLogin"
          >COMMENT</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-tooltip v-if="!isLogin" target="btn-submit-comment" placement="top">
        <strong>please login first</strong>
      </b-tooltip>
    </div>
    <!-- Display board -->
    <!-- TODO center it -->
    <b-spinner variant="dark" class="text-center my-5" v-if="isBusy"></b-spinner>
    <template v-else>
      <div v-if="!comments.length" class="text-center my-5">
        <b>no comment yet</b>
      </div>
      <div v-for="(item, index) in comments" class="comment-entry" :key="index">
        <b-dropdown dropleft lazy variant="link" class="comment-entry-dropdown" toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            <font-awesome-icon class="comment-entry-ellipsis-icon" icon="ellipsis-v" transform="shrink-2" />
          </template>
          <b-dropdown-item @click="editComment(item)">Edit</b-dropdown-item>
          <b-dropdown-item @click="deleteComment(item._id)">Delete</b-dropdown-item>
        </b-dropdown>
        <p>
          <template v-if="profile">
            <b>#{{index + 1}} Commented</b>
            <span> on </span>
            <b-link :to="'/subject/' + item.book._id">{{item.book.title}}</b-link>
          </template>
          <template v-else>
            <b>#{{index + 1}} </b>
            <b-link :to="'/user/' + item.user.name">{{item.user.name}}</b-link>
          </template>
          <span class="text-secondary" v-b-tooltip.hover v-b-tooltip.top :title="timeConverter(item.date)">
            {{daysago(item.date)}} {{commentEdited(item.edited)}}
          </span>
        </p>
        <div>
          <p v-if="editting._id !== item._id">{{item.content}}</p>
          <!-- edit component -->
          <template v-else>
            <input type="text" v-model="editInput" class="text-input" placeholder="Edit the comment..." />
            <b-button size="sm" class="text-input-button" squared variant="outline-secondary" @click="cancelEdit">CANCEL</b-button>
            <b-button size="sm" class="text-input-button" squared variant="primary" :disabled="!savable" @click="submitEdit">SAVE</b-button>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { timeConverter, objectIsEmpty, setClock, diffDays } from '@/utils.js'
export default {
  name: 'Comment',
  async created () {
    const vm = this
    await setClock(1)
    await vm.getComments()
  },
  data () {
    return {
      newCommentInput: '',
      editInput: '',
      isBusy: true,
      originalContent: '',
      editting: {},
      comments: []
    }
  },
  methods: {
    async getComments () {
      const vm = this
      let url = ''
      if (vm.profile) {
        url = `/comment?user=${vm.id}`
      } else {
        url = `/comment?book=${vm.id}`
      }
      vm.axios.get(url)
        .then(({ data }) => {
          vm.$log.info('data', data)
          vm.comments = data.comments
          vm.isBusy = false
        })
        .catch(err => {
          // TODO retry
          vm.$log.info('fail to getComments', err)
        })
    },
    timeConverter: timeConverter,
    daysago (date) {
      const n = diffDays(date)
      if (n) {
        return `${n} days ago`
      } else {
        return 'today'
      }
    },
    async submitComment () {
      const vm = this
      if (!vm.newCommentInput) {
        return
      }
      const { data:res } = await vm.axios({
        method: 'POST',
        url: '/comment',
        data: {
          id: vm.id,
          content: vm.newCommentInput
        }
      })
      if (res.code === 1) {
        vm.newCommentInput = null
        vm.getComments()
        this.$fm.success('Comment successfully')
      } else {
        this.$fm.error('Fail to comment:' + res.msg)
      }
    },
    editComment(item) {
      const vm = this
      vm.editting = item
      vm.editInput = item.content
      vm.originalContent = item.content
    },
    cancelEdit() {
      this.editting = {}
    },
    submitEdit() {
      const vm = this
      vm.axios({
        method: 'PUT',
        url: `/comment/${vm.editting._id}`,
        data: {
          content: vm.editInput
        }
      }).then(({ data: res }) => {
        vm.$log.info(res)
        if (res.code === 1) {
          vm.$fm.success(res.msg)
          vm.editting.content = vm.editInput
          vm.cancelEdit()
        } else {
          vm.$fm.error(res.msg)
        }
      }).catch(err => {
        vm.$log.error('err', err)
      })
    },
    deleteComment() {
      // TODO
    },
    commentEdited(e) {
      if (e) {
        return '(edited)'
      } else {
        return ''
      }
    }
  },
  computed: {
    isLogin () {
      return Boolean(this.$store.state.userName)
    },
    savable () {
      const vm = this
      return vm.editInput !== vm.originalContent && vm.editInput.length !== 0
    }
  },
  props: {
    id: String,
    profile: Boolean
  }
}
</script>
<style lang="scss">
.comment-entry {
  margin: 3rem 0;
  position: relative;
}

.comment-entry:hover {
  .comment-entry-ellipsis-icon {
    opacity: 1;
  }
}

.comment-entry-dropdown {
  position: absolute;
  left: 80%;
  top: 8%;
}

.comment-entry-ellipsis-icon {
  color: silver;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}

.comment-entry-ellipsis-icon:hover {
  color: darkgray;
}

.text-input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: blue  
}
.text-input:focus {
  border-color: green
}
.text-input-button {
  border: none;
}
</style>
