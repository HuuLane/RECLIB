<template>
  <b-container>
    <template v-if="!errOccur">
      <div v-if="!isBusy">
        <div class="div-border">
          <h1>{{userData.name}}</h1>
          <p>本站第 <code>{{userData.index}}</code> 位会员</p>
          <p>注册时间: <code>{{Date(userData.date)}}</code></p>
        </div>
        <div class="div-border my-5">
          <h1>Comments</h1>
          <comment-board :id="userData._id" :profile="true" />
        </div>
      </div>
      <div v-else class="container_full-heigt">
        <b-spinner class="absolute-center spinner_big"/>
      </div>
    </template>
    <div
        v-else
        class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt"
      >
        <page-not-found></page-not-found>
    </div>
  </b-container>
</template>

<script>
import { objectIsEmpty } from '@/utils.js'
export default {
  name: 'Profile',
  created () {
    const vm = this
    const name = vm.$route.params.name
    vm.axios.get(`/user/${name}`).then(({ data: res }) => {
      vm.$log.info(res)
      if (res.code === 1) {
        vm.userData = res.data
        vm.isBusy = false
      } else {
        vm.errOccur = true
        vm.$fm.error(res.msg)
      }
    }).catch(err => {
      vm.$log.error('err', err)
    })
  },
  data () {
    return {
      userData: {},
      isBusy: true,
      errOccur: false
    }
  },
  components: {
    pageNotFound: () => import('@/components/PageNotFound.vue'),
    commentBoard: () => import('@/components/Comment.vue')
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
</style>
