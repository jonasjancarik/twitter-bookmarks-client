<template>
    <b-container>
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
        <b-row v-for="favorite in favorites" :key="favorite" class="d-flex justify-content-center">
            <b-col class="col-md-6 d-flex justify-content-center">
              <blockquote class="twitter-tweet" data-width="550">
                <a :href="'https://twitter.com/placeholder/statuses/' + favorite "></a>
              </blockquote>
                <!-- <BavouriteCard :favorite="favorite"></BavouriteCard> -->
            </b-col>
        </b-row>
        <b-row v-if="hasNoFavorites" class="my-5">
            <b-col class="text-center">
                <p>You haven't favourited any tweets yet.</p>
            </b-col>
        </b-row>
        <b-row v-if="loaderShow" class="my-5">
            <b-col class="text-center">
                <img style="max-height: 3em" src="../assets/spinner.gif">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FavoritesService from '@/services/FavoritesService'
export default {
  name: 'favorites',
  data () {
    return {
      favorites: [],
      loaderShow: true,
      errorDisplay: '',
      noMoreResults: false,
      twitterWidgetLoaded: false,
      hasNoFavorites: false,
      screenName: this.$route.params.screenName
    }
  },
  mounted () {
    this.getFavorites()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    async getFavorites (removeOldResults) {
      if (!this.noMoreResults || (this.noMoreResults && removeOldResults)) {
        this.loaderShow = true
        this.noMoreResults = false

        try {
          var response = await FavoritesService.fetchFavorites({
            searchTerm: this.searchTerm,
            screen_name: this.screenName,
            sort: {_id: -1},
            skip: removeOldResults ? 0 : this.favorites.length
            // fields: 'id_str'
          })
        } catch (error) {
          this.errorDisplay = error.message
          this.loaderShow = false
          console.error(error.message)
        }

        if (response && response.data.length !== 0) {
          // load results into this.favorites
          if (removeOldResults) {
            this.favorites = response.data
          } else {
            this.favorites = this.favorites.concat(response.data)
          }

          // for (const favorite of this.favorites) {
          //   // action to do for each favorite
          // }

          this.loaderShow = false

          if (response.length < 12) {
            this.noMoreResults = true
          }
        } else {
          if (this.favorites.length === 0) {
            this.hasNoFavorites = true
          }
          this.noMoreResults = true
          this.loaderShow = false
        }

        if (!this.twitterWidgetLoaded) {
          let twitterWidgetScript = document.createElement('script')
          twitterWidgetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
          document.body.appendChild(twitterWidgetScript)
          this.twitterWidgetLoaded = true
        }
      }
    },
    handleScroll: function (event) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!this.loaderShow) {
          this.getFavorites()
        }
      }
    }
  }
}
</script>

<style>
</style>
