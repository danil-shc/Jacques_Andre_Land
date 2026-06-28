<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getFeaturedProducts } from '@/data/products'

const router = useRouter()
const isExpanded = ref(false)

const products = ref(getFeaturedProducts())

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

const displayedMenu = computed(() => (isExpanded.value ? products.value : products.value.slice(0, 4)))

const buttonText = computed(() => (isExpanded.value ? 'ПОСМОТРЕТЬ ПОЛНОЕ МЕНЮ' : 'ПОСМОТРЕТЬ МЕНЮ'))

const handleButtonClick = () => {
  if (!isExpanded.value) {
    isExpanded.value = true
  } else {
    router.push('/menu')
  }
}
</script>

<template>
  <section class="bg-cream py-16 md:py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16 space-y-3">
        <h2 class="text-chocolate font-serif font-normal text-3xl md:text-4xl lg:text-5xl tracking-wide">
          НАША ГОРДОСТЬ
        </h2>
        <p class="text-caramel font-sans font-normal text-xs md:text-sm tracking-widest uppercase">
          Каждый день, с душой — в сердце Адыгеи.
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-16">
        <div
          v-for="product in displayedMenu"
          :key="product.id"
          class="bg-card group cursor-pointer"
        >
          <!-- Image Container with NEW Badge -->
          <div class="relative overflow-hidden">
            <!-- NEW Badge -->
            <div
              v-if="product.isNew"
              class="absolute top-3 left-3 bg-espresso text-cream font-sans text-xs tracking-widest uppercase px-3 py-1 z-10"
            >
              НОВИНКА
            </div>

            <!-- Product Image -->
            <div class="aspect-square overflow-hidden">
              <img
                :src="getImageUrl(product.image)"
                :alt="product.name"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-6 space-y-3">
            <!-- Title -->
            <h3 class="text-chocolate font-serif font-medium text-lg md:text-xl tracking-wide">
              {{ product.name }}
            </h3>

            <!-- Description -->
            <p class="text-chocolate/70 font-sans font-medium text-sm tracking-wide leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Price -->
            <p class="text-chocolate font-sans text-base md:text-lg tracking-wider font-semibold">
              {{ product.price }} ₽
            </p>
          </div>
        </div>
      </div>

      <!-- View Full Menu Button -->
      <div class="text-center">
        <button
          @click="handleButtonClick"
          class="bg-transparent text-chocolate font-sans font-semibold text-sm tracking-widest uppercase px-10 py-4 border border-chocolate hover:bg-espresso hover:text-cream transition-all duration-300 ease-in-out cursor-pointer"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
