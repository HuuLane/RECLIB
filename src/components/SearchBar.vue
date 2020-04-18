<template>
  <div>
     <!-- fa-1x -->
    <b-icon-search icon="search" @click="goToSearch" class="mx-3"/>
    <input
      v-focus
      class="search-bar_clear search-bar--text"
      type="text"
      :placeholder="placeholder"
      aria-label="Search"
      v-model="inputContent"
      @keyup.enter="goToSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    msg: String
  },
  data () {
    return {
      placeholder: '搜索书面, 作者, 标签 etc.',
      inputContent: ''
    }
  },
  methods: {
    goToSearch () {
      const vm = this
      const queryStr = vm.inputContent.trim()
      if (!queryStr) {
        return
      }
      vm.$router.push(`/search?all=${queryStr}`)
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  components: {
    BIconSearch: () => import('bootstrap-vue').then(m => m.BIconSearch),
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";

.div-border {
  @include bold-outline;
}

.search-bar_clear {
  @include clear-input-text;
}

@include media-breakpoint-up(lg) {
  .search-bar--text {
    font-size: 5rem;
  }
}
@include media-breakpoint-between(md, lg) {
  .search-bar--text {
    font-size: 3rem;
  }
}
@include media-breakpoint-down(sm) {
  .search-bar--text {
    font-size: 1.25rem;
  }
}
</style>
