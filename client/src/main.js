import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false;

import './assets/stylesheets/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex);
Vue.use(BootstrapVue);

// Vuex store
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})

new Vue({
  router,
  store,
  render: h => {
    return h(App)
  }
}).$mount('#app')