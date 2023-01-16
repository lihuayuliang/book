import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LibraryIndex from "@/views/LibraryIndex.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AppLibrary',
    component: LibraryIndex
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
