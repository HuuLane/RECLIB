<template>
  <div>
    <b-navbar
      variant="faded"
      toggleable="sm"
      type="light"
      class="shadow-sm p-3 bg-white mb-5 rounded"
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
          <b-nav-form>
            <b-input-group size="sm" class="mr-sm-2" >
              <b-form-input placeholder="Search"></b-form-input>
              <b-input-group-append>
                <b-button><font-awesome-icon icon="search"/></b-button>
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
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
</style>
