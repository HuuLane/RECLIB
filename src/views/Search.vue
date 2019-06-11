<template>
<div>
  <page-not-found v-if="!documentCount">找不到! 无能为力</page-not-found>
  <b-container v-else>
    <h1>共有{{ documentCount }}条数据 (๑¯◡¯๑)~</h1>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isBusy"
      infinite-scroll-distance="5"
    >
      <div v-for="(items, index) in pagesRawData" :key="index">
        <b-card
          fluid
          class="mb-2"
          v-for="(item, index) in items"
          :key="index"
          @click="goToSubject(item._id)"
        >
          <b-card-title> {{item.title}} </b-card-title>
          <b-card-text v-if="item.info['副标题']"> {{item.info['副标题']}} </b-card-text>
          <pre> {{item}} </pre>
        </b-card>
      </div>
    </div>
    <div v-if="isBusy" class="d-flex flex-column flex-wrap justify-content-center align-content-center" style="height: 20vh;">
      <div v-if="isEnd">
        <p>那天, 我翻阅字典, 查什么字眼. 形容一件事, 很遥远.</p>
        <p>天边, 是否在海角对面? 直到九岁, 才知道浪费时间.</p>
      </div>
      <b-spinner variant="dark" v-else></b-spinner>
    </div>
  </b-container>
</div>
</template>

<script>
// eslint-disable-next-line
import { myFetch, log, dir, setClock, objectIsEmpty } from '@/assets/utils.js'
import infiniteScroll from 'vue-infinite-scroll'
import { setTimeout } from 'timers'
import { match } from 'minimatch';

const transToUrl = (query) => {
  let str = ''
  for (const key in query) {
    if (query[key]) {
      str += `&${key}=${query[key]}`
    } else {
      str += `&${key}`
    }
  }
  return str.replace('&', '?')
}

export default {
  name: 'Search',
  created () {
    const vm = this
    const query = vm.$route.query
    // 如果没有参数, 回到首页~
    if (objectIsEmpty(query)) {
      vm.$router.push('/')
      return
    }
    vm.queryUrl = transToUrl(query)
    // 初始化
    myFetch('GET', `${vm.api}${vm.queryUrl}&count`).then(r => {
      vm.documentCount = Number(r)
    })
  },
  data () {
    return {
      api: process.env.VUE_APP_BOOK,
      documentCount: 1,
      currentPage: 0,
      isBusy: false,
      isEnd: false,
      queryUrl: '',
      pagesRawData: []
    }
  },
  methods: {
    addPageData (pageIndex, data) {
      const vm = this
      vm.$set(vm.pagesRawData, pageIndex - 1, data)
    },
    async cachePageData (index) {
      const vm = this
      // 如果已经缓存, 则返回
      if (vm.pagesRawData[index - 1]) {
        return 'has cache'
      }
      // 模拟延迟吧..
      await setClock()
      const data = await myFetch('GET', `${vm.api}${vm.queryUrl}&page=${index}`)
      this.addPageData(index, data)
      return 'save successfully'
    },
    loadMore () {
      const vm = this
      vm.isBusy = true
      // log('当前页码', this.currentPage)
      if (vm.currentPage === vm.maxIndexOfPage) {
        // log('最大页啦~')
        vm.isEnd = true
        return
      }
      vm.cachePageData(++vm.currentPage).then((response) => {
        vm.isBusy = false
      }).catch(err => {
        log('err', err)
        vm.isBusy = false
      })
    },
    goToSubject (_id) {
      this.$router.push(`/subject/${_id}`)
    }
  },
  computed: {
    maxIndexOfPage () {
      return Math.ceil(this.documentCount / 10)
    }
  },
  directives: {infiniteScroll},
  components: {
    PageNotFound: () => import('@/components/PageNotFound.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin cant-select {
  user-select: none;
}
.btn_pagination {
  @include cant-select;
}
</style>
