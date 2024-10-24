import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const categories = ref([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        'https://dummyjson.com/products/categories',
      )
      categories.value = data
    } catch (e) {
      console.error(e)
    }
  }

  return { categories, fetchCategories }
})
