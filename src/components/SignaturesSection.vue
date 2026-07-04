<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getFeaturedProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const isExpanded = ref(false)

const products = ref(getFeaturedProducts())

const menuImages = import.meta.glob(
  '../assets/images/**/*.webp',
  { eager: true, query: '?url', import: 'default' }
)

const getImageUrl = (imageName) => {
  if (!imageName) return null

  const fileName = imageName.includes('.') ? imageName : `${imageName}.webp`
  const path = fileName.includes('_coffee.')
    ? `../assets/images/coffee/${fileName}`
    : `../assets/images/${fileName}`

  return menuImages[path] ?? null
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
  <section class="bg-cream py-8 md:py-24 px-4 md:px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-6 md:mb-16 space-y-2 md:space-y-3">
        <h2 class="text-chocolate font-serif font-normal text-2xl md:text-4xl lg:text-5xl tracking-wide">
          НАША ГОРДОСТЬ
        </h2>
        <p class="text-caramel font-sans font-normal text-xs md:text-sm tracking-widest uppercase">
          Каждый день, с душой — в сердце Адыгеи.
        </p>
      </div>

      <div class="signatures-products grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-6 md:mb-16">
        <ProductCard
          v-for="product in displayedMenu"
          :key="product.id"
          :product="product"
          :image-url="product.image ? getImageUrl(product.image) : null"
        />
      </div>

      <div class="text-center">
        <button
          @click="handleButtonClick"
          class="bg-transparent text-chocolate font-sans font-semibold text-xs md:text-sm tracking-widest uppercase px-6 py-3 md:px-10 md:py-4 border border-chocolate hover:bg-espresso hover:text-cream transition-all duration-300 ease-in-out cursor-pointer"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 767px) {
  .signatures-products :deep(.product-card__stepper-slot) {
    height: 1.75rem;
    min-width: 1.75rem;
  }

  .signatures-products :deep(.product-card__add-btn) {
    width: 1.75rem;
    height: 1.75rem;
  }

  .signatures-products :deep(.product-card__add-btn svg) {
    width: 0.875rem !important;
    height: 0.875rem !important;
  }

  .signatures-products :deep(.product-card__stepper) {
    height: 1.75rem;
    box-shadow: 0 1px 4px rgba(44, 27, 17, 0.06);
  }

  .signatures-products :deep(.product-card__stepper-btn) {
    width: 1.375rem;
    height: 1.75rem;
  }

  .signatures-products :deep(.product-card__stepper-btn svg) {
    width: 0.75rem !important;
    height: 0.75rem !important;
  }

  .signatures-products :deep(.product-card__stepper-count) {
    min-width: 1rem;
    padding-inline: 0;
    font-size: 0.75rem;
    line-height: 1;
    letter-spacing: 0.04em;
  }
}
</style>
