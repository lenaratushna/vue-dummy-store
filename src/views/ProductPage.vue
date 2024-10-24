<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import ReviewRating from '@/components/ReviewRating.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseHeading from '@/components/ui/BaseHeading.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const route = useRoute()
const productStore = useProductStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const productId = route.params.id
const productAmount = ref(1)
const showMore = ref(false)
const availabilityMessage = ref('')

const isModalVisible = ref(false)
const modalMessage = ref('')

const formattedDate = d => {
  const date = new Date(d)
  return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`
}

const toggleShowMore = () => {
  showMore.value = !showMore.value
}

const toggleWishlist = product => {
  wishlistStore.toggleWishlist(product)
}

const addToCart = (product, amount) => {
  cartStore.addToCart(product, amount)
  modalMessage.value = `${product.title} was added to your cart.`
  isModalVisible.value = true

  productAmount.value = 1
  // Automatically hide the modal after 3 seconds
  setTimeout(() => {
    isModalVisible.value = false
  }, 1500)
}

const decreaseAmount = () => {
  if (productAmount.value > 1) {
    productAmount.value--
  }
}

const increaseAmount = () => {
  if (productAmount.value < productStore.singleProduct.stock) {
    productAmount.value++
  } else {
    availabilityMessage.value = `Only ${productStore.singleProduct.stock} items available`
  }
}

onMounted(() => {
  productStore.fetchProductById(productId)
  watchEffect(() => {
    const product = productStore.singleProduct
    if (product && product.stock <= 5) {
      availabilityMessage.value = `Only ${product.stock} items available`
    } else {
      availabilityMessage.value = ''
    }
  })
})
</script>

<template>
  <div v-if="!productStore.isLoading">
    <div
      v-if="productStore.singleProduct"
      class="px-4 py-2 uppercase 2xl:container mx-auto"
    >
      <RouterLink to="/">Home</RouterLink> /
      <RouterLink :to="`/category/${productStore.singleProduct.category}`">{{
        productStore.singleProduct.category
      }}</RouterLink>
      /
      <span class="font-thin">{{ productStore.singleProduct.title }}</span>
    </div>
    <div v-if="productStore.singleProduct" class="px-4 2xl:container mx-auto">
      <div class="flex flex-col md:flex-row gap-4 relative">
        <div
          v-if="productStore.singleProduct.availabilityStatus == 'Low Stock'"
          class="absolute top-3 left-0 bg-orange-500 text-white px-2"
        >
          {{ productStore.singleProduct.availabilityStatus }}
        </div>
        <div class="w-full border rounded max-h-screen overflow-hidden">
          <img
            :src="productStore.singleProduct.images[0]"
            :alt="productStore.singleProduct.title"
            class="object-contain w-full h-full"
          />
        </div>

        <div class="flex flex-col gap-3">
          <BaseHeading>
            {{ productStore.singleProduct.title }}
          </BaseHeading>
          <div>
            <span class="mr-4">
              <i class="pi pi-star-fill"></i>
              {{ productStore.singleProduct.rating }}
            </span>
            <span>{{ productStore.singleProduct.reviews.length }} reviews</span>
          </div>
          <p v-if="productStore.singleProduct.description">
            {{ productStore.singleProduct.description }}
          </p>
          <div v-if="productStore.singleProduct.brand">
            Brand:
            <span class="font-bold">{{
              productStore.singleProduct.brand
            }}</span>
          </div>

          <div class="font-bold">
            <i class="pi pi-truck mr-1"></i>
            {{ productStore.singleProduct.shippingInformation }}
          </div>

          <div @click="toggleShowMore" class="underline cursor-pointer">
            {{ showMore ? 'Show less' : 'Show more' }}
          </div>

          <table
            v-show="showMore"
            class="table-auto border-collapse border border-gray-400"
          >
            <thead>
              <tr>
                <th class="border border-gray-300 px-4 py-2">Specification</th>
                <th class="border border-gray-300 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="productStore.singleProduct.weight">
                <td class="border border-gray-300 px-4 py-2">Weight</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ productStore.singleProduct.weight }}
                </td>
              </tr>
              <tr v-if="productStore.singleProduct.dimensions?.width">
                <td class="border border-gray-300 px-4 py-2">Width</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ productStore.singleProduct.dimensions.width }}
                </td>
              </tr>
              <tr v-if="productStore.singleProduct.dimensions?.height">
                <td class="border border-gray-300 px-4 py-2">Height</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ productStore.singleProduct.dimensions.height }}
                </td>
              </tr>
              <tr v-if="productStore.singleProduct.dimensions?.depth">
                <td class="border border-gray-300 px-4 py-2">Depth</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ productStore.singleProduct.dimensions.depth }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-3xl font-bold">
            ${{ productStore.singleProduct.price }}
          </div>

          <div class="flex items-center gap-2">
            <div class="h-full flex items-center border border-black rounded">
              <span @click="decreaseAmount" class="p-2 cursor-pointer">-</span>
              <span class="min-w-6 text-center">{{ productAmount }}</span>
              <span @click="increaseAmount" class="p-2 cursor-pointer">+</span>
            </div>
            <BaseButton
              @click="addToCart(productStore.singleProduct, productAmount)"
              >Add to cart</BaseButton
            >
            <i
              :class="
                wishlistStore.isInWishlist(productStore.singleProduct)
                  ? 'pi-heart-fill'
                  : 'pi-heart'
              "
              class="pi text-red-500 text-3xl"
              @click="toggleWishlist(productStore.singleProduct)"
            ></i>
          </div>
          <p v-if="availabilityMessage" class="text-red-500 text-sm">
            {{ availabilityMessage }}
          </p>
        </div>
      </div>

      <div class="flex max-h-screen overflow-hidden">
        <img
          v-for="(image, index) in productStore.singleProduct.images.slice(1)"
          :key="index"
          :src="image"
          :alt="productStore.singleProduct.title"
          class="w-full md:w-1/2 object-contain"
        />
      </div>

      <div v-if="productStore.singleProduct.reviews.length" class="mt-10">
        <h4 class="font-bold">
          {{ productStore.singleProduct.reviews.length }}
          Reviews for
          {{ productStore.singleProduct.title }}
        </h4>
        <div
          v-for="review in productStore.singleProduct.reviews"
          :key="review.reviewerEmail"
          class="border-b p-4"
        >
          <div class="flex items-center gap-10 mb-2">
            <span class="font-semibold">{{ review.reviewerName }}</span>
            <span class="text-xs text-slate-700">{{
              formattedDate(review.date)
            }}</span>
          </div>
          <ReviewRating :rating="review.rating" />
          <p class="mt-2">{{ review.comment }}</p>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <BaseModal v-if="isModalVisible">{{ modalMessage }}</BaseModal>
    </Teleport>
  </div>
  <div v-else>
    <BaseSpinner />
  </div>
</template>
