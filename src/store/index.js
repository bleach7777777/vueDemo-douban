import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import test from './modules/test'

Vue.use(Vuex)
const debug = true

export default new Vuex.Store({
  modules: {
    test
  },
  plugins: debug ? [createLogger()] : []
})
