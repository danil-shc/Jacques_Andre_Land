<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

const navigateToMenu = (categoryKey) => {
  router.push({ path: '/menu', query: { category: categoryKey } })
}
</script>

<template>
  <section class="w-full bg-cream py-4 md:py-16">
    <div class="w-full px-0">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div 
          @click="navigateToMenu('cakes')"
          class="group relative h-[240px] md:h-[500px] overflow-hidden cursor-pointer"
        >
          <div 
            class="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-105"
            :style="{ backgroundImage: `url(${getImageUrl('tort_zhak')})`, backgroundPosition: 'center 40%' }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>

          <div class="absolute bottom-0 left-0 p-5 md:p-10 z-10">
            <h2 class="font-serif font-normal text-3xl md:text-5xl text-white mb-2 md:mb-3 tracking-tight">
              Десерты
            </h2>
            <button 
              @click.stop="navigateToMenu('cakes')"
              class="inline-block font-sans font-normal text-xs tracking-widest uppercase text-white border-b border-white/60 pb-1 transition-all duration-300 ease-in-out hover:border-white hover:tracking-[0.25em] cursor-pointer"
            >
              Перейти
            </button>
          </div>
        </div>

        <div 
          @click="navigateToMenu('baking')"
          class="group relative h-[240px] md:h-[500px] overflow-hidden cursor-pointer"
        >
          <div 
            class="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-105"
            :style="{ backgroundImage: `url(${getImageUrl('vibe')})`, backgroundPosition: 'center 20%' }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>

          <div class="absolute bottom-0 left-0 p-5 md:p-10 z-10">
            <h2 class="font-serif font-normal text-3xl md:text-5xl text-white mb-2 md:mb-3 tracking-tight">
              Выпечка
            </h2>
            <button 
              @click.stop="navigateToMenu('baking')"
              class="inline-block font-sans font-normal text-xs tracking-widest uppercase text-white border-b border-white/60 pb-1 transition-all duration-300 ease-in-out hover:border-white hover:tracking-[0.25em] cursor-pointer"
            >
              Перейти
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>