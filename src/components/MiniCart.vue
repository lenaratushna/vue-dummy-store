<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BaseHeading from './ui/BaseHeading.vue'
import BaseButton from './ui/BaseButton.vue'

const emit = defineEmits(['closeCart'])

const router = useRouter()
const cartStore = useCartStore()

const decreaseAmount = id => {
  cartStore.decreaseAmount(id)
}

const increaseAmount = id => {
  cartStore.increaseAmount(id)
}

const deleteFromCart = id => {
  cartStore.deleteFromCart(id)
}

const proceedToCheckout = () => {
  router.push({ name: 'Checkout' })
  emit('closeCart')
}
</script>

<template>
  <div
    class="fixed w-full lg:w-2/5 right-0 top-0 bg-white h-full z-50 p-5 overflow-auto"
  >
    <button @click="$emit('closeCart')" class="absolute top-5 right-5 text-2xl">
      <i class="pi pi-times"></i>
    </button>
    <BaseHeading>Cart</BaseHeading>
    <template v-if="cartStore.cartList.length">
      <ul class="flex flex-col gap-2 max-h-[75vh] overflow-y-auto pr-4">
        <li
          v-for="product in cartStore.cartList"
          :key="product.id"
          class="relative flex gap-2"
        >
          <RouterLink :to="`/product/${product.id}`">
            <div class="w-28 sm:w-36 h-28 sm:h-36">
              <img :src="product.image" class="w-full h-full object-contain" />
            </div>
          </RouterLink>
          <div class="py-4 pr-10 flex flex-col justify-between">
            <RouterLink :to="`/product/${product.id}`">
              <h3>{{ product.title }}</h3>
            </RouterLink>

            <b>${{ (product.price * product.amount).toFixed(2) }}</b>

            <div
              class="h-10 w-fit flex items-center border border-black rounded"
            >
              <span
                @click="decreaseAmount(product.id)"
                class="p-2 cursor-pointer"
                >-</span
              >
              <span class="min-w-6 text-center">{{ product.amount }}</span>
              <span
                @click="increaseAmount(product.id)"
                class="p-2 cursor-pointer"
                >+</span
              >
            </div>
          </div>
          <button
            @click.prevent.stop="deleteFromCart(product.id)"
            class="absolute text-red-500 top-3 right-3"
          >
            <i class="pi pi-trash"></i>
          </button>
        </li>
      </ul>
      <div
        class="absolute bottom-5 left-5 right-5 border-t pt-4 flex flex-col gap-4"
      >
        <BaseHeading class="flex justify-between">
          <span>Total ({{ cartStore.cartListCount }} items)</span><span>${{ cartStore.cartTotalPrice }}</span>
        </BaseHeading>
        <BaseButton @click="proceedToCheckout">
          PROCEED TO CHECKOUT
        </BaseButton>
      </div>
    </template>
    <p v-else class="flex justify-center py-10">Your cart is empty</p>
  </div>
</template>
