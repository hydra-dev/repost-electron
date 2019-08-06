import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/finding',
      name: 'all-findings',
      component: () => import(/* webpackChunkName: "about" */ './views/FindingsTableComponent.vue')
    },
    {
      path : '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/SearchFindingComponent.vue')
    },
    {
      path: '/finding/create',
      name: 'create-finding',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateFindingComponent.vue')
    },
    {
      path: '/finding/:id/edit',
      name: 'edit-finding',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateFindingComponent.vue')
    },
    {
      path: '/finding/:id',
      name: 'show-finding',
      component: () => import(/* webpackChunkName: "about" */ './views/ShowFindingComponent.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "about" */ './views/SettingsComponent.vue')
    }
  ]
})
