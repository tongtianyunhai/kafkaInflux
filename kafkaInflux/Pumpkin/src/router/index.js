import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/login.vue";
import Main from "@/views/main/index.vue"


import Show from '../views/show/index.vue'
// imlport Home from '../views/Home.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
  //meichandise gly
      {
        path: '/show',
        name: 'Show',
        component: Show,
      },
  ]
  }
]
const router = new VueRouter({
  routes
})

export default router

