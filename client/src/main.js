import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import modal from 'vue-js-modal'
// import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'

Vue.config.productionTip = false

import './assets/stylesheets/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

// Vue.use(BootstrapVue)
Vue.use(modal)

new Vue({
  router,
  store,
  render: h => {
    return h(App)
  }
}).$mount('#app')