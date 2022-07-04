import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/login.vue";
import Main from "@/views/main/index.vue"


import Show from '../views/show/index.vue'
import History from '../views/history/index.vue'
import Server from '../views/server/index.vue'
import NewTask from '../views/newTask/index.vue'


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
      {
        path: '/history',
        name: 'History',
        component: History,
      }, {
        path: '/server',
        name: 'Server',
        component: Server,
      },
      {
        path: '/newTask',
        name: 'NewTask',
        component: NewTask,
      },
  ]
  }
]
const router = new VueRouter({
  routes
})

export default router

