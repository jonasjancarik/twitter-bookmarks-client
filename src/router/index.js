import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Home from '@/components/Home'
import User from '@/components/User'
import Bookmarks from '@/components/Bookmarks'
import Favorites from '@/components/Favorites'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    // {
    //   path: '/:screenName',
    //   name: 'UserAnother',
    //   component: User
    // },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/likes',
      name: 'Favorites',
      component: Favorites,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/:screenName/likes',
    //   name: 'FavoritesOtherUser',
    //   component: Favorites
    // },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks,
      meta: { requiresAuth: true }
    }
    //, {
    //   path: '/:screenName/bookmarks',
    //   name: 'BookmarksOtherUser',
    //   component: Bookmarks
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
