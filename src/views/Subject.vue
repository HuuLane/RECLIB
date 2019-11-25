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
        <hr />
        <!-- 图片 + info -->
        <b-card no-body class="overflow-hidden border-0" img-fluid>
          <b-row>
            <b-col md="6">
              <b-card-img :src="imgSrc" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <!-- 信息cell -->
                <b-card-title>图书信息</b-card-title>
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr v-for="(value, name, index) in book.brief.info" :key="index">
                      <th scope="row">{{index}}</th>
                      <td>{{name}}</td>
                      <td>{{value}}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- 简介 -->
                <hr />
                <b-card-title>无聊简介</b-card-title>
                <intro-collapse :id="id" />
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
        <!-- 评论 -->
        <comment-board class="mt-5" :id="id" />
      </div>
      <!-- 404 错误显示 -->
      <div
        v-else
        class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt"
      >
        <page-not-found></page-not-found>
      </div>
    </div>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { log, setClock } from '@/utils.js'

export default {
  name: 'Subject',
  data () {
    return {
      isBusy: true,
      api: '/book',
      img: process.env.VUE_APP_IMG,
      id: null,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      book: {}
    }
  },
  created () {
    const vm = this
    vm.id = vm.$route.params.id
    // 从服务器拉取
    vm.fetchBook().then(({ data }) => {
      vm.isBusy = false
      // 伺服器, 找不到数据
      if (data === null) {
        vm.init(null)
        return
      }
      vm.init(data)
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
        url: '/book',
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
    pageNotFound: () => import('@/components/PageNotFound.vue'),
    introCollapse: () => import('@/components/IntroCollapse.vue'),
    commentBoard: () => import('@/components/Comment.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/mixin.scss";
.container_full-heigt {
  @include full-heigt;
}
.home-title {
  text-align: center;
  @include bold-outline;
}
.div-border {
  @include bold-outline;
}
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
