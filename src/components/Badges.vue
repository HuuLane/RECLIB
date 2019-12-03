<template>
  <span>
    <b-badge
    v-for="(item, index) in tags"
    :key="index"
    class="mr-2"
    :variant="variants[index]"
    @click="search"
    >{{item}}</b-badge>
  </span>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    tags: {
      type: Array[String],
      default () {
        return ['周杰伦']
      }
    },
  },
  data () {
    return {
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark']
    }
  },
  methods: {
    search (event) {
      const content = event.target.innerText
      this.$router.push(`/search?tag=${content}`)
    }
  }
}
</script>