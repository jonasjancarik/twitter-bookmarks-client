<template>
  <div id="app">

<b-navbar toggleable="md" type="light" variant="light" sticky>

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/">Twitter Bookmarks</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item :to="{ name: 'Favorites', params: { screenName: $route.params.screenName }}">Likes</b-nav-item>
      <b-nav-item :to="{ name: 'Bookmarks', params: { screenName: $route.params.screenName }}">Bookmarks</b-nav-item>
        <!-- <router-link tag="li" class="nav-item" :to="{ name: 'Favorites', params: { screenName: $route.params.screenName }}">
          <a class="nav-link">Likes</a>
          </router-link>
                  <router-link tag="li" class="nav-item" :to="{ name: 'Bookmarks', params: { screenName: $route.params.screenName }}">
          <a class="nav-link">Bookmarks</a>
          </router-link> -->
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <!-- <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav> -->

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->

    <b-container fluid class="mb-5">
      <b-row v-if="(Object.keys(userTwitterData).length !== 0 && userTwitterData.constructor === Object)" class="user-header">
        <b-col class="page-title text-center p-5" v-bind:style="{ 'background-image': 'url(' + userTwitterData.profile_banner_url + ')' }">
          <a :href="'https://twitter.com/' + userTwitterData.screen_name">
          <b-img rounded="circle" class="profile-picture mb-3" :src="userTwitterData.profile_image_url_https ? userTwitterData.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg') : ''" alt=""></b-img>
          </a>
              <h1 class="">@{{ this.$route.params.screenName }}</h1>
        </b-col>
      </b-row>
      <!-- <b-row class="maxi-nav text-center" v-bind:class="{ 'maxi-nav-smaller': menuSmaller }">
          <router-link tag="div" class="maxi-link p-5 col col-6 d-flex align-items-center justify-content-center" :to="{ name: 'Favorites', params: { screenName: $route.params.screenName }}" v-on:click.native="menuSmaller = true">
                  <div>
                    <h2>Likes</h2>
                    <p>Your usual Twitter Likes</p>
                  </div>
          </router-link>
          <router-link tag="div" class="maxi-link p-5 col col-6 d-flex align-items-center justify-content-center" :to="{ name: 'Bookmarks', params: { screenName: $route.params.screenName }}" v-on:click.native="menuSmaller = true">
                  <div>
                    <h2>Bookmarks</h2>
                    <p>Created by mentioning @save_this in a reply</p>
                  </div>
          </router-link>
      </b-row> -->
    </b-container>
    <router-view/>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'App',
  data () {
    return {
      userTwitterData: {},
      menuSmaller: false,
      screenName: this.$route.params.screenName
    }
  },
  mounted () {
    if (this.screenName) {
      this.getUser()
    }
  },
  methods: {
    async getUser () {
      try {
        var response = await UserService.fetchUser({
          screen_name: this.screenName
        })
      } catch (error) {
        this.errorDisplay = error.message
        this.loaderShow = false
        console.error(error.message)
      }
      this.userTwitterData = response.data
    }
  },
  watch: {
    '$route' (to, from) {
      this.screenName = this.$route.params.screenName
      this.getUser()
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
