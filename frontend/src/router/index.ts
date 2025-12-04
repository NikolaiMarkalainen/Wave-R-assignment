import { useAuth } from '@/composables/useAuth';
import MainPage from '@/views/MainPage.vue';
import SignIn from '@/views/SignIn.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainPage, name: 'home', meta: { requiresAuth: true } },
    { path: '/login', component: SignIn, name: 'login' },
    { path: '/:catchAll(.*)', redirect: '/' },
  ],
});

router.beforeEach(async (to, _, next) => {
  const auth = useAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(auth.isAuthenticated.value);
  if (requiresAuth && !auth.isAuthenticated.value) {
    next({ name: 'login' });
  } else if (to.name === 'login' && auth.isAuthenticated.value) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
