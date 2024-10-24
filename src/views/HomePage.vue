<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import HomeSlider from '@/components/HomeSlider.vue'
import ProductTile from '@/components/ProductTile.vue'
import BaseHeading from '@/components/ui/BaseHeading.vue'
import BaseGrid from '@/components/ui/BaseGrid.vue'

const productStore = useProductStore()
const productLimit = 12

onMounted(() => {
  productStore.fetchProducts({
    limit: productLimit,
    sortBy: '',
    order: 'asc', //desc or asc
  })
})
</script>

<template>
  <main class="p-4 2xl:container mx-auto">
    <HomeSlider />
    <div class="flex justify-between items-center mt-6">
      <BaseHeading class="mb-4">Shop The Latest</BaseHeading>
      <RouterLink to="/category/all-products">View All</RouterLink>
    </div>
    <BaseGrid v-if="!productStore.isLoading">
      <ProductTile
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </BaseGrid>
  </main>
</template>
