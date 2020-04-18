<template>
  <div id="app">
    <Navbar/>
    <!-- <keep-alive include=""> -->
      <router-view/>
    <!-- </keep-alive> -->
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
  }
}
</script>
<style lang="css">
</style>
