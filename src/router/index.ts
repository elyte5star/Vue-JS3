import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import CartView from '@/views/CartView.vue'
import NotFound from '@/views/NotFound.vue'
import ProductView from '@/views/ProductView.vue'
import AdminView from '@/views/AdminView.vue'
import RegisterUser from '@/views/RegisterUserView.vue'
import ContactUs from '@/views/ContactView.vue'
import CheckOut from '@/components/CheckOut.vue'

import { userAuthStore } from '@/stores/auth_store'
import { userAlertStore } from '@/stores/alert'





const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUser
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },

  {
    path: '/user/:userid',
    name: 'oneUser',
    component: UserView,
    props: true

  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/product/:pid',
    name: 'oneProduct',
    component: ProductView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView

  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound'
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckOut

  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,

  scrollBehavior(to, from, savedPosition) {

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0, left: 0 }
  },
  routes
})

router.beforeEach(async (to: any, from, next) => {


  // clear alert on route change
  const alertStore = userAlertStore();
  alertStore.reset();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['Login', 'Home', 'oneProduct', 'Contact', 'Cart', 'Register'];

  const authRequired = !publicPages.includes(to.name);

  const auth = userAuthStore();

  if (authRequired && !auth.user) {

    auth.returnUrl = to.fullPath;
    next({ name: 'Login' });

  } else {

    next();

  }



});

export default router