<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <form @submit.prevent="signup">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model.trim="$v.username.$model" type="text" class="form-control" />
            <div class="error" v-if="$v.username.$error">Name is required</div>
          </div>
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
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    username: {
      required
    },
    email: {
      required,
      email
    }
  },
  methods: {
    signup() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.$axios.post('/sign-up', {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.submitStatus = null
            console.log(res)
            this.$notify({
              group: 'success',
              title: res.data.message,
              type: 'success'
            })
          })
          .catch(err => {
            this.submitStatus = null
            this.$notify({
              group: 'error',
              title: err.response.data.message,
              type: 'error' 
            }) 
          })
      }
    }
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
