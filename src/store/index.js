import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

Vuex.Store.prototype.$axios = axiosInstance

export default new Vuex.Store({
  state: {
    token: '' || window.localStorage.getItem('token'),
    submitStatus: null,
    user: {},
    loading: false
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data
    },
    SET_SUBMIT_STATUS(state, data) {
      state.submitStatus = data
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_LOADING(state, data) {
      state.loading = data
    }
  },
  actions: {
    async signup({commit}, payload) {
      try {
        const { username, email, password } = payload
        const { data } = await this.$axios.post('/signup', {
          username,
          email,
          password
        })
        commit('SET_SUBMIT_STATUS', null)
        this._vm.$notify({
          group: 'success',
          title: data.message,
          type: 'success'
        })
      } catch (err) {
        commit('SET_SUBMIT_STATUS', null)
        this._vm.$notify({
          group: 'error',
          title: err.response.data.message,
          type: 'error' 
        })
      }
    },
    async signin({commit}, payload) {
      try {
        const { email, password } = payload
        const { data } = await this.$axios.post('/signin', {
          email,
          password
        })
        commit('SET_TOKEN', data.token)
        window.localStorage.setItem('token', data.token)
        commit('SET_SUBMIT_STATUS', null)
        this._vm.$notify({
          group: 'success',
          title: data.message,
          type: 'success'
        })
        router.push({name: 'profile'})
      } catch (err) {
        commit('SET_SUBMIT_STATUS', null)
        this._vm.$notify({
          group: 'error',
          title: err.response.data.message,
          type: 'error' 
        })
      }
    },
    async getProfile({commit, state}) {
      commit('SET_LOADING', false)
      try {
        const { data } = await this.$axios.get('/profile', {
          headers: {
            'token': state.token
          }
        })
        commit('SET_USER', data)
        commit('SET_LOADING', true)
      } catch (err) {
        this._vm.$notify({
          group: 'error',
          title: err.response.data.message,
          type: 'error' 
        })
      }
    },
    logout({commit}) {
      commit('SET_TOKEN', '')
      commit('SET_USER', {})
      window.localStorage.removeItem('token')
    }
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getSubmitStatus(state) {
      return state.submitStatus
    },
    getUser(state) {
      return state.user
    },
    getLoading(state) {
      return state.loading
    }
  }
})
