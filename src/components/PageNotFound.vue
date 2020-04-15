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
      this.$router.go(-1)
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
