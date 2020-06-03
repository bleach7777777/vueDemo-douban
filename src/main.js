// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './style/common.scss'
import './assets/icon/iconfont.css'

import commomJS from './utils/common'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$utils = commomJS

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
