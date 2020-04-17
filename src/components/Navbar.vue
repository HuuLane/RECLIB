<template>
  <b-navbar
    variant="faded"
    toggleable="sm"
    type="light"
    class="bg-white mb-3 rounded navbar_cant-select"
  >
    <router-link tag="b-navbar-brand" to="/" class="font-weight-bold">RECLAB</router-link>
    <!-- 小屏幕时出现 toggle -->
    <b-navbar-toggle target="nav-collapse" class="border-0">
      <span class="navbar-toggler-icon navbar-toggle-button_small"></span>
    </b-navbar-toggle>
    <!-- toggle 内容 -->
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <!-- ml-auto 好神奇 -->
      <b-navbar-nav class="ml-auto">
        <!-- 用户 -->
        <b-nav-item v-if="!userName">
          <router-link class="text-muted" to="/login">登录</router-link>
          <b>/</b>
          <router-link class="text-muted" to="/signup">注册</router-link>
        </b-nav-item>
        <b-nav-item-dropdown v-else right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">{{userName}}</template>
          <b-dropdown-item @click="goToProfile">个人资料</b-dropdown-item>
          <b-dropdown-item @click="logout">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      const vm = this
      vm.$store.dispatch('logout')
    },
    goToProfile () {
      const vm = this
      vm.$log.info(vm.$route.path)
      if (vm.$route.path !== vm.profilePath) {
        vm.$router.push(vm.profilePath)
      }
    }
  },
  computed: {
    userName () {
      const vm = this
      return vm.$store.state.userName
    },
    profilePath () {
      return `/user/${this.userName}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.navbar_cant-select {
  @include cant-select;
}
.navbar_fixed-height {
  height: 6vh;
}
.navbar-toggle-button_small {
  font-size: 2vh;
}
</style>
