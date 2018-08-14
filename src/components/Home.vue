<template>

<b-container class="mt-5">

    Hello!

    <login></login>

</b-container>

</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'home',
  props: {
  },
  data () {
    return {
    }
  },
  created () {
    // this.user = firebase.auth().currentUser
  },
  components: {
    Login: Login
  }
}
</script>
