import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('productStore', () => {
  const products = ref([])
  const totalProducts = ref(0)
  const singleProduct = ref(null)
  const isLoading = ref(false)

  const fetchProducts = async ({ limit, sortBy, order, skip } = {}) => {
    isLoading.value = true 
    try {
      const params = {}

      if (limit !== undefined ) params.limit = limit
      if (skip !== undefined ) params.skip = skip
      if (sortBy) params.sortBy = sortBy
      if (order) params.order = order

      const { data } = await axios.get('https://dummyjson.com/products', {
        params,
      })
      products.value = data.products
      totalProducts.value = +data.total
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductsByCategory = async ({ id, limit, sortBy, order, skip }) => {
    isLoading.value = true 
    try {
      const params = {}

      if (limit !== undefined ) params.limit = limit
      if (skip !== undefined ) params.skip = skip
      if (sortBy) params.sortBy = sortBy
      if (order) params.order = order

      const { data } = await axios.get(`https://dummyjson.com/products/category/${id}`, {
        params,
      })
      products.value = data.products
      totalProducts.value = +data.total
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async id => {
    isLoading.value = true 
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`)
      singleProduct.value = data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { products, singleProduct, fetchProducts, fetchProductsByCategory, fetchProductById, isLoading, totalProducts}
})
