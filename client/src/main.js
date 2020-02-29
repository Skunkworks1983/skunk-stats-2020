import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import modal from 'vue-js-modal'
// import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import * as config from './config';

Vue.config.productionTip = false

import './assets/stylesheets/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
Axios.defaults.baseURL = config.hostname;

// Vue.use(BootstrapVue)
Vue.use(modal, {
  dynamic: true,
  dynamicDefaults: {
    clickToClose: false
  }
})

new Vue({
  router,
  store,
  render: h => {
    return h(App)
  }
}).$mount('#app')