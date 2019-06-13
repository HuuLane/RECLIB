<template>
<div>
  <page-not-found v-if="!documentCount">找不到! 无能为力</page-not-found>
  <b-container v-else>
    <h1>搜寻结果: 共有{{ documentCount }}条</h1>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isBusy"
      infinite-scroll-distance="5"
    >
      <div v-for="(items, tensIndex) in pagesRawData" :key="tensIndex">
        <b-card
          fluid
          class="mb-2"
          v-for="(item, index) in items"
          :key="index"
          @click="goToSubject(item._id)"
        >
          <b-card-title> {{tensIndex * 10 + index + 1}} {{item.title}} </b-card-title>
          <b-card-text v-if="item.info['副标题']"> {{item.info['副标题']}} </b-card-text>
          <pre> {{item}} </pre>
        </b-card>
      </div>
    </div>
    <!-- 辅助组件 -->
    <div v-show="isBusy" class="d-flex flex-column flex-wrap justify-content-center align-content-center" style="height: 20vh;">
      <div v-show="isEnd">
        <p>那天, 我翻阅字典, 查什么字眼. 形容一件事, 很遥远.</p>
        <p>天边, 是否在海角对面? 直到九岁, 才知道浪费时间.</p>
      </div>
      <b-spinner variant="dark" v-show="!isEnd"></b-spinner>
    </div>
    <scroll-to-top :duration="0.5"><font-awesome-icon icon="angle-up"/></scroll-to-top>
  </b-container>
</div>
</template>

<script>
// eslint-disable-next-line
import { log, dir, setClock, objectIsEmpty } from '@/assets/utils.js'
import infiniteScroll from 'vue-infinite-scroll'
import { setTimeout } from 'timers'
import { match } from 'minimatch'

export default {
  name: 'Search',
  created () {
    const vm = this
    vm.queryParams = { ...vm.$route.query }
    // 如果没有参数, 回到首页~
    if (objectIsEmpty(vm.queryParams)) {
      vm.$router.push('/')
      return
    }
    // 初始化
    vm.axios({
      url: `${process.env.VUE_APP_BOOK}`,
      method: 'GET',
      params: {count: 1, ...vm.queryParams}
    }).then((response) => {
      vm.documentCount = Number(response.data)
    }).catch(err => {
      log('err', err)
    })
  },
  data () {
    return {
      api: process.env.VUE_APP_BOOK,
      documentCount: 'loading...',
      currentPage: 0,
      isBusy: false,
      isEnd: false,
      queryParams: {},
      pagesRawData: []
    }
  },
  methods: {
    addPageData (pageIndex, data) {
      const vm = this
      vm.$set(vm.pagesRawData, pageIndex - 1, data)
      // 并且送入 store
      vm.$store.commit('saveRowDataIntoItems', data)
    },
    async cachePageData (index) {
      const vm = this
      // 如果已经缓存, 则返回
      if (vm.pagesRawData[index - 1]) {
        // log('has cache')
        return true
      }
      // 模拟延迟吧..
      await setClock()
      try {
        const { data } = await vm.axios({
          url: `${process.env.VUE_APP_BOOK}`,
          method: 'GET',
          params: { page: index, ...vm.queryParams }
        })
        this.addPageData(index, data)
        // log('save successfully')
        return true
      } catch (error) {
        console.error(error)
        // log('unsave successfully')
        return false
      }
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
      vm.cachePageData(++vm.currentPage).then((isSuccess) => {
        vm.isBusy = !isSuccess
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
  directives: { infiniteScroll },
  components: {
    PageNotFound: () => import('@/components/PageNotFound.vue'),
    scrollToTop: () => import('@/components/ScrollToTop.vue')
  }
}
</script>

<style scoped lang="scss">
@mixin cant-select {
  user-select: none;
}
.btn_pagination {
  @include cant-select;
}
</style>
