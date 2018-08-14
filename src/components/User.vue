<template>

<b-container class="mt-5">
  Hello, {{ $store.state.auth.user.displayName }}!
</b-container>

</template>

<script>
export default {
  name: 'front',
  props: {
    user: Object,
    userTwitterData: Object
  },
  data () {
    return {
    }
  },
  created () {
    // this.user = firebase.auth().currentUser
  },
  components: {
    // Bookmarks,
    // Favorites
  }
}
</script>
