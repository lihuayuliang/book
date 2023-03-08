import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from "@/views/index/BookIndex.vue";
import Publish from "@/views/publish/Publish.vue";
import MyBook from "@/views/mybook/MyBook.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'BookIndex',
        component: BookIndex
    },
    {
        path: '/publish',
        name: 'publish',
        component: Publish
    },
    {
        path: '/mybook',
        name: 'mybook',
        component: MyBook
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/Register.vue')
    },
    {
        path: '/detail',
        name: 'BookDetail',
        component: () => import('@/views/detail/BookDetail.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart/Cart.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
