<template>
  <b-container>
    <div v-if="isBusy">
      <b-spinner class="absolute-center spinner_big"></b-spinner>
    </div>
    <div v-else>
      <template v-if="!objectIsEmpty(book)">
        <div class="div-border">
          <!-- title -->
          <h1 class="row">
            <span class="col-md-9">{{book.title}}</span>
            <b-badge
              id="score"
              class="d-none d-md-block"
              :variant="estimate.color"
            >评分: {{book.score}} {{estimate.icon}}</b-badge>
            <b-tooltip target="score" placement="right">
              评分人数:
              <strong>{{book.rating}}</strong>
            </b-tooltip>
          </h1>
          <!-- tags -->
          <p>
            <b class="pr-2">标签:</b>
            <b-badge
              v-for="(item, index) in book.tags"
              :key="index"
              class="mr-2"
              :variant="variants[index]"
              @click="search"
            >{{item}}</b-badge>
          </p>
          <hr />
          <b-card no-body class="overflow-hidden border-0" img-fluid>
            <b-row>
              <b-col md="6">
                <b-card-img :src="imgsrc" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body>
                  <b-card-title>图书信息</b-card-title>
                  <table class="table table-sm table-borderless">
                    <tbody>
                      <tr v-for="(value, name, index) in book.info" :key="index">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{name}}</td>
                        <td>{{value}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <b-card-title>无聊简介</b-card-title>
                  <intro-collapse :id="id" />
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <div class="mt-5 div-border">
          <h1>Comments</h1>
          <comment-board :id="id" />
        </div>
      </template>
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
import { setClock, objectIsEmpty } from '@/utils.js'

export default {
  name: 'Subject',
  data () {
    return {
      isBusy: true,
      img: process.env.VUE_APP_IMG,
      id: null,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      book: {}
    }
  },
  async created () {
    const vm = this
    vm.id = vm.$route.params.id
    await setClock()
    vm.axios({
      methods: 'GET',
      url: '/book',
      params: { id: vm.id }
    }).then(({ data }) => {
      vm.isBusy = false
      vm.book = data
      vm.$log.info(data)
    }).catch(err => {
      vm.$log.error(err)
    })
  },
  methods: {
    objectIsEmpty: objectIsEmpty,
    search (event) {
      const content = event.target.innerText
      this.$router.push(`/search?tag=${content}`)
    }
  },
  computed: {
    estimate () {
      const score = Number(this.book.score)
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
    imgsrc () {
      return `${this.img}/${this.book.imgUrl}.jpg`
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
  padding: 3vh;
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
