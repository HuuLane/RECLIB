<template>
  <div class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <h1 class="home-title mb-5">RECLIB</h1>
    <search-bar class="mb-5"/>
    <h1 v-if="userName" class="home-title"> {{userName}} </h1>
    <h1 v-else class="home-title">矩形图书馆</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import searchBar from '@/components/SearchBar.vue'
// eslint-disable-next-line
const { log } = console
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
}

</style>
