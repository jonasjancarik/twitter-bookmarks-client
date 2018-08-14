// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import createPersistedState from 'vuex-persistedstate'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
const store = new Vuex.Store({
  state: {
    auth: {}
  },
  mutations: {
    updateAuth (state, payload) {
      state.auth = payload.data
    }
  },
  plugins: [createPersistedState()]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
