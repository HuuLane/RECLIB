<template>
  <div id="app">
    <Navbar/>
    <!-- <button @click="test">123</button> -->
    <keep-alive include="Admin">
      <router-view/>
    </keep-alive>
    <FlashMessage id="flash" :position="'right top'"></FlashMessage>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  created () {
    const vm = this
    vm.$store.dispatch('sessionLogin')
  },
  methods: {
    test () {
      this.flashMessage.success({
        title: 'Success Message Title',
        message: 'Hoorah, it is my fist npm package and it works!'
      })
    }
  }
}
</script>
<style lang="css">
#flash {
  z-index: 3;
}
</style>
