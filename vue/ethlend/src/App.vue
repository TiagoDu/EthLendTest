<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Namespace from './util/constants/namespace'
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    beforeCreate() {
      this.$store.dispatch(Namespace.REGISTER_WEB_3);
    }
  }
</script>

<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: black;

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
