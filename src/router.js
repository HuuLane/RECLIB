import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: () => import('./views/Subject.vue')
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: 'book',
          name: '图书管理',
          component: () => import('./views/admin_router/Admin_book.vue')
        },
        {
          // 这里不要写 `/`
          path: 'recommend',
          name: '今日推荐',
          component: () => import('./views/admin_router/Admin_recommend.vue')
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue')
    }
  ]
})
