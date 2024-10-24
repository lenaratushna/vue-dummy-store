import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useCartStore = defineStore('cartStore', () => {
  const cartList = ref([])

  const cartListCount = computed(() => {
    return cartList.value.reduce((total, item) => {
      return total + item.amount
    }, 0)
  })

  const cartTotalPrice = computed(() => {
    return cartList.value
      .reduce((total, item) => {
        return total + item.price * item.amount
      }, 0)
      .toFixed(2)
  })

  onMounted(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      cartList.value = JSON.parse(storedCart)
    }
  })

  const resetCart = () => {
    localStorage.removeItem('cart')
    cartList.value = []
  }

  const addToCart = (product, amount) => {
    const productInCart = cartList.value.find(item => item.id === product.id)

    if (productInCart) {
      productInCart.amount += amount
      productInCart.price += product.price * amount
    } else {
      cartList.value.push({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        amount: amount,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cartList.value))
  }

  const deleteFromCart = productId => {
    cartList.value = cartList.value.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(cartList.value))
  }

  const decreaseAmount = productId => {
    const productInCart = cartList.value.find(item => item.id === productId)

    if (productInCart && productInCart.amount > 1) {
      productInCart.amount -= 1
    } else {
      deleteFromCart(productId)
    }

    localStorage.setItem('cart', JSON.stringify(cartList.value))
  }

  const increaseAmount = productId => {
    const productInCart = cartList.value.find(item => item.id === productId)

    if (productInCart) {
      productInCart.amount += 1
    }

    localStorage.setItem('cart', JSON.stringify(cartList.value))
  }

  return {
    cartList,
    cartListCount,
    cartTotalPrice,
    addToCart,
    deleteFromCart,
    decreaseAmount,
    increaseAmount,
    resetCart,
  }
})
