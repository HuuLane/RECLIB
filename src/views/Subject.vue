<template>
  <b-container>
    <div v-if="isBusy">
      <b-spinner class="absolute-center spinner_big"></b-spinner>
    </div>
    <div v-else>
      <div v-if="book.brief">
        <!-- 标题 -->
        <h1 class="row">
          <span class="col-md-9">{{book.brief.title}}</span>
          <b-badge
            id="score"
            class="d-none d-md-block"
            :variant="isOkay.color"
          >评分: {{book.brief.score}} {{isOkay.icon}}</b-badge>
          <b-tooltip target="score" placement="right">
            评分人数:
            <strong>{{book.brief.rating}}</strong>
          </b-tooltip>
        </h1>
        <!-- 标签 -->
        <p>
          <b class="pr-2">标签:</b>
          <b-badge
            v-for="(item, index) in book.brief.tags"
            :key="index"
            class="mr-2"
            :variant="variants[index]"
            @click="goToSearch"
          >{{book.brief.tags[index]}}</b-badge>
        </p>
        <hr>
        <!-- 图片 + info -->
        <b-card no-body class="overflow-hidden" img-fluid>
          <b-row>
            <b-col md="6">
              <b-card-img :src="imgSrc" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <b-card-title>图书信息</b-card-title>
                <b-card-text>
                  <!--  -->
                  <table class="table table-sm">
                    <tbody>
                      <tr v-for="(value, name, index) in book.brief.info" :key="index">
                        <th scope="row">{{index}}</th>
                        <td>{{name}}</td>
                        <td>{{value}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- 简介 -->
                  <intro-collapse :id="id"></intro-collapse>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
        <!-- <pre>{{book.brief}}</pre> -->
      </div>
      <!-- 404 错误显示 -->
      <div v-else>
        <page-not-found></page-not-found>
      </div>
    </div>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { log, dir, setClock } from '@/assets/utils.js'
import pageNotFound from '@/components/PageNotFound.vue'

export default {
  name: 'Subject',
  data () {
    return {
      isBusy: true,
      api: process.env.VUE_APP_BOOK,
      img: process.env.VUE_APP_IMG,
      id: null,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      book: {}
    }
  },
  created () {
    const vm = this
    vm.id = vm.$route.params.id
    // // 尝试从 store 读取
    // const readDataFromStore = vm.$store.state.items[vm.id]
    // if (readDataFromStore) {
    //   // 读取成功
    //   vm.isBusy = false
    //   this.init(readDataFromStore)
    //   return
    // }
    // 从服务器拉取
    vm.fetchBook().then(({ data }) => {
      vm.isBusy = false
      // 伺服器, 找不到数据
      if (data === null) {
        vm.init(null)
        return
      }
      vm.init(data)
      vm.$store.commit('saveRowDataIntoItems', data)
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    init (data) {
      const vm = this
      vm.$set(vm.book, 'brief', data)
    },
    async fetchBook () {
      const vm = this
      await setClock()
      return vm.axios({
        url: `${process.env.VUE_APP_BOOK}`,
        method: 'GET',
        params: { id: vm.id }
      })
    },
    goToSearch (event) {
      const content = event.target.innerHTML
      this.$router.push(`/search?tag=${content}`)
    }
  },
  computed: {
    isOkay () {
      const score = Number(this.book.brief.score)
      const o = {}
      if (score > 9) {
        o.icon = '👍'
        o.color = 'warning'
      } else if (score < 7) {
        o.icon = '👎'
        o.color = 'danger'
      } else {
        o.icon = null
        o.color = 'success'
      }
      return o
    },
    imgSrc () {
      return `${this.img}/${this.book.brief.imgUrl}.jpg`
    }
  },
  components: {
    pageNotFound,
    introCollapse: () => import('@/components/IntroCollapse.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.spinner_big {
  width: 3rem;
  height: 3rem;
}
.absolute-center {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
