<template>
  <div
    class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt"
  >
    <div class="div-border home-title">
      <h1 class=" mb-5">矩形图书馆</h1>
      <search-bar class="mb-5"/>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/SearchBar.vue'
export default {
  name: 'home',
  components: {
    searchBar
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
.container_full-heigt {
  @include full-heigt;
}
.home-title {
  text-align: center;
  @include bold-outline;
}
.div-border {
  @include bold-outline;
  padding: 3vh;
}
</style>
