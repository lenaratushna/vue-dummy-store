import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import ProductPage from '@/views/ProductPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import WishlistPage from '@/views/WishlistPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
