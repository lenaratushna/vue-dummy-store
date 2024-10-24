<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import BaseHeading from '@/components/ui/BaseHeading.vue'

const wishlistStore = useWishlistStore()

const toggleWishlist = product => {
  wishlistStore.toggleWishlist(product)
}
</script>

<template>
  <div class="p-4 2xl:container mx-auto">
    <BaseHeading class="mb-4">Shop The Favorite</BaseHeading>
    <TransitionGroup
      v-if="wishlistStore.wishlist.length"
      name="list"
      tag="ul"
      class="flex flex-col gap-2"
    >
      <li
        v-for="product in wishlistStore.wishlist"
        :key="product.id"
        class="border rounded relative"
      >
        <RouterLink :to="`/product/${product.id}`" class="flex gap-2">
          <div class="w-28 sm:w-40 h-28 sm:h-40">
            <img :src="product.image" class="w-full h-full object-contain" />
          </div>
          <div class="p-5 pr-8">
            <h3>{{ product.title }}</h3>
            <b>${{ product.price }}</b>
          </div>
          <button
            @click.prevent.stop="toggleWishlist(product)"
            class="absolute text-red-500 top-3 right-3"
          >
            <i class="pi pi-trash"></i>
          </button>
        </RouterLink>
      </li>
    </TransitionGroup>
    <div v-else>Your wishlist is empty</div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
