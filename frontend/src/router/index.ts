import MainPage from '@/views/MainPage.vue'
import SignIn from '@/views/SignIn.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainPage },
    { path: '/login', component: SignIn },
  ],
})

export default router
