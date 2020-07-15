<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar mb-5">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li>
            <router-link @click.native="isUser && $store.dispatch('logout')" to="/" exact class="nav-link">{{ !isUser ? 'Signin' : 'Logout' }}</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isUser" to="/signup" class="nav-link">Signup</router-link>
          </li>
          <li>
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        isUser: 'getToken'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .app-navbar {
    background: #6f42c1;
  }
</style>