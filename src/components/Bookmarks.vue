<template>
    <b-container>
        <b-row v-if="errorDisplay">
            <b-col>
                <b-alert show>Something went wrong :( {{ errorDisplay }}</b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col  v-for="bookmark in bookmarks" :key="bookmark.id_str">
              <blockquote class="twitter-tweet" data-width="auto">
                <a :href="'https://twitter.com/placeholder/statuses/' + bookmark.id_str "></a>
              </blockquote>
                <!-- <BookmarkCard :bookmark="bookmark"></BookmarkCard> -->
            </b-col>
        </b-row>
        <b-row v-if="hasNoBookmarks" class="my-5">
            <b-col class="text-center">
                <p>You haven't bookmarked any tweets yet. Do it by mentioning @save_this in a reply to the tweet you want to bookmark.</p>
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
import BookmarksService from '@/services/BookmarksService'
export default {
  name: 'bookmarks',
  data () {
    return {
      bookmarks: [],
      loaderShow: true,
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
        this.loaderShow = true
        this.noMoreResults = false

        // if (this.$cookie.get('cookieConsent')) {
        //   this.$cookie.set('siteNamesSelected', JSON.stringify(this.siteNamesSelected), 30)
        //   this.$cookie.set('orientationSelected', this.orientationSelected, 30)
        //   this.$cookie.set('sortBySelected', this.sortBySelected, 30)
        // }

        try {
          var response = await BookmarksService.fetchBookmarks({
            searchTerm: this.searchTerm,
            user: this.screenName,
            sort: {_id: -1}
            // fields: 'id_str'
          })
        } catch (error) {
          this.errorDisplay = error.message
          this.loaderShow = false
          console.error(error.message)
        }

        if (response && response.data.bookmarks.length !== 0) {
          // load results into this.bookmarks
          if (removeOldResults) {
            this.bookmarks = response.data.bookmarks
          } else {
            this.bookmarks = this.bookmarks.concat(response.data.bookmarks)
          }

          // for (const bookmark of this.bookmarks) {
          //   // action to do for each bookmark
          // }

          this.loaderShow = false

          if (response.data.bookmarks.length < 12) {
            this.noMoreResults = true
          }
        } else {
          if (this.bookmarks.length === 0) {
            this.hasNoBookmarks = true
          }
          this.noMoreResults = true
          this.loaderShow = false
        }

        if (!this.twitterWidgetLoaded) {
          let twitterWidgetScript = document.createElement('script')
          twitterWidgetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
          document.body.appendChild(twitterWidgetScript)
        }
      }
    },
    handleScroll: function (event) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!this.loaderShow) {
          this.getBookmarks()
        }
      }
    }
  }
}
</script>

<style>
</style>
