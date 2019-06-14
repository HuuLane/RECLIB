<template>
  <div class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <!-- <img src="@/assets/rec.png" fluid> -->
    <h1 class="home-title mb-5">RECLIB</h1>
    <search-bar class="mb-5"/>
    <h1 class="home-title">矩阵图书馆</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import searchBar from '@/components/SearchBar.vue'

export default {
  name: 'home',
  components: {
    searchBar
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
