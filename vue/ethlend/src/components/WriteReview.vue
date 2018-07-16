<template>
  <section>
    <b-field>
      <b-input placeholder="Title" minlength="2" v-model="title"></b-input>
    </b-field>

    <b-field>
      <b-input placeholder="Author" minlength="2" v-model="author"></b-input>
    </b-field>

    <b-field>
      <b-input type="textarea"
               minlength="10"
               placeholder="Write a few words about your review" v-model="content">
      </b-input>
    </b-field>

    <a class="button is-light" @click="submitReview">Sumbit review</a>
  </section>
</template>

<script>
  import Strings from '../util/constants/strings.js'
  import Namespace from '../util/constants/namespace.js'

  export default {
    name: "WriteReview",
    data() {
      return {
        title: '',
        content: '',
        author: ''
      }
    },
    methods: {
      submitReview() {
        if (this.title.length > 2 && this.content.length > 10 && this.author.length > 2) {
          let payload = { 'title': this.title, 'content': this.content, 'author': this.author}
          this.$store.dispatch(Namespace.SUBMIT_REVIEW, payload)
        } else {
          alert(Strings.error_submit_review)
        }
      }
    }
  }
</script>

<style scoped>
</style>
