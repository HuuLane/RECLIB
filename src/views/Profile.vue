<template>
  <b-container>
    <div v-if="alreadyGetData">
      <h1>{{userData.name}} 的个人详情</h1>
      <ul>
        <li>
          本站第:
          <code>{{userData.index}}</code> 位会员
        </li>
        <li>
          注册时间:
          <code>{{userData.date}}</code>
        </li>
      </ul>
      <div v-if="userData.activity">
        <div v-if="userData.activity.comments">
          <h1>你说的: </h1>
          <ul>
            <li v-for="(item, index) in userData.activity.comments" :key="index">
              <a @click.prevent="goToSubject(item.bookID)"> {{item.bookName}} </a>
              <b>时间: </b>
              <code> {{getReturnTime(item.date)}} </code>
              <b>说: </b>
              <mark> {{item.content}} </mark>
            </li>
          </ul>
        </div>
        <div v-if="userData.activity.rentBook">
          <h1>你借的: </h1>
          <ul>
            <li v-for="(item, index) in userData.activity.rentBook" :key="index">
              <a @click.prevent="goToSubject(item.bookID)"> {{item.bookName}} </a>
              <b>归还日期: </b>
              <code> {{getReturnTime(item.date  + (30 * 24 * 3600) * 1000)}} </code>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <b>快去多体验看看!</b>
        <mark>撰写评论</mark>
        <mark>借书 etc.</mark>
      </div>
    </div>
    <div class="container_full-heigt" v-else>
      <b-spinner class="absolute-center spinner_big"/>
    </div>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { log, objectIsEmpty, timeConverter } from '@/utils.js'
export default {
  name: 'Profile',
  created () {
    const vm = this
    log('进入 Profile')
    // 防止未登录就过来啦
    if (!vm.userName) {
      vm.$router.push('/login')
      return
    }
    vm.axios({
      method: 'GET',
      url: `${process.env.VUE_APP_PROFILE}`
    }).then(({ data: res }) => {
      log('profile res', res)
      if (res.code === 1) {
        vm.userData = { ...res.data }
      }
    }).catch(err => {
      log('err', err)
    })
  },
  data () {
    return {
      userData: {}
    }
  },
  methods: {
    getReturnTime (timestamp) {
      const dateOfReturn = Number(timestamp)
      return timeConverter(dateOfReturn)
    },
    goToSubject (bookID) {
      const vm = this
      vm.$router.push(`/subject/${bookID}`)
    }
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    alreadyGetData () {
      const vm = this
      return !objectIsEmpty(vm.userData)
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
</style>
