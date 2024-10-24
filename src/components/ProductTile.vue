<script setup>
import { useWishlistStore } from '../stores/wishlist'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const wishlistStore = useWishlistStore()

const toggleWishlist = product => {
  wishlistStore.toggleWishlist(product)
}
</script>

<template>
  <RouterLink :to="`/product/${product.id}`">
    <div class="relative cursor-pointer border rounded-[5px] hover:shadow-xl">
      <div
        v-if="product.availabilityStatus == 'Low Stock'"
        class="absolute top-3 left-0 bg-orange-500 text-white px-2"
      >
        {{ product.availabilityStatus }}
      </div>
      <i
        :class="
          wishlistStore.isInWishlist(product) ? 'pi-heart-fill' : 'pi-heart'
        "
        class="pi text-red-500 absolute top-3 right-3"
        @click.prevent.stop="toggleWishlist(product)"
      ></i>
      <div class="w-full h-80 overflow-hidden">
        <img
          :src="product.images[0]"
          :alt="product.title"
          class="w-full h-full object-contain"
        />
      </div>
      <div class="p-3">
        <h2>{{ product.title }}</h2>
        <div class="flex justify-between">
          <span><i class="pi pi-star-fill"></i>{{ product.rating }}</span>
          <b>${{ product.price }}</b>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
