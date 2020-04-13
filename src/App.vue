<template>
  <div id="app">
    <Navbar/>
    <FlashMessage :position="'right top'"></FlashMessage>
    <!-- <button @click="test">123</button> -->
    <keep-alive include="Admin">
      <router-view/>
    </keep-alive>
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
<style lang="scss">
</style>
