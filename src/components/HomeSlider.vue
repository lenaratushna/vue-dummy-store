<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import { useRouter } from 'vue-router'
import BaseButton from './ui/BaseButton.vue'

const router = useRouter()

const modules = [Pagination, Autoplay]

const slides = [
  {
    slug: 'mobile-accessories',
    imgSrc: 'images/mobile-accessories.jpg',
    title: 'Mobile Must-Haves',
  },
  {
    slug: 'sunglasses',
    imgSrc: 'images/sunglasses.jpg',
    title: 'Stylish Sunglasses',
  },
  {
    slug: 'fragrances',
    imgSrc: 'images/fragrances.jpg',
    title: 'Essence of Fragrance',
  },
]

const goTo = slug => {
  router.push(`/category/${slug}`)
}
</script>

<template>
  <div>
    <swiper
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 10000,
        disableOnInteraction: false,
      }"
      :speed="1500"
      :loop="true"
      :modules="modules"
    >
      <swiper-slide v-for="slide in slides" :key="slide.slug">
        <img
          :src="slide.imgSrc"
          :alt="slide.title"
          class="absolute top-0 left-0 object-cover -z-10 w-full h-full"
        />
        <div class="overlay"></div>
        <div class="relative p-10 sm:p-20 z-10">
          <div class="text-white text-3xl sm:text-4xl mb-4">
            {{ slide.title }}
          </div>
          <BaseButton @click="goTo(slide.slug)">Shop Now</BaseButton>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  z-index: 1;
}

.swiper-slide {
  display: flex;
  align-items: center;
}

.swiper-pagination-bullets {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination-bullet {
  width: 9px;
  height: 9px;
  background: #fff;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  width: 16px;
  height: 16px;
  border: 1px solid #fff;
  background: transparent;
}
</style>
