<template>
  <b-container>
    <div v-if="!documentCount" class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
      <page-not-found>
        没有搜寻结果
        <template v-slot:info>
          推荐: <badges />
        </template>
      </page-not-found>
    </div>
    <div v-else>
      <h2>搜寻结果: 找到 <code>{{ documentCount }}</code> 本</h2>
      <!-- BUG -->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isBusy"
        infinite-scroll-distance="3"
        infinite-scroll-immediate-check="false"
      >
        <div v-for="(items, tensIndex) in pagesRawData" :key="tensIndex">
          <b-card
            fluid
            class="mb-3 card_border border-0"
            v-for="(item, index) in items"
            :key="index"
            @click="goToSubject(item._id)"
          >
            <b-card-body>
              <b-card-title>{{tensIndex * 10 + index + 1}} {{item.title}}</b-card-title>
              <b-card-sub-title v-if="item.info" class="mb-2">作者: {{ item.info['作者'] }} </b-card-sub-title>
              <b-card-sub-title v-if="item.score && item.rating">评分: {{item.score}} {{item.rating}}人读过</b-card-sub-title>
            </b-card-body>
          </b-card>
        </div>
      </div>
      <div
        v-show="isBusy"
        class="d-flex flex-column flex-wrap justify-content-center align-content-center"
        style="height: 20vh;"
      >
        <div v-show="isEnd">
          <p>那天, 我翻阅字典, 查什么字眼. 形容一件事, 很遥远.</p>
          <p>天边, 是否在海角对面? 直到九岁, 才知道浪费时间.</p>
        </div>
        <b-spinner variant="dark" v-show="!isEnd"></b-spinner>
      </div>
      <scroll-to-top :duration="0.5">
        <b-icon-chevron-bar-up></b-icon-chevron-bar-up>
      </scroll-to-top>
    </div>
  </b-container>
</template>

<script>
import { setClock, objectIsEmpty } from '@/utils.js'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'Search',
  created () {
    this.initCount()
    this.loadMore()
  },
  data () {
    return {
      documentCount: 'loading...',
      currentPage: 0,
      isBusy: false,
      isEnd: false,
      queryParams: {},
      pagesRawData: []
    }
  },
  methods: {
    storePageData (pageIndex, data) {
      const vm = this
      vm.$set(vm.pagesRawData, pageIndex - 1, data)
    },
    initCount () {
      const vm = this
      vm.queryParams = { ...vm.$route.query }
      if (objectIsEmpty(vm.queryParams)) {
        return vm.$router.push('/')
      }
      vm.axios({
        url: '/book',
        method: 'GET',
        params: { count: 1, ...vm.queryParams }
      }).then(({ data }) => {
        vm.documentCount = Number(data)
      }).catch(err => {
        vm.$log.error(error)
        vm.$fm.NETERR()
      })
    },
    async fetchPageData (index) {
      const vm = this
      await setClock()
      try {
        const { data } = await vm.axios({
          url: '/book',
          method: 'GET',
          params: { page: index, ...vm.queryParams }
        })
        vm.storePageData(index, data)
        return true
      } catch (error) {
        vm.$log.error(error)
        vm.$fm.NETERR()
        return false
      }
    },
    async loadMore () {
      const vm = this
      vm.$log.info('loadMore')
      vm.isBusy = true
      await setClock(1)
      if (vm.documentCount === 0) {
        return
      }
      vm.$log.info('pagination num:', vm.currentPage)
      if (vm.currentPage === vm.maxPagination) {
        vm.isEnd = true
        return
      }
      vm.fetchPageData(++vm.currentPage).then((success) => {
        vm.isBusy = !success
      })
    },
    goToSubject (_id) {
      this.$router.push(`/subject/${_id}`)
    }
  },
  computed: {
    maxPagination () {
      return Math.ceil(this.documentCount / 10)
    }
  },
  watch: {
    async '$route.query'() {
      const vm = this
      vm.$log.info('$route.query change',vm.$route.query)
      vm.documentCount = 'loading...'
      vm.currentPage = 0
      vm.isBusy = false
      vm.isEnd = false
      vm.pagesRawData = []
      await vm.initCount()
      vm.loadMore()
    }
  },
  directives: { infiniteScroll },
  components: {
    BIconChevronBarUp: () => import('bootstrap-vue').then(m => m.BIconChevronBarUp),
    pageNotFound: () => import('@/components/PageNotFound.vue'),
    badges: () => import('@/components/Badges.vue'),
    scrollToTop: () => import('@/components/ScrollToTop.vue')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/mixin.scss';
@mixin cant-select {
  user-select: none;
}
.container_full-heigt {
  @include full-heigt;
}
.card_border {
  transition: all 0.1s ease-out 0.2s;
}
.card_border:hover {
  @include bold-outline;
}
</style>
