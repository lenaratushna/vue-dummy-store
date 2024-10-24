<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useCategoriesStore } from '@/stores/categories'
import { useCartStore } from '@/stores/cart'
import { useToggleBodyScroll } from '@/composables/useToggleBodyScroll'
import CategoryList from './CategoryList.vue'
import MiniCart from './MiniCart.vue'
import AppLogo from './AppLogo.vue'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const route = useRoute()

const categoriesStore = useCategoriesStore()
const isCategoryListVisible = ref(false)
const isCartVisible = ref(false)

const toggleCartVisibility = () => {
  isCartVisible.value = !isCartVisible.value
}

watch(
  () => isCartVisible.value,
  newVal => {
    useToggleBodyScroll(newVal)
  },
)

// Watch for route changes and hide the category list
watch(
  () => route.path,
  () => {
    isCategoryListVisible.value = false
  },
)

onMounted(() => {
  categoriesStore.fetchCategories()
})
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white p-4 border-b text-2xl z-30">
    <div class="2xl:container mx-auto flex justify-between">
      <AppLogo />
      <nav>
        <ul class="flex gap-5 sm:gap-10">
          <li class="flex items-center">
            <button
              @click="isCategoryListVisible = !isCategoryListVisible"
              class="flex items-center gap-1"
            >
              <i
                :class="isCategoryListVisible ? 'pi pi-times' : 'pi pi-list'"
              ></i>
              <span class="hidden sm:block">Catalog</span>
            </button>
          </li>
          <li class="relative">
            <RouterLink to="/wishlist">
              <i class="pi pi-heart"></i>
              <div
                v-show="wishlistStore.wishlistCount > 0"
                class="absolute bottom-0 right-[-8px] w-5 h-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center"
              >
                {{ wishlistStore.wishlistCount }}
              </div>
            </RouterLink>
          </li>
          <li class="relative cursor-pointer" @click="toggleCartVisibility">
            <i class="pi pi-shopping-bag"></i>
            <div
              v-show="cartStore.cartListCount > 0"
              class="absolute bottom-0 right-[-8px] w-5 h-5 rounded-full bg-green-500 text-white text-xs flex justify-center items-center"
            >
              {{ cartStore.cartListCount }}
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <div v-if="isCategoryListVisible" class="border-t mt-4">
      <CategoryList />
    </div>
  </header>
  <!-- Overlay for background dimming -->
  <div
    v-if="isCategoryListVisible"
    @click="isCategoryListVisible = false"
    class="fixed inset-0 bg-black opacity-50 z-20"
  ></div>

  <!-- Cart -->
  <Transition name="slide">
    <MiniCart
      v-if="isCartVisible"
      :isCartVisible="isCartVisible"
      @closeCart="isCartVisible = false"
    />
  </Transition>
  <div
    v-if="isCartVisible"
    @click="isCartVisible = false"
    class="fixed inset-0 bg-black opacity-50 z-40"
  ></div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
}
</style>
