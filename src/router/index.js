import Vue from 'vue'
import Router from 'vue-router'
import Bookmarks from '@/components/Bookmarks'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Bookmarks',
    //   component: Bookmarks
    // },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user/:screenName',
      name: 'User',
      component: Bookmarks
    }
  ]
})
