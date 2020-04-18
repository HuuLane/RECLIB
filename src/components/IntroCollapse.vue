<template>
  <div role="tablist">
    <b-button
      @click="activate"
      squared
      class="border-0"
      block
      v-b-toggle.accordion-1
      variant="outline-dark"
      data-name="firstBtn"
    >
      <b-icon-caret-right v-if="!isActive('firstBtn')"/>
      <b-icon-caret-down v-else-if="isActive('firstBtn')"/>
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
      @click="activate"
      squared
      class="border-0"
      block
      href="#"
      v-b-toggle.accordion-2
      variant="outline-dark"
      data-name="secondBtn"
    >
      <b-icon-caret-right v-if="!isActive('secondBtn')"/>
      <b-icon-caret-down v-else-if="isActive('secondBtn')"/>
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
import { setClock } from '@/utils.js'
export default {
  name: 'IntroCollapse',
  props: {
    id: String
  },
  data () {
    return {
      isBusy: true,
      intro: [],
      active: ''
    }
  },
  methods: {
    async fetchIntro () {
      const vm = this
      if (vm.intro.length) {
        return
      }
      await setClock()
      try {
        const { data: res } = await vm.axios.get(`/book?intro=${vm.id}`)
        vm.isBusy = false
        if (!res) {
          vm.intro = ['没有内容', '没有内容']
          return
        }
        vm.intro = res.intro
      } catch (error) {
        vm.isBusy = false
        vm.$log.error(error)
        vm.$fm.NETERR()
        vm.intro = ['Network error', 'Network error']
      }
    },
    async activate (event) {
      const vm = this
      const { target } = event
      await vm.fetchIntro()
      const name = target.dataset.name
      if (vm.active === name) {
        vm.active = ''
      } else {
        vm.active = name
      }
    },
    isActive (name) {
      const vm = this
      if (vm.active === name) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    BIconCaretRight: () => import('bootstrap-vue').then(m => m.BIconCaretRight),
    BIconCaretDown: () => import('bootstrap-vue').then(m => m.BIconCaretDown),
  }
}
</script>
<style lang="scss">
.text_scroll {
  height: 10vh;
  overflow: auto;
}
</style>
