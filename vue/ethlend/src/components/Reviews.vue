<template>
  <div>
    <div v-if="getReviews.length === 0">Read the best reviews here</div>
    <div v-else v-for="review in getReviews" :key="review.id" class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ review.title }}</strong>
              <br>
              {{ review.content }}
              <br><br>
              Review by <i>{{ review.author }}</i>
              <br><br>
              Upvoted {{ review.upvotes }} times
            </p>
            <div>
              <b-field>
                <b-input placeholder="Tip in Ξ (optional)" v-model="review.tip"></b-input>
                <p class="control">
                  <button class="button is-success" @click="upvote(review)">Upvote review</button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Namespace from '../util/constants/namespace'

  export default {
    name: "Reviews",
    data() {
      return {
        tip: 0
      }
    },
    methods: {
      upvote(review) {
        let payload = { id: review.id }
        if (review.tip !== undefined) {
          let tip = parseFloat(review.tip)
          if (!isNaN(tip)) {
            payload.tip = review.tip
          }
        }

        this.$store.dispatch(Namespace.UPVOTE_REVIEW, payload)
      }
    },
    computed: {
      getReviews() {
        return this.$store.getters.reviews
      }
    }
  }
</script>

<style scoped>

</style>
