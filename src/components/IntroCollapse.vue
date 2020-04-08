<template>
  <div role="tablist">
    <b-button
      @click="cacheInfo(), activeMe()"
      squared
      class="border-0"
      block
      v-b-toggle.accordion-1
      variant="outline-dark"
      data-name="firstBtn"
    >
      <font-awesome-icon icon="caret-right" v-if="!isActive('firstBtn')"/>
      <font-awesome-icon icon="caret-down" v-else-if="isActive('firstBtn')"/>
      内容简介
    </b-button>
    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <div class="text-center my-4" v-if="isBusy">
          <b-spinner variant="outline-dark"/>
        </div>
        <b-card-text class="text_scroll" v-else>{{ intro[0] }}</b-card-text>
      </b-card-body>
    </b-collapse>

    <b-button
      @click="cacheInfo(), activeMe()"
      squared
      class="border-0"
      block
      href="#"
      v-b-toggle.accordion-2
      variant="outline-dark"
      data-name="secondBtn"
    >
      <font-awesome-icon icon="caret-right" v-if="!isActive('secondBtn')"/>
      <font-awesome-icon icon="caret-down" v-else-if="isActive('secondBtn')"/>
      作者简介
    </b-button>
    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <div class="text-center my-4" v-if="isBusy">
          <b-spinner variant="outline-dark"/>
        </div>
        <b-card-text class="text_scroll" v-else>{{ intro[1] }}</b-card-text>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
// eslint-disable-next-line
import { log, setClock } from '@/utils.js'
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
      api: '/book',
      isBusy: true,
      intro: [],
      activeBtn: ''
    }
  },
  methods: {
    async cacheInfo () {
      const vm = this
      if (vm.intro.length) {
        return
      }
      await setClock(1)
      const { data: res } = await vm.axios({
        method: 'GET',
        url: `${vm.api}?intro=${vm.id}`
      })
      // log('res', res)
      // 取消 busy状态
      vm.isBusy = false
      if (!res) {
        vm.$set(vm.intro, 0, '没有内容')
        vm.$set(vm.intro, 1, '没有内容')
        return
      }
      vm.$set(vm.intro, 0, beautify(res.intro[0]))
      vm.$set(vm.intro, 1, beautify(res.intro[1]))
    },
    activeMe (e) {
      const vm = this
      const { target } = event
      const name = target.dataset.name
      if (vm.activeBtn === name) {
        vm.activeBtn = ''
      } else {
        vm.activeBtn = name
      }
    },
    isActive (name) {
      const vm = this
      if (vm.activeBtn === name) {
        return true
      } else {
        return false
      }
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
