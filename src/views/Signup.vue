<template>
  <b-container class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <b-form-group
      label-cols-lg="3"
      label="让我们了解您必要的信息"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0 div-border p-5"
    >
      <!-- 输入邮箱 -->
      <b-form-group label-cols-sm="3" label="Email:" label-align-sm="right" label-for="Email">
        <b-form-input
          v-focus
          trim
          type="email"
          id="Email"
          :state="emailState"
          v-model="email"
          placeholder="Email address"
        ></b-form-input>
      </b-form-group>
      <!-- 输入密码 -->
      <b-form-group label-cols-sm="3" label="Password:" label-align-sm="right" label-for="Password">
        <b-form-input
          trim
          :state="passwordState"
          type="password"
          id="Password"
          placeholder="Enter your password"
          v-model="password"
        ></b-form-input>
      </b-form-group>
      <!-- 密码再次验证 -->
      <b-form-group
        label-cols-sm="3"
        label="Again:"
        label-align-sm="right"
        label-for="PasswordAgain"
      >
        <b-form-input
          trim
          :state="passwordAgainState"
          type="password"
          placeholder="Please enter your password again"
          id="PasswordAgain"
          v-model="passwordAgain"
        ></b-form-input>
      </b-form-group>
      <!-- 用户名称 -->
      <b-form-group label-cols-sm="3" label="Nickname:" label-align-sm="right" label-for="Nickname">
        <b-form-input
          trim
          :state="nameState"
          id="Nickname"
          v-model="name"
          placeholder="I wish you happy!"
        ></b-form-input>
      </b-form-group>
      <!-- submit btn -->
      <b-form-group label-cols-sm="3" label-align-sm="right" class="mb-0">
        <b-button
          class="btn-block"
          :disabled="!canSignUp"
          @click="signUp"
          variant="outline-dark"
        >注册并登录</b-button>
      </b-form-group>
    </b-form-group>
    <!-- 模块消息 -->
    <div>
      <b-modal ref="bv-modal-msg" centered hide-footer>
        <template slot="modal-title">RECLAB</template>
        <div class="d-block text-center">
          <h3>{{resInfo.msg}}</h3>
        </div>
        <b-button class="mt-3" block variant="outline-dark" @click="closeModal">Close Me</b-button>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { log, objectIsEmpty } from '@/utils.js'
export default {
  name: 'Signup',
  created () {
    const vm = this
    // 试试看, store 有没有
    const { convenientRecord } = vm.$store.state
    if (!objectIsEmpty(convenientRecord)) {
      vm.email = convenientRecord.email
      vm.password = convenientRecord.password
    }
  },
  methods: {
    signUp () {
      const vm = this
      vm.axios({
        url: `${process.env.VUE_APP_SIGNUP}`,
        method: 'POST',
        data: {
          email: vm.email,
          password: vm.password,
          name: vm.name
        }
      }).then(({ data }) => {
        log('data', data)
        vm.resInfo = { ...data }
        vm.$refs['bv-modal-msg'].show()
      }).catch(err => {
        console.error(err)
      })
    },
    closeModal () {
      const vm = this
      vm.$refs['bv-modal-msg'].hide()
      const code = Number(vm.resInfo.code)
      if (code === 1) {
        vm.$store.dispatch('login', {
          email: vm.email,
          password: vm.password
        })
      } else if (code === 0) {
        // 奇怪的错误, 请联系管理员
      } else if (code === 2) {
        // 用户名 || 邮箱已有人先
      }
    }
  },
  computed: {
    nameState () {
      const l = this.name.length
      return l >= 2 && l <= 18
    },
    passwordState () {
      const l = this.password.length
      return l >= 6 && l <= 18
    },
    passwordAgainState () {
      return this.passwordAgain.length >= 6 && this.passwordAgain === this.password
    },
    emailState () {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    },
    canSignUp () {
      const vm = this
      return vm.nameState && vm.passwordState && vm.passwordAgainState && vm.emailState
    }
  },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      passwordAgain: '',
      resInfo: {}
    }
  },
  directives: {
    focus: {
    // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
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
</style>
