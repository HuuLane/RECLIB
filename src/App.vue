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
  }
}
</script>
<style lang="scss">
</style>
