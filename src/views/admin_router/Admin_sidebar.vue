<template>
  <b-nav class="col-md-2 d-none d-md-block border-right p-3 pt-1" pills vertical>
    <h5>数据管理</h5>
    <hr>
    <router-link is="b-nav-item" to="/admin/book">图书管理</router-link>
    <b-nav-item>今日数据</b-nav-item>
    <h5 class="pt-5">系统管理</h5>
    <hr>
    <b-nav-item>库存管理</b-nav-item>
    <b-nav-item>用户登记</b-nav-item>
    <router-link is="b-nav-item" to="/admin/recommend">今日推荐</router-link>
  </b-nav>
</template>
<script>
export default {
  name: 'Admin_sidebar'
}
</script>
<style lang="scss">
.font-red {
  color: red;
}
</style>
