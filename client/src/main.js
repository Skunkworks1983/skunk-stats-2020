import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

// janky global require
window.axios = require('axios')

Vue.config.productionTip = false;

import './assets/stylesheets/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')