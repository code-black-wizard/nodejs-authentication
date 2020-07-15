<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="!isUser" class="col-md-8 col-lg-6">
        <form @submit.prevent="signin">
         <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model.trim="$v.email.$model" type="text" class="form-control" />
            <div class="error" v-if="$v.email.$error">Email is required</div>
            <div class="error" v-if="$v.email.$error">Email is not valid</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model.trim="$v.password.$model" type="password" class="form-control" />
            <div class="error" v-if="$v.password.$error">Password is required</div>
            <div class="error" v-if="$v.password.$error">Password must be not less than 6 symbols</div>
          </div>
          <button :disabled="submitStatus === 'PENDING'" type="submit" class="btn btn-dark custom-btn">Sign up</button>
        </form>
      </div>
      <div v-else>
        <h2 class="test-center">You are logged in</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    signin() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$store.commit('SET_SUBMIT_STATUS', 'ERROR')
      } else {
        this.$store.commit('SET_SUBMIT_STATUS', 'PENDING')
        this.$store.dispatch('signin', {
          email: this.email,
          password: this.password
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      submitStatus: 'getSubmitStatus',
      isUser: 'getToken'
    })
  }
}
</script>

<style lang="scss">
  .custom-btn {
    background: #6f42c1;
  }
  .error {
    color: red;
  }
</style>
