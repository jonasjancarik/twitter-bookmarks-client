<template>
    <b-container>
        <b-row v-if="errorDisplay">
            <b-col>
                <b-alert show>Something went wrong :( {{ errorDisplay }}</b-alert>
            </b-col>
        </b-row>
        <b-row>
          <b-col>
                <h2>Bookmarks</h2>
          </b-col>
        </b-row>
        <b-row v-for="bookmark in bookmarksRevealed" :key="bookmark.id_str" class="d-flex justify-content-center">
            <b-col class="col-md-6 d-flex justify-content-center tweet-container">
              <Tweet :id="bookmark.id_str"><div class="tweet-placeholder"><img style="max-height: 3em" src="../assets/spinner.gif" class="spinner"></div></Tweet>
            </b-col>
        </b-row>
        <b-row v-if="hasNoBookmarks" class="my-5">
            <b-col class="text-center">
                <p>You haven't bookmarked any tweets yet. Do it by mentioning @save_this in a reply to the tweet you want to bookmark.</p>
            </b-col>
        </b-row>
        <b-row v-if="loadingBookmarks" class="my-5">
            <b-col class="text-center">
                <img style="max-height: 3em" src="../assets/spinner.gif">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import BookmarksService from '@/services/BookmarksService'
import { Tweet } from 'vue-tweet-embed'
export default {
  name: 'bookmarks',
  components: {
    Tweet: Tweet
  },
  data () {
    return {
      bookmarks: [],
      bookmarksRevealed: [],
      loadingBookmarks: true,
      errorDisplay: '',
      noMoreResults: false,
      twitterWidgetLoaded: false,
      hasNoBookmarks: false,
      screenName: this.$route.params.screenName
    }
  },
  mounted () {
    this.getBookmarks()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    async getBookmarks (removeOldResults) {
      if (!this.noMoreResults || (this.noMoreResults && removeOldResults)) {
        this.loadingBookmarks = true
        this.noMoreResults = false

        // if (this.$cookie.get('cookieConsent')) {
        //   this.$cookie.set('siteNamesSelected', JSON.stringify(this.siteNamesSelected), 30)
        //   this.$cookie.set('orientationSelected', this.orientationSelected, 30)
        //   this.$cookie.set('sortBySelected', this.sortBySelected, 30)
        // }

        try {
          var response = await BookmarksService.fetchBookmarks({
            searchTerm: this.searchTerm,
            screen_name: this.screenName,
            sort: {_id: -1},
            skip: removeOldResults ? 0 : this.bookmarks.length
            // fields: 'id_str'
          })
        } catch (error) {
          this.errorDisplay = error.message
          this.loadingBookmarks = false
          console.error(error.message)
        }

        if (response && response.data.length !== 0) {
          // load results into this.bookmarks
          if (removeOldResults) {
            this.bookmarks = response.data
          } else {
            this.bookmarks = this.bookmarks.concat(response.data)
          }

          // for (const bookmark of this.bookmarks) {
          //   // action to do for each bookmark
          // }

          this.loadingBookmarks = false

          if (response.data.length < 12) {
            this.noMoreResults = true
          }
        } else {
          if (this.bookmarks.length === 0) {
            this.hasNoBookmarks = true
          }
          this.noMoreResults = true
          this.loadingBookmarks = false
        }
      }
      this.revealBookmarks()
    },
    revealBookmarks: function () {
      this.bookmarks.slice(this.bookmarksRevealed.length, this.bookmarksRevealed.length + 10).forEach(element => {
        this.bookmarksRevealed.push(element)
      })
      this.loadingBookmarks = false
    },
    handleScroll: function (event) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!this.loadingBookmarks) {
          this.loadingBookmarks = true
          this.revealBookmarks()
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.screenName = this.$route.params.screenName
      this.bookmarks = []
      this.bookmarksRevealed = []
      this.noMoreResults = false
      this.getBookmarks()
    }
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
