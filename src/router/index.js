import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup'
import Signin from '../views/Signin'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      guest: true
    }
  },
  {
    path: '/',
    name: 'signin',
    component: Signin
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!window.localStorage.getItem('token')) {
      next({name: 'signup'})
    } else {
      next()
    }
  } else if (to.matched.some(route => route.meta.guest)) {
    if (window.localStorage.getItem('token')) {
      next({name: 'signin'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
