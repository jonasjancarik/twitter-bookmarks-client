import Vue from 'vue'
import Login from '@/components/Login'
import Router from 'vue-router'
import User from '@/components/User'
import Bookmarks from '@/components/Bookmarks'
import Favorites from '@/components/Favorites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'HomeLogin',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:screenName',
      name: 'User',
      component: User
    },
    {
      path: '/user',
      name: 'UserDefault',
      component: User
    },
    {
      path: '/likes',
      name: 'Favorites',
      component: Favorites
    },
    // {
    //   path: '/:screenName/likes',
    //   name: 'FavoritesOtherUser',
    //   component: Favorites
    // },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks
    }
    //, {
    //   path: '/:screenName/bookmarks',
    //   name: 'BookmarksOtherUser',
    //   component: Bookmarks
    // }
  ]
})
