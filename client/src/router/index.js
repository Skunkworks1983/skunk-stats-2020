import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => {
      return import( /* webpackChunkName: "register" */ '../views/Register.vue')
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => {
      return import( /* webpackChunkName: "login" */ '../views/Login.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router