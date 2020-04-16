<template>
  <b-jumbotron>
    <template slot="header"><slot>找不到该图书</slot></template>
    <template slot="lead"><code> {{ countDown }} </code>秒后, 跳回首页</template>
    <b-button variant="primary" @click="justGo">立即返回</b-button>
  </b-jumbotron>
</template>

<script>
import { setInterval } from 'timers'
export default {
  name: 'PageNotFound',
  props: ['goback'],
  data () {
    return {
      countDown: 5
    }
  },
  methods: {
    goBack () {
      setInterval(() => {
        this.countDown--
      }, 1000)
    },
    justGo () {
      // BUG: 404 page
      const vm = this
      let n = Number(vm.goback)
      if (!isNaN(n)) {
        n *= -1
      } else {
        n = -1
      }
      vm.$log.debug('goback number:', n)
      vm.$router.replace(n)
      vm.$router.back()
    }
  },
  watch: {
    countDown: function (val) {
      if (!val) {
        this.justGo()
      }
    }
  },
  created () {
    const vm = this
    vm.goBack()
  }
}
</script>
