<template>
  <b-container fluid>
    <div class="row">
      <Sidebar/>
      <div class="col-md-10 ml-sm-auto col-lg-10 pt-4 px-4 height-fluid">
        <router-view></router-view>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Admin',
  components: {
    Sidebar: () => import('@/views/admin_router/Admin_sidebar.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.height-fluid {
  height: 90vh;
}
</style>
