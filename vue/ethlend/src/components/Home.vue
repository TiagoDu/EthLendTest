<template>
  <section>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Reviews">
        <vue-reviews></vue-reviews>
      </b-tab-item>

      <b-tab-item label="Write a review!">
        <vue-write-review></vue-write-review>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
  import Reviews from './Reviews.vue'
  import WriteReview from './WriteReview.vue'

  export default {
    name: 'Home',
    data() {
      return {
        activeTab: 0
      }
    },
    components: {
      'vue-reviews': Reviews,
      'vue-write-review': WriteReview
    }
  }
</script>

<style scoped>

</style>
