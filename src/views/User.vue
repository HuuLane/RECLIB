<template>
  <b-container>
    <div v-if="already">
      <div class="div-border div-primary">
        <h1>{{userData.name}}</h1>
        <p>本站第 <code>{{userData.index}}</code> 位会员</p>
        <p>注册时间: <code>{{Date(userData.date)}}</code></p>
      </div>
      <div class="div-border">
        <h1>Comments</h1>
        <comment-board class="mt-5" :id="userData._id" :profile="true" />
      </div>
    </div>
    <div class="container_full-heigt" v-else>
      <b-spinner class="absolute-center spinner_big"/>
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
        vm.userData = { ...res.data }
      } else {
        // TODO no the user
        vm.$fm.error(res.msg)
      }
    }).catch(err => {
      vm.$log.error('err', err)
    })
  },
  data () {
    return {
      userData: {},
    }
  },
  computed: {
    already () {
      const vm = this
      return !objectIsEmpty(vm.userData)
    }
  },
  components: {
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
.div-primary {
  margin-bottom: 7%;
}
</style>
