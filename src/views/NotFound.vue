<template>
  <div class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <page-not-found>
      没有该页面诶, 请见得风识得雨.
    </page-not-found>
  </div>
</template>

<script>
// eslint-disable-next-line
const { log } = console
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
