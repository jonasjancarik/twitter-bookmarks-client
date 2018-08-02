// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// Initialize Firebase // todo: put in a separate config file
// var config = {
//   apiKey: 'AIzaSyBd_f2Qn_KNXI3vbP4aTjBZapshcuYlmm0',
//   authDomain: 'bookmarks-fe73e.firebaseapp.com',
//   databaseURL: 'https://bookmarks-fe73e.firebaseio.com',
//   projectId: 'bookmarks-fe73e',
//   storageBucket: 'bookmarks-fe73e.appspot.com',
//   messagingSenderId: '880130415659'
// }
// firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
