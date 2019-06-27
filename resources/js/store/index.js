import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import task from './task'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    task,
    user,
    auth,
    error
  }
})

export default store
