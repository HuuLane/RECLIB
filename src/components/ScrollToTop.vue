<template>
  <div>
    <b-button v-clipscroll @click="goToTop" squared variant="outline-dark" class="myBtn">
      <font-awesome-icon icon="angle-up"/>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  methods: {
    goToTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  directives: {
    clipscroll: {
      inserted (el) {
        window.addEventListener('scroll', () => {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            el.style.display = "block"
          } else {
            el.style.display = "none"
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.myBtn {
  display: none;
  position: fixed;
  bottom: 10vh;
  left: 80vw;
  z-index: 99;
}
</style>


