<template>
  <div>
    <h1>管理员: 共有{{ documentCount }}条数据</h1>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <!-- 展示 table -->
    <b-table
      striped
      hover
      bordered
      @row-clicked="goToSubject"
      :items="showedItems"
      :busy="tableIsBusy"
      large
      :fields="tableFields"
    >
      <div slot="table-busy" class="text-center my-4">
        <b-spinner variant="dark"></b-spinner>
      </div>
    </b-table>
    <!-- 页码控件 -->
    <b-pagination
      v-model="currentPage"
      :total-rows="documentCount"
      :limit="10"
      @input="switchPage"
      align="center"
      class="btn_pagination"
    ></b-pagination>
  </div>
</template>

<script>
// eslint-disable-next-line
import { myFetch, log, dir, setClock } from '@/assets/utils.js'
import { setTimeout } from 'timers'

class FormatedItem {
  constructor (item) {
    this.id = item['_id']
    this.title = item.title
    this.imgUrl = item.imgUrl
    this.author = item.info['作者']
    this.score = item.score
  }
}
const beautifyRawPageData = (rawPageData) => {
  const o = []
  for (let i = 0; i < rawPageData.length; i++) {
    const item = rawPageData[i]
    o.push(new FormatedItem(item))
  }
  return o
}

export default {
  name: 'Admin_book',
  created () {
    const vm = this
    // 初始化
    myFetch('GET', `${vm.api}?count`).then(r => {
      // log('response', response)
      vm.documentCount = Number(r)
      return myFetch('GET', `${vm.api}?page=1`)
    }).then(r => {
      // 默认便获取第一页数据
      this.addPageData(1, r)
    }).catch(err => {
      log('err', err)
    })
  },
  data () {
    return {
      api: process.env.VUE_APP_BOOK,
      tableIsBusy: true,
      documentCount: 0,
      currentPage: 1,
      tableFields: {
        id: {
          label: 'ISBM'
        },
        title: {
          label: '标题'
        },
        author: {
          label: '作者'
        },
        score: {
          // key: 'address.city',
          label: '评分',
          sortable: true
        }
      },
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
      const data = await myFetch('GET', `${vm.api}?page=${index}`)
      this.addPageData(index, data)
      return 'save successfully'
    },
    switchPage () {
      const vm = this
      vm.tableIsBusy = true
      // log('当前页码', this.currentPage)
      /**
       * 1. 设为busy, 取/存数据
       * 2. 视图切换由count来完成 包括(取消 busy~)
       */
      this.cachePageData(this.currentPage).then((response) => {
        log(response)
      }).catch(err => {
        log('err', err)
      })
    },
    goToSubject (item, index, event) {
      // const taget = event.target
      // this.$set(this.hoverRow,'target', target)
      this.$router.push(`/subject/${item.id}`)
    }
  },
  computed: {
    showedItems () {
      const vm = this
      // 这是一个数组, 含有一页raw数据
      const rawPageData = vm.pagesRawData[this.currentPage - 1]
      // 数据还没收到是undefine
      if (!rawPageData) {
        return
      }
      // 收到数据状态取消busy
      vm.tableIsBusy = false
      // log('rawPageData is array?', Array.isArray(rawPageData))
      return beautifyRawPageData(rawPageData)
    }
  },
  watch: {
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/mixin.scss";

.btn_pagination {
  @include cant-select;
}
</style>
