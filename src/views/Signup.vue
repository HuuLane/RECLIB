<template>
  <b-container class="d-flex flex-column flex-wrap justify-content-center align-content-center container_full-heigt">
    <b-form-group
      label-cols-lg="3"
      label="输入必要的信息"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0 div-border p-5"
    >
      <!-- Enter email -->
      <b-form-group label-cols-sm="3" label="Email:" label-align-sm="right" label-for="Email">
        <b-form-input
          v-focus
          trim
          type="email"
          id="Email"
          spellcheck="false"
          :state="emailState"
          v-model="email"
          placeholder="Email address"
        ></b-form-input>
      </b-form-group>
      <!-- enter password -->
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
      <!-- Password verification again -->
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
      <!-- user name -->
      <b-form-group label-cols-sm="3" label="Nickname:" label-align-sm="right" label-for="Nickname">
        <b-form-input
          trim
          :state="nameState"
          id="Nickname"
          spellcheck="false"
          v-model="name"
          placeholder="I wish you happy!"
          @keyup.enter="signup"
        ></b-form-input>
      </b-form-group>
      <!-- submit btn -->
      <b-form-group label-cols-sm="3" label-align-sm="right" class="mb-0">
        <b-button
          class="btn-block"
          :disabled="!fulfill"
          @click="signup"
          variant="outline-dark"
        >开始谈笑风生</b-button>
      </b-form-group>
    </b-form-group>
  </b-container>
</template>

<script>
import { objectIsEmpty } from '@/utils.js'
export default {
  name: 'Signup',
  methods: {
     async signup () {
      const vm = this
      const [err, res] = await vm.$t(vm.axios({
        url: '/user',
        method: 'POST',
        data: {
          email: vm.email,
          password: vm.password,
          name: vm.name
        }
      }))
      if (err) {
        // TODO retry
        vm.$log.error(err)
      }
      const d = res.data
      const code = Number(d.code)
      if (code === 1) {
        vm.$store.dispatch('sessionLogin')
        vm.$router.back()
        vm.$fm.success(`Great! ${d.msg}`)
      } else {
        vm.$fm.error(`Fail to signup: ${d.msg}`)
      }
    }
  },
  computed: {
    nameState () {
      const l = this.name.length
      if (l === 0) {
        return null
      }
      return l >= 2 && l <= 18
    },
    passwordState () {
      const l = this.password.length
      if (l === 0) {
        return null
      }
      return l >= 6 && l <= 18
    },
    passwordAgainState () {
      const l = this.password.length
      if (l === 0) {
        return null
      }
      return this.passwordAgain.length >= 6 && this.passwordAgain === this.password
    },
    emailState () {
      const l = this.email.length
      if (l === 0) {
        return null
      }
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    },
    fulfill () {
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
