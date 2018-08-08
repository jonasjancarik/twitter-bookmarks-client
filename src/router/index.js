import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import Bookmarks from '@/components/Bookmarks'
import Favorites from '@/components/Favorites'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/helloworld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/:screenName',
      name: 'User',
      component: User
    },
    {
      path: '/:screenName/likes',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/:screenName/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks
    }
  ]
})
