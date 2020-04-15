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
          <code>{{Date(userData.date)}}</code>
        </li>
      </ul>
      <div v-if="userData.activity">
        <div v-if="userData.activity.comments">
          <h1>你说的:</h1>
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">书名</th>
                <th scope="col">评论</th>
                <th scope="col">日期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userData.activity.comments" :key="index">
                <th scope="row">{{index}}</th>
                <td>
                  <a @click.prevent="goToSubject(item.book._id)">{{item.book.title}}</a>
                </td>
                <td>
                  {{item.content}}
                </td>
                <td>
                  <code>{{timeConverter(item.date)}}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="userData.activity.rentBook">
          <h1>你借的:</h1>
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">书名</th>
                <th scope="col">归还日期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userData.activity.rentBook" :key="index">
                <th scope="row">{{index}}</th>
                <td>
                  <a @click.prevent="goToSubject(item.bookID)">{{item.bookName}}</a>
                </td>
                <td>
                  <code>{{timeConverter(item.date + (30 * 24 * 3600) * 1000)}}</code>
                </td>
              </tr>
            </tbody>
          </table>
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
import { objectIsEmpty, timeConverter } from '@/utils.js'
export default {
  name: 'Profile',
  created () {
    const vm = this
    if (!vm.userName) {
      vm.$router.push('/login')
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
    timeConverter: timeConverter,
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
