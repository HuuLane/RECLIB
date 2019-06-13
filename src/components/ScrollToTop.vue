<template>
  <b-button v-scroll @click="goToTop" @dblclick="goToTopInstantly" squared variant="outline-dark" class="myBtn">
    <slot>↑</slot>
  </b-button>
</template>

<script>
const setClock = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000)
  })
}

export default {
  name: 'ScrollToTop',
  props: {
    fps: {
      type: Number,
      default: 120
    },
    duration: {
      type: Number,
      default: 0.5
    }
  },
  methods: {
    async goToTop () {
      const vm = this
      const distance = (document.documentElement.scrollTop) / (vm.fps * vm.duration)
      while (document.documentElement.scrollTop) {
        document.documentElement.scrollTop -= distance
        await setClock(1 / vm.fps)
      }
    },
    goToTopInstantly () {
      document.documentElement.scrollTop = 0
    }
  },
  directives: {
    scroll: {
      inserted (el) {
        window.addEventListener('scroll', () => {
          if (document.documentElement.scrollTop > 20) {
            el.style.display = 'block'
          } else {
            el.style.display = 'none'
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
