<template>
    <!-- class="shadow-sm p-3 bg-white mb-5 rounded navbar_cant-select navbar_fixed-height" -->
  <b-navbar
    variant="faded"
    toggleable="sm"
    type="light"
    class="shadow-sm bg-white rounded navbar_cant-select"
  >
    <router-link tag="b-navbar-brand" to="/" class="font-weight-bold">RECLAB</router-link>
    <!-- 小屏幕时出现 toggle -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!-- toggle 内容 -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link tag="b-nav-item" to="/admin">admin</router-link>
        <router-link tag="b-nav-item" to="/about">about</router-link>
        <router-link tag="b-nav-item" to="/test">test</router-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- ml-auto 好神奇 -->
      <b-navbar-nav class="ml-auto">
        <!-- 搜索栏 -->
        <b-nav-form class="form-inline">
          <b-input-group size="sm" class="mr-sm-2">
            <b-form-input placeholder="Search"></b-form-input>
            <b-input-group-append>
              <b-button>
                <font-awesome-icon icon="search"/>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
        <!-- 用户 -->
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.navbar_cant-select {
  @include cant-select
}
.navbar_fixed-height {
  height: 6vh;
}
</style>
