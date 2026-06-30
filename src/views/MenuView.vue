<template>

  <div class="min-h-screen bg-cream">

    <div class="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-12">

      <div class="mb-5 md:mb-10">

        <input

          v-model="searchQuery"

          type="text"

          placeholder="Поиск выпечки, десертов и напитков"

          class="w-full bg-transparent border-b border-chocolate text-chocolate placeholder:text-chocolate/40 py-2.5 md:py-3 px-1 text-sm md:text-lg font-sans tracking-wider focus:outline-none focus:border-chocolate transition-all duration-300"

        />

      </div>



      <div class="flex flex-wrap gap-3 md:gap-6 mb-6 md:mb-12 border-b border-caramel/20 pb-2">

        <button

          v-for="category in categories"

          :key="category"

          @click="selectedCategory = category"

          :class="[

            'group relative font-sans font-normal text-[10px] md:text-sm tracking-widest uppercase pb-2 transition-colors duration-300 ease-in-out cursor-pointer',

            selectedCategory === category

              ? 'text-caramel'

              : 'text-caramel/50 hover:text-[#3D2314]'

          ]"

        >

          {{ category }}

          <span 

            class="absolute bottom-0 left-0 h-[1.5px] bg-[#3D2314] transition-all duration-300 ease-in-out"

            :class="selectedCategory === category ? 'w-full !bg-caramel' : 'w-0 group-hover:w-full'"

          ></span>

        </button>

      </div>



      <div class="menu-products grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-10 md:mb-24">

        <ProductCard

          v-for="product in filteredProducts"

          :key="product.id"

          :product="product"

          :image-url="product.image ? getImageUrl(product.image) : null"

        />

      </div>

    </div>

  </div>

</template>



<script setup>

import { ref, computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import { allMenuProducts } from '@/data/products'

import ProductCard from '@/components/ProductCard.vue'



const route = useRoute()



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



const categories = [

  'ВСЕ',

  'Выпечка',

  'Десерты',

  'ГОРЯЧИЕ НАПИТКИ'

]



const categoryOrder = {

  'Выпечка': 1,

  'Десерты': 2,

  'ГОРЯЧИЕ НАПИТКИ': 3,

}



const selectedCategory = ref('ВСЕ')

const searchQuery = ref('')



const allProducts = allMenuProducts



const filteredProducts = computed(() => {

  let filtered = allProducts



  if (selectedCategory.value !== 'ВСЕ') {

    filtered = filtered.filter(p => p.category === selectedCategory.value)

  }



  if (searchQuery.value.trim()) {

    const query = searchQuery.value.toLowerCase()

    filtered = filtered.filter(p => {

      const matchesBase =

        p.name.toLowerCase().includes(query) ||

        p.description.toLowerCase().includes(query)



      if (matchesBase) return true



      return p.variants?.some(variant =>

        variant.volume.toLowerCase().includes(query) ||

        String(variant.price).includes(query)

      )

    })

  }



  if (selectedCategory.value === 'ВСЕ') {

    filtered = [...filtered].sort((a, b) => {

      const orderA = categoryOrder[a.category] ?? 99

      const orderB = categoryOrder[b.category] ?? 99



      if (orderA !== orderB) return orderA - orderB



      return allProducts.indexOf(a) - allProducts.indexOf(b)

    })

  }



  return filtered

})



const categoryMapping = {

  'cakes': 'Десерты',

  'baking': 'Выпечка',

  'hearty': 'Выпечка',

  'breakfast': 'Выпечка',

}



onMounted(() => {

  const categoryQuery = route.query.category

  if (categoryQuery && categoryMapping[categoryQuery]) {

    selectedCategory.value = categoryMapping[categoryQuery]

  }

})

</script>



<style scoped>

@media (max-width: 767px) {

  .menu-products :deep(.product-card__stepper-slot) {

    height: 1.75rem;

    min-width: 1.75rem;

  }



  .menu-products :deep(.product-card__add-btn) {

    width: 1.75rem;

    height: 1.75rem;

  }



  .menu-products :deep(.product-card__add-btn svg) {

    width: 0.875rem !important;

    height: 0.875rem !important;

  }



  .menu-products :deep(.product-card__stepper) {

    height: 1.75rem;

    box-shadow: 0 1px 4px rgba(44, 27, 17, 0.06);

  }



  .menu-products :deep(.product-card__stepper-btn) {

    width: 1.375rem;

    height: 1.75rem;

  }



  .menu-products :deep(.product-card__stepper-btn svg) {

    width: 0.75rem !important;

    height: 0.75rem !important;

  }



  .menu-products :deep(.product-card__stepper-count) {

    min-width: 1rem;

    padding-inline: 0;

    font-size: 0.75rem;

    line-height: 1;

    letter-spacing: 0.04em;

  }

}

</style>


