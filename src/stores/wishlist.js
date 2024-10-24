import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useWishlistStore = defineStore('wishlistStore', () => {
  const wishlist = ref([])

  const wishlistCount = computed(() => wishlist.value.length)

  onMounted(() => {
    const storedWishList = localStorage.getItem('wishList')
    if (storedWishList) {
      wishlist.value = JSON.parse(storedWishList)
    }
  })

  const isInWishlist = product => {
    return wishlist.value.some(item => item.id === product.id)
  }

  const toggleWishlist = product => {
    const index = wishlist.value.findIndex(item => item.id === product.id)

    if (index === -1) {
      // If product not in wishlist, add it
      wishlist.value.push({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
      })
    } else {
      // If product in wishlist, delete it
      wishlist.value.splice(index, 1)
    }

    localStorage.setItem('wishList', JSON.stringify(wishlist.value))
  }

  return { wishlist, wishlistCount, isInWishlist, toggleWishlist }
})
