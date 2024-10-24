<script setup>
import { useCategoriesStore } from '../stores/categories'
import { useRoute } from 'vue-router'

const categoriesStore = useCategoriesStore()
const route = useRoute()

const isActive = slug => {
  return route.params.id === slug
}
</script>

<template>
  <div class="2xl:container mx-auto max-h-96 overflow-y-auto bg-white p-4">
    <ul class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-2">
      <li class="group flex items-center">
        <i
          class="pi pi-play text-sm text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          :class="{ 'opacity-100': isActive('all-products') }"
        ></i
        ><RouterLink to="/category/all-products">All product</RouterLink>
      </li>
      <li
        v-for="category in categoriesStore.categories"
        :key="category.slug"
        class="group flex items-center"
      >
        <i
          class="pi pi-play text-sm text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          :class="{ 'opacity-100': isActive(category.slug) }"
        ></i>
        <RouterLink :to="`/category/${category.slug}`">{{
          category.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
