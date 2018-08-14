<template>
    <b-container class="mt-5">
        <b-row v-if="errorDisplay">
            <b-col>
                <b-alert show>Something went wrong :( {{ errorDisplay }}</b-alert>
            </b-col>
        </b-row>
        <b-row>
          <b-col>
                <h2>Likes</h2>
          </b-col>
        </b-row>
        <b-row v-for="favorite in favoritesRevealed" :key="favorite" class="d-flex justify-content-center">
            <b-col class="col-md-6 d-flex justify-content-center tweet-container">
              <!-- <blockquote class="twitter-tweet" data-width="550">
                {{ favorite.text }}
                <a :href="'https://twitter.com/placeholder/statuses/' + favorite "></a>
              </blockquote> -->
              <Tweet :id="favorite"><div class="tweet-placeholder"><img style="max-height: 3em" src="../assets/spinner.gif" class="spinner"></div></Tweet>
                <!-- <FavoriteCard :favorite="favorite"></FavoriteCard> -->
            </b-col>
        </b-row>
        <b-row v-if="hasNoFavorites" class="my-5">
            <b-col class="text-center">
                <p>You haven't favourited any tweets yet.</p>
            </b-col>
        </b-row>
        <b-row v-if="loadingFavorites" class="my-5">
            <b-col class="text-center">
                <img style="max-height: 3em" src="../assets/spinner.gif">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FavoritesService from '@/services/FavoritesService'
import { Tweet } from 'vue-tweet-embed'
export default {
  name: 'favorites',
  components: {
    Tweet: Tweet
  },
  props: {
  },
  data () {
    return {
      favorites: [],
      favoritesRevealed: [],
      loadingFavorites: true,
      errorDisplay: '',
      noMoreResults: false,
      twitterWidgetLoaded: false,
      hasNoFavorites: false
    }
  },
  mounted () {
    this.getFavorites()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    async getFavorites (removeOldResults) {
      if (!this.noMoreResults || (this.noMoreResults && removeOldResults)) {
        this.loadingFavorites = true
        this.noMoreResults = false

        try {
          var response = await FavoritesService.fetchFavorites({
            searchTerm: this.searchTerm,
            screen_name: this.$store.state.auth.additionalUserInfo.profile.screen_name,
            sort: {_id: -1},
            skip: removeOldResults ? 0 : this.favorites.length,
            twitterCredentials: {
              accessToken: this.$store.state.auth.credential.accessToken,
              secret: this.$store.state.auth.credential.secret
            }
          })
        } catch (error) {
          this.errorDisplay = error.message
          this.loadingFavorites = false
          console.error(error.message)
        }

        if (response && response.data.length !== 0) {
          // load results into this.favorites
          if (removeOldResults) {
            this.favorites = response.data
          } else {
            this.favorites = this.favorites.concat(response.data)
          }

          this.loadingFavorites = false

          if (response.length < 12) {
            this.noMoreResults = true
          }
        } else {
          if (this.favorites.length === 0) {
            this.hasNoFavorites = true
          }
          this.noMoreResults = true
          this.loadingFavorites = false
        }
      }

      this.revealFavorites()
    },
    revealFavorites: function () {
      this.favorites.slice(this.favoritesRevealed.length, this.favoritesRevealed.length + 10).forEach(element => {
        this.favoritesRevealed.push(element)
      })
      this.loadingFavorites = false
    },
    handleScroll: function (event) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!this.loadingFavorites) {
          this.loadingFavorites = true
          this.revealFavorites()
        }
      }
    }
  },
  watch: {
    // '$route' (to, from) {
    //   this.screenName = this.$route.params.screenName
    //   this.favorites = []
    //   this.favoritesRevealed = []
    //   this.noMoreResults = false
    //   this.getFavorites()
    // }
  }
}
</script>

<style>

.tweet-placeholder {
  background-color: rgb(197, 197, 197);
  width: 100%;
  padding: 10em 0 5em 0;
  border-bottom: solid rgb(97, 97, 97) 8em;
  margin-bottom: 2em;
  text-align: center;
  border-radius: 0.5em;
}

.tweet-container > div {
  width: 100%
}

</style>
