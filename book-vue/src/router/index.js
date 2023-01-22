import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookIndex from "@/views/BookIndex.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex
  },
  {
    path: '/admin',
    name: 'home',
    component: HomeView  }
]

const router = new VueRouter({
  routes
})

export default router
