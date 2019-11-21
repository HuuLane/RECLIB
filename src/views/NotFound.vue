<template>
  <div class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <page-not-found>
      No such page, please see the wind and rain.
    </page-not-found>
  </div>
</template>

<script>
export default {
  name: 'notfound',
  components: {
    pageNotFound: () => import('@/components/PageNotFound.vue')
  }
}
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
.container_full-heigt {
  @include full-heigt;
}
</style>
