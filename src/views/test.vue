<template>
  <b-container>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div v-for="(item, index) in data" :key="index">
        <b-card
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-title @click="scrollToTop"> {{index}} </b-card-title>
          <b-card-text>hello</b-card-text>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
const { log } = console
export default {
  name: 'test',
  created () {
  },
  data () {
    return {
      data: [],
      count: 0,
      busy: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ })
        }
        this.busy = false
      }, 500)
    }
  },
  directives: {infiniteScroll}
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.div_full {
  @include full-heigt;
}
</style>
