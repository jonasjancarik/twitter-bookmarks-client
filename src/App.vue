<template>
  <div id="app">
    <b-container fluid class="mb-5">
      <b-row class="user-header">
        <b-col class="page-title text-center p-5" v-bind:style="{ 'background-image': 'url(' + userTwitterData.profile_banner_url + ')' }">
          <a :href="'https://twitter.com/' + userTwitterData.screen_name"><b-img rounded="circle" class="profile-picture" :src="userTwitterData.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg')" alt=""></b-img></a>
              <h1 class="">@{{ this.$route.params.screenName }}&rsquo;s Twitter Bookmarks</h1>
        </b-col>
      </b-row>
      <b-row class="maxi-nav text-center" v-bind:class="{ 'maxi-nav-smaller': menuSmaller }">
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
      </b-row>
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
    this.getUser()
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

.maxi-link {
  font-size: 1.5em;
  background-color: rgb(128, 128, 128);
  color: #fff;
  transition-property: background-color;
  transition-duration: 0.3s;
}

.maxi-nav {
  min-height: 45vh;
  transition-property: min-height;
  transition-duration: 1s;
}

.maxi-nav.maxi-nav-smaller {
  min-height: 15vh;
}

.maxi-link.router-link-active {
  background-color: rgb(167, 45, 1);
}

.maxi-link:hover {
  cursor: pointer;
  background-color: rgb(68, 68, 68);
}

.maxi-link p {
  color: rgb(202, 202, 202);
}

.user-header .profile-picture {
  max-width: 12em;
}

</style>
