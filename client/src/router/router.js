import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home Page',
    component: Home
  },
  {
    path: '/about',
    name: 'About Page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => {
      return import( /* webpackChunkName: "register" */ '../views/Register.vue')
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => {
      return import( /* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/app',
    name: 'Scouting App',
    component: () => {
      return import( /* webpackChunk Name: "app" */ '../views/ScoutingApp.vue')
    }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => {
      return import( /* webpackChunkName: "tools" */ '../views/Tools.vue')
    }
  },
  {
    path: '/dashboard',
    name: 'Team Dashboards',
    component: () => {
      return import( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
    }
  },
  {
    path: '/qualMatches',
    name: 'Qualification Matches',
    component: () => {
      return import( /* webpackChunkName: "qualmatches" */ '../views/QualMatches.vue')
    }
  },
  {
    path: '/playoffMatches',
    name: 'Playoff Matches',
    component: () => {
      return import( /* webpackChunkName: "elimmatches" */ '../views/ElimMatches.vue')
    }
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => {
      return import( /* webpackChunkName: "charts" */ '../views/Charts.vue')
    }
  },
  {
    path: '/pitScouting',
    name: 'Pit Scouting Form',
    component: () => {
      return import( /* webpackChunkName: "pitScouting" */ '../views/PitScouting.vue')
    }
  },
  {
    path: '/manage',
    name: 'User Account Management',
    component: () => {
      return import( /* webpackChunkName: "userManage" */ '../views/ManageUser.vue')
    }
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})