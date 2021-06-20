<template>
  <b-container>
    <template v-if="userName == 'admin'">
      <div class="div-border">
        <h1>RECLIB 后台</h1>
        <hr />
        <div>
          <b-form-group
            label-cols-lg="3"
            label="新增书籍"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <!-- Enter ISBN，亦作为图书的 ID -->
            <b-form-group
              label-cols-sm="4"
              label="ISBN:"
              label-align-sm="right"
              label-for="ISBN"
            >
              <b-form-input
                v-focus
                trim
                type="number"
                placeholder="仅可输入数字，例如：9787544280914"
                id="ISBN"
                spellcheck="false"
                v-model="ISBN"
              ></b-form-input>
            </b-form-group>
            <!-- Enter title -->
            <b-form-group
              label-cols-sm="4"
              label="Title:"
              label-align-sm="right"
              label-for="Title"
            >
              <b-form-input
                trim
                placeholder="书籍标题"
                id="Title"
                spellcheck="false"
                v-model="title"
              ></b-form-input>
            </b-form-group>
            <!-- 书籍标签 -->
            <b-form-group
              label-cols-sm="4"
              label="Tags:"
              label-align-sm="right"
              label-for="Tags"
            >
              <b-form-input
                trim
                placeholder="书籍标签用逗号隔开，例如：滑板, 运动, 教学"
                id="Tags"
                spellcheck="false"
                v-model="tags"
              ></b-form-input>
            </b-form-group>
            <!-- 详细信息 -->
            <b-form-group
              label-cols-sm="4"
              label="Infos 图书信息:"
              label-align-sm="right"
              label-for="Details"
            >
              <b-form-input
                trim
                placeholder="作者"
                spellcheck="false"
                v-model="info.作者"
              ></b-form-input>
              <b-form-input
                v-focus
                trim
                placeholder="出版社"
                spellcheck="false"
                v-model="info.出版社"
              ></b-form-input>
              <b-form-input
                trim
                placeholder="出版年"
                spellcheck="false"
                v-model="info.出版年"
              ></b-form-input>
              <b-form-input
                trim
                placeholder="页数"
                spellcheck="false"
                v-model="info.页数"
              ></b-form-input>
              <b-form-input
                trim
                placeholder="定价"
                spellcheck="false"
                v-model="info.定价"
              ></b-form-input>
              <b-form-input
                trim
                placeholder="装帧"
                spellcheck="false"
                v-model="info.装帧"
              ></b-form-input>
            </b-form-group>
            <!-- 简介 -->
            <b-form-group
              label-cols-sm="4"
              label="简介:"
              label-align-sm="right"
              label-for="简介"
            >
              <b-form-input
                trim
                placeholder="图书简介"
                spellcheck="false"
                v-model="intro[0]"
              ></b-form-input>
              <b-form-input
                trim
                placeholder="作者简介"
                spellcheck="false"
                v-model="intro[1]"
              ></b-form-input>
            </b-form-group>

            <!-- submit btn -->
            <b-form-group label-cols-sm="4" label-align-sm="right" class="mb-0">
              <b-button
                class="btn-block"
                
                @click="postBook"
                variant="outline-dark"
                >提交</b-button
              >
            </b-form-group>
          </b-form-group>
        </div>
      </div>
    </template>
    <div
      v-else
      class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt"
    >
      <page-not-found>
        401 ERROR
        <template v-slot:info>
          此页仅管理员可见
        </template>
      </page-not-found>
    </div>
  </b-container>
</template>

<script>
import { objectIsEmpty } from '@/utils.js'
export default {
  name: 'Admin',
  created () {
    // const vm = this;
  },
  data () {
    return {
      ISBN: '',
      title: '',
      tags: '',
      info: {},
      intro: ['', '']
    }
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    tagsArr () {
        const vm = this
        return vm.tags.split(',').map(e => e.trim()).filter(e => e)
    }
  },
  methods: {
    async postBook () {
      const vm = this
      const data = {
          _id: String(vm.ISBN),
          score: 0,
          rating: 0,
          title: vm.title,
          tags: vm.tagsArr,
          info: vm.info,
          intro: vm.intro,
          comments: []
      }
      console.log(JSON.stringify(data))
      try {
        const { data: res } = await vm.axios({
          url: '/book',
          method: 'POST',
          data
        })
        if (res.code === 0) {
          vm.$fm.success(`book created ${res.msg}`)
        } else {
          vm.$fm.error(`fail to create book: ${res.msg}`)
        }
      } catch (error) {
        vm.$log.error(error)
        vm.$fm.NETERR()
      }
    }
  },
  components: {
    pageNotFound: () => import('@/components/PageNotFound.vue'),
    commentBoard: () => import('@/components/Comment.vue')
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.container_full-heigt {
  @include full-heigt;
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
.div-border {
  @include bold-outline;
  padding: 3vh;
}
</style>
