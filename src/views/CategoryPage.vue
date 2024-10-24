<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductTile from '@/components/ProductTile.vue'
import BaseHeading from '@/components/ui/BaseHeading.vue'
import BaseGrid from '@/components/ui/BaseGrid.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

//Query parameters
const sortBy = ref(route.query.sortBy || '')
const order = ref(route.query.order || '') //desc or asc
const limit = 24
const skip = ref(route.query.skip ? parseInt(route.query.skip) : 0)
const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1)

const totalPages = computed(() => {
  return Math.ceil(productStore.totalProducts / limit)
})

const fetchProducts = () => {
  const id = route.params.id
  const fetchOptions = {
    limit,
    sortBy: sortBy.value,
    order: order.value,
    skip: skip.value,
  }

  if (id === 'all-products') {
    productStore.fetchProducts(fetchOptions)
  } else {
    productStore.fetchProductsByCategory({ id, ...fetchOptions })
  }
}

const updateURL = () => {
  const query = {
    skip: skip.value,
    page: currentPage.value,
  }

  if (sortBy.value) {
    query.sortBy = sortBy.value
  }
  if (order.value) {
    query.order = order.value
  }

  router.push({ query })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    skip.value = (currentPage.value - 1) * limit
    updateURL()
    fetchProducts()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    skip.value = (currentPage.value - 1) * limit
    updateURL()
    fetchProducts()
  }
}

// Sorting rules
const sortingOptions = [
  { label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  { label: 'Rating', sortBy: 'rating', order: 'desc' },
  { label: 'Name: A-Z', sortBy: 'title', order: 'asc' },
  { label: 'Name: Z-A', sortBy: 'title', order: 'desc' },
]
const selectedSort = ref('')

const getSortLabel = (sortBy, order) => {
  const option = sortingOptions.find(
    opt => opt.sortBy === sortBy && opt.order === order,
  )
  return option ? JSON.stringify(option) : ''
}

const handleSortChange = event => {
  const selectedOption = JSON.parse(event.target.value)
  selectedSort.value = JSON.stringify(selectedOption)
  console.log(selectedSort.value)
  sortBy.value = selectedOption.sortBy
  order.value = selectedOption.order
  skip.value = 0
  currentPage.value = 1
  updateURL()
  fetchProducts()
}

onMounted(() => {
  const { sortBy: routeSortBy, order: routeOrder } = route.query

  if (routeSortBy && routeOrder) {
    selectedSort.value = getSortLabel(routeSortBy, routeOrder)
  }
  fetchProducts()
})

// Watch for changes in the route to refetch products on category or query change
watch(
  () => route.params.id,
  () => {
    currentPage.value = 1
    skip.value = 0
    fetchProducts()
  },
)
</script>

<template>
  <main class="p-4 2xl:container mx-auto">
    <div class="flex justify-between items-center">
      <BaseHeading class="mb-4 uppercase">{{ $route.params.id }}</BaseHeading>
      <div class="flex items-center gap-5">
        <div
          v-if="productStore.products.length"
          class="hidden sm:flex gap-2 text-2xl"
        >
          <i
            @click="prevPage"
            class="pi pi-arrow-circle-left cursor-pointer"
            :class="{ 'text-slate-300 cursor-not-allowed': currentPage === 1 }"
          ></i>
          <i
            @click="nextPage"
            class="pi pi-arrow-circle-right cursor-pointer"
            :class="{
              'text-slate-300 cursor-not-allowed': currentPage === totalPages,
            }"
          ></i>
        </div>
        <select
          id="sort"
          v-model="selectedSort"
          @change="handleSortChange"
          class="border rounded py-2 focus:outline-none sm:text-sm"
        >
          <option disabled value="">Sorted by</option>
          <option
            v-for="option in sortingOptions"
            :key="option.sortBy + option.order"
            :value="JSON.stringify(option)"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <BaseGrid v-if="!productStore.isLoading">
      <ProductTile
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
      <div v-if="!productStore.products.length">
        No products available for this category
      </div>
    </BaseGrid>
    <div v-else><BaseSpinner /></div>
    <div
      v-if="productStore.products.length"
      class="flex justify-center items-center text-3xl gap-5 pt-8"
    >
      <i
        @click="prevPage"
        class="pi pi-arrow-circle-left cursor-pointer"
        :class="{ 'text-slate-300 cursor-not-allowed': currentPage === 1 }"
      ></i>
      <span class="text-sm">Page {{ currentPage }} from {{ totalPages }}</span>
      <i
        @click="nextPage"
        class="pi pi-arrow-circle-right cursor-pointer"
        :class="{
          'text-slate-300 cursor-not-allowed': currentPage === totalPages,
        }"
      ></i>
    </div>
  </main>
</template>
