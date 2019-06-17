<template>
  <b-container class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <b-form-group
      label-cols-lg="3"
      label="欢迎"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0 div-border p-5"
    >
      <!-- 输入邮箱 -->
      <b-form-group label-cols-sm="4" label="Email:" label-align-sm="right" label-for="Email">
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
      <b-form-group label-cols-sm="4" label="Password:" label-align-sm="right" label-for="Password">
        <b-form-input
          trim
          :state="passwordState"
          type="password"
          id="Password"
          placeholder="Enter your password"
          v-model="password"
        ></b-form-input>
      </b-form-group>
      <!-- submit btn -->
      <b-form-group label-cols-sm="4" label-align-sm="right" class="mb-0">
        <b-button
          class="btn-block"
          :disabled="!canLogin"
          @click="login"
          variant="outline-dark"
        >登录</b-button>
      </b-form-group>
    </b-form-group>
    <!-- 模块消息 -->
    <div>
      <b-modal ref="bv-modal-msg" centered hide-footer>
        <template slot="modal-title">RECLAB</template>
        <div class="d-block text-center">
          <h3>{{resInfo.msg}}</h3>
        </div>
        <b-button class="mt-3" block variant="outline-dark" @click="closeModal"> {{btnInnerText}} </b-button>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
const { log } = console
export default {
  name: 'Signup',
  methods: {
    login () {
      const vm = this
      vm.$store.dispatch('login', {
        email: vm.email,
        password: vm.password
      }).then(data => {
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
        vm.$router.push('/')
      } else if (code === 0) {
        // 密码错误
        vm.password = ''
      } else if (code === 2) {
        // 未注册
        vm.$router.push('/signup')
        vm.$store.commit('comfortUser', { email: vm.email, password: vm.password })
      }
    }
  },
  computed: {
    passwordState () {
      const l = this.password.length
      return l >= 6 && l <= 18
    },
    emailState () {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    },
    canLogin () {
      const vm = this
      return vm.passwordState && vm.emailState
    },
    btnInnerText () {
      const vm = this
      switch (vm.resInfo.code) {
        case 0:
          return '重试'
        case 1:
          return '前往首页'
        case 2:
          return '我要注册'
        default:
          return '关闭'
      }
    }
  },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      resInfo: {}
    }
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
