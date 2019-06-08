<template>
  <div>
    <b-navbar
      variant="faded"
      toggleable="lg"
      type="light"
      class="shadow-sm p-3 bg-white rounded"
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
        <b-navbar-nav class="ml-auto">
          <!-- 搜索栏 -->
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">中文</b-dropdown-item>
          </b-nav-item-dropdown>

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
