// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import firebase from 'firebase'
// // import firebaseui from 'firebaseui'
// import { config } from './helpers/firebaseConfig'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      // user: {}
    }
  },
  // created () {
  //   firebase.initializeApp(config)
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.user = firebase.auth().currentUser
  //       this.$router.push('/user')
  //     } else {
  //       this.$router.push('/login')
  //     }
  //   })
  // },
  components: { App },
  template: '<App/>'
})
