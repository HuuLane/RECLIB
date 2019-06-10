<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button @click="cacheInfo" block v-b-toggle.accordion-1 variant="outline-dark">内容简介</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="text-center my-4" v-if="isBusy">
            <b-spinner variant="outline-dark"/>
          </div>
          <b-card-text class="text_scroll" v-else> {{ intro[0] }} </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button @click="cacheInfo" block href="#" v-b-toggle.accordion-2 variant="outline-dark">作者简介</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="text-center my-4" v-if="isBusy">
            <b-spinner variant="outline-dark"/>
          </div>
          <b-card-text class="text_scroll" v-else>{{ intro[1] }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { myFetch, log, setClock } from '@/assets/utils.js'
const beautify = (str) => {
  return str.split(' ------------------------------------------------------------------------------------------------ ').join('')
}
export default {
  name: 'IntroCollapse',
  props: {
    id: String
  },
  data () {
    return {
      api: process.env.VUE_APP_BOOK,
      isBusy: true,
      intro: []
    }
  },
  methods: {
    async cacheInfo () {
      const vm = this
      if (vm.intro.length) {
        return
      }
      await setClock(2)
      const res = await myFetch('GET', `${vm.api}?intro=${vm.id}`)
      log('res', res)
      // 取消 busy状态
      vm.isBusy = false
      if (!res) {
        vm.$set(vm.intro, 0, '没有内容')
        vm.$set(vm.intro, 1, '没有内容')
        return
      }
      vm.$set(vm.intro, 0, beautify(res.intro[0]))
      vm.$set(vm.intro, 1, beautify(res.intro[1]))
    }
  }
}
</script>
<style lang="scss">
.text_scroll {
  height: 10vh;
  overflow: auto;
}
</style>
