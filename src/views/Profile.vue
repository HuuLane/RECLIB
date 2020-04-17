<template>
  <b-container>
    <div v-if="already">
      <div class="div-border div-primary">
        <h1>{{userData.name}}</h1>
        <p>本站第 <code>{{userData.index}}</code> 位会员</p>
        <p>注册时间: <code>{{Date(userData.date)}}</code></p>
      </div>
      <div v-if="userData.activity" class="div-border">
        <div v-if="userData.activity.comments">
          <h1>Comments</h1>
          <div v-for="(item, index) in userData.activity.comments" class="comment-entry" :key="index">
            <b-dropdown dropleft lazy variant="link" class="comment-entry-dropdown" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                <font-awesome-icon class="comment-entry-ellipsis-icon" icon="ellipsis-v" transform="shrink-2" />
              </template>
              <b-dropdown-item @click="editComment(item)">Edit</b-dropdown-item>
              <b-dropdown-item @click="deleteComment(item._id)">Delete</b-dropdown-item>
            </b-dropdown>
            <p><b>#{{index + 1}} Commented</b> on <b-link :to="'/subject/' + item.book._id">{{item.book.title}}</b-link></p>
            <div>
              <p v-if="editting._id !== item._id">{{item.content}}</p>
              <!-- edit component -->
              <template v-else>
                <input type="text" v-model="content" class="text-input" placeholder="Edit the comment..." />
                <b-button size="sm" class="text-input-button" squared variant="outline-secondary" @click="cancelEdit">CANCEL</b-button>
                <b-button size="sm" class="text-input-button" squared variant="primary" :disabled="!savable" @click="submitEdit">SAVE</b-button>
              </template>
            </div>
            <p>
              <span class="text-secondary" v-b-tooltip.hover v-b-tooltip.top :title="timeConverter(item.date)">{{daysago(item.date)}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <b>快去多体验!</b>
        <mark>撰写评论</mark>
      </div>
    </div>
    <div class="container_full-heigt" v-else>
      <b-spinner class="absolute-center spinner_big"/>
    </div>
  </b-container>
</template>

<script>
import { objectIsEmpty, timeConverter, diffDays } from '@/utils.js'
export default {
  name: 'Profile',
  created () {
    const vm = this
    if (!vm.userName) {
      vm.$router.push('/login')
      vm.$fm.error('Please login first')
      return
    }
    vm.axios.get('/user').then(({ data: res }) => {
      vm.$log.info(res)
      if (res.code === 1) {
        vm.userData = { ...res.data }
      }
    }).catch(err => {
      vm.$log.error('err', err)
    })
  },
  data () {
    return {
      userData: {},
      editting: {},
      content: '',
      originalContent: ''
    }
  },
  methods: {
    timeConverter: timeConverter,
    daysago (date) {
      const n = diffDays(date)
      if (n) {
        return `${n} days ago`
      } else {
        return 'today'
      }
    },
    editComment(item) {
      const vm = this
      vm.editting = item
      vm.content = item.content
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
          content: vm.content
        }
      }).then(({ data: res }) => {
        vm.$log.info(res)
        if (res.code === 1) {
          vm.$fm.success(res.msg)
          vm.editting.content = vm.content
          vm.cancelEdit()
        } else {
          vm.$fm.error(res.msg)
        }
      }).catch(err => {
        vm.$log.error('err', err)
      })
    },
    deleteComment() {

    }
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    already () {
      const vm = this
      return !objectIsEmpty(vm.userData)
    },
    savable () {
      const vm = this
      return vm.content !== vm.originalContent && vm.content.length !== 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.container_full-heigt {
  @include full-heigt;
}
.spinner_big {
  width: 3rem;
  height: 3rem;
}
.absolute-center {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.div-border {
  @include bold-outline;
  padding: 3vh;
}
.div-primary {
  margin-bottom: 7%;
}

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
