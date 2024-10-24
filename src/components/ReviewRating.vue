<script setup>
import { computed } from 'vue'
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
})

const filledStars = computed(() => Array(props.rating).fill(0))
const emptyStars = computed(() => Array(props.maxStars - props.rating).fill(0))
</script>

<template>
  <div class="flex gap-2">
    <i
      v-for="star in filledStars"
      :key="'filled-' + star"
      class="pi pi-star-fill"
    ></i>
    <i v-for="star in emptyStars" :key="'empty-' + star" class="pi pi-star"></i>
  </div>
</template>
