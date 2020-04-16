<template>
  <div id="app">
    <Navbar/>
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
      this.$fm.error(123)
    }
  }
}
</script>
<style lang="css">
</style>
