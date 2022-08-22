import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import editPost from '../views/editPost'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
  },

  {
    path: '/editPost',
    name: 'editPost',
    component: editPost,
  }
]

const router = new VueRouter({
  routes
})

export default router;