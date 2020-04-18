<template>
  <b-jumbotron>
    <template v-slot:header>
      <slot>404 Not Found</slot>
    </template>
    <template v-slot:lead>
      <slot name="info"></slot>
    </template>    
    <b-button variant="primary" @click="justGo">立即返回</b-button>
  </b-jumbotron>
</template>

<script>
import { setInterval } from 'timers'
export default {
  name: 'PageNotFound',
  props: ['goback'],
  methods: {
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
      // vm.$router.replace(n)
      vm.$router.back()
    }
  }
}
</script>
