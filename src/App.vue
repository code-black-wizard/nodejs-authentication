<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <notifications group="success" position="bottom left" width="100%" />
    <notifications group="error" position="bottom left" width="100%" />
  </div>
</template>

<script>
  import Navbar from '@/components/UI/AppNavbar'
  
  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
</style>
