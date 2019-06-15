<template>
  <div id="app">
    <Navbar/>
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
    vm.$store.dispatch('readUserState')
  }
}
</script>
<style lang="scss">
</style>
