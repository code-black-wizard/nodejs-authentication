<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="getLoading">
        <p><strong>Name</strong>: {{ getUser.username }}</p>
        <p><strong>Email</strong>: {{ getUser.email }}</p>
        <p><strong>Id</strong>: {{ getUser.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLoading', 'getUser'])
  },
  created() {
    this.$store.dispatch('getProfile')
  }
}
</script>

<style lang="scss" scoped>
</style>