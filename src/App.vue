<template>
    <div id="app">

        <b-navbar toggleable="md" type="light" variant="light" sticky>

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand :to="{ name: 'Home' }">Twitter Bookmarks</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'Bookmarks' }">Bookmarks</b-nav-item>
                    <b-nav-item :to="{ name: 'Favorites' }">Likes</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown v-if="(Object.keys(user).length !== 0 && typeof user === 'object')" right>
                  <template slot="button-content">
                    <em>{{ user.displayName }}</em>
                  </template>
                  <b-dropdown-item :to="{ name: 'User' }">Profile</b-dropdown-item>
                  <b-dropdown-item @click="logOut()">Signout</b-dropdown-item>
                </b-nav-item-dropdown>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <!-- navbar-1.vue -->

        <b-container fluid v-if="(Object.keys(userTwitterData).length !== 0 && user instanceof Object)">
            <b-row class="user-header">
                <b-col class="page-title text-center p-5" v-bind:style="{ 'background-image': 'url(' + userTwitterData.profile_banner_url + ')' }">
                    <a :href="'https://twitter.com/' + userTwitterData.screen_name">
                        <b-img rounded="circle" class="profile-picture mb-3" :src="userTwitterData.profile_image_url_https ? userTwitterData.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg') : ''" alt=""></b-img>
                    </a>
                    <h1 class="">@{{ userTwitterData.screen_name }}</h1>
                </b-col>
            </b-row>
        </b-container>

        <router-view v-bind:user="user" v-bind:userTwitterData="userTwitterData" @updateAuthResult="auth = $event"/>

    </div>
</template>

<script>
import firebase from 'firebase'
import { config } from './helpers/firebaseConfig'
import UserService from '@/services/UserService'
export default {
  name: 'App',
  data () {
    return {
      userTwitterData: {},
      // screenName: this.$route.params.screenName,
      user: {},
      auth: {}
    }
  },
  created () {
    console.log('User: ')
    console.log(this.user)
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.user = firebase.auth().currentUser
        this.user = user
        this.$router.push({name: 'User'})
        this.getUser({ user_id: user.providerData[0].uid })
      } else {
        this.$router.push({name: 'Login'})
      }
    })
  },
  mounted () {
  },
  methods: {
    async getUser (options) {
      try {
        var response = await UserService.fetchUser(options)
      } catch (error) {
        this.errorDisplay = error.message
        this.loaderShow = false
        console.error(error.message)
      }
      this.userTwitterData = response.data
    },
    logOut () {
      this.user = {}
      this.data = {}
      this.userTwitterData = {}
      firebase.auth().signOut()
      this.$router.push({name: 'Login'})
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.params.screenName) {
        // this.screenName = this.$route.params.screenName
        // this.getUser({ screen_name: this.$route.params.screenName })
      }
    }
  }
}
</script>

<style>
.page-title {
  color: #fff;
  background-color: rgb(201, 201, 201);
  background-position: center;
  background-size: cover;
}

.user-header .profile-picture {
  width: 100%;
  max-width: 12em;
}
</style>
