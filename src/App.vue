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

                <b-nav-item-dropdown v-if="(typeof $store.state.auth === 'object' && Object.keys($store.state.auth).length !== 0)" right>
                  <template slot="button-content">
                    <em>{{ $store.state.auth.user.displayName }}</em>
                  </template>
                  <b-dropdown-item :to="{ name: 'User' }">Profile</b-dropdown-item>
                  <b-dropdown-item @click="logOut()">Signout</b-dropdown-item>
                </b-nav-item-dropdown>

                </b-navbar-nav>

            </b-collapse>

        </b-navbar>

        <b-container fluid v-if="(Object.keys($store.state.auth).length !== 0 && $store.state.auth instanceof Object)">
            <b-row class="user-header">
                <b-col class="page-title text-center p-5" v-bind:style="{ 'background-image': 'url(' + this.$store.state.auth.additionalUserInfo.profile.profile_banner_url + ')' }">
                    <a :href="'https://twitter.com/' + this.$store.state.auth.additionalUserInfo.profile.screen_name">
                        <b-img rounded="circle" class="profile-picture mb-3" :src="this.$store.state.auth.additionalUserInfo.profile.profile_image_url_https ? this.$store.state.auth.additionalUserInfo.profile.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg') : ''" alt=""></b-img>
                    </a>
                    <h1 class="">@{{ this.$store.state.auth.additionalUserInfo.profile.screen_name }}</h1>
                </b-col>
            </b-row>
        </b-container>

        <router-view/>

    </div>
</template>

<script>
// import firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { config } from './helpers/firebaseConfig'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push({name: 'User'})
      }
      // else {
      //   this.$router.push({name: 'Login'})
      // }
    })
  },
  mounted () {
  },
  methods: {
    logOut () {
      this.$store.commit({type: 'updateAuth', data: {}})
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
