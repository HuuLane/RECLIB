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
          <div v-for="(item, index) in userData.activity.comments" :key="index">
            <p><b>Commented</b> on <b-link :to="'/subject/' + item.book._id">{{item.book.title}}</b-link></p>
            <p>{{item.content}}</p>
            <div class="text-secondary">
              <p v-if="timeConverter(item.date)">{{timeConverter(item.date)}} days ago</p>
              <p v-else>today</p>
            </div>
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
      userData: {}
    }
  },
  methods: {
    timeConverter: diffDays,
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
    already () {
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
.div-border {
  @include bold-outline;
  padding: 3vh;
}
.div-primary {
  margin-bottom: 7%;
}
</style>
