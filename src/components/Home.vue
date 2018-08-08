<template>
<b-container>
    <b-row>
        <b-col class="text-center">
            <h1>Twitter Bookmarks</h1>
            <b-form inline @submit="onSubmit" class="d-flex justify-content-center align-items-center">
                <b-form-input v-model="screenName" type="text" placeholder="Your Twitter username" class="mr-3" style="max-width: 15em"></b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      screenName: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.screenName = this.screenName.replace('@', '')
      this.$router.push({ name: 'Favorites', params: { screenName: this.screenName } })
    }
  }
}
</script>

<style scoped>
</style>
