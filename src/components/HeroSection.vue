<script setup>
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import heroImage from '@/assets/images/entry_to_cafe.webp'

const scrollToSignatures = () => {
  const element = document.getElementById('signatures')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <!-- Hero Banner only -->
  <section class="relative flex items-center justify-center min-h-[60vh]">
    <!-- Background Image with Dark Overlay -->
    <div class="absolute inset-0">
      <img
        :src="heroImage"
        alt=""
        fetchpriority="high"
        loading="eager"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover object-[center_top_60%]"
      />
      <div class="absolute inset-0 bg-espresso/75"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 flex flex-col items-center text-center justify-center px-6 py-16 md:py-24 space-y-6 md:space-y-8">
      <span class="font-serif font-normal text-xs md:text-sm uppercase tracking-[0.2em] text-white/80">
        Ремесленная пекарня и кафе
      </span>

      <h1 class="text-cream font-serif font-normal text-4xl md:text-6xl lg:text-7xl tracking-wide leading-tight max-w-3xl uppercase">
        Традиции семьи<br class="hidden md:block" /> и вкуса
      </h1>

      <button
        @click="scrollToSignatures"
        class="group flex items-center justify-center bg-cream text-chocolate font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-espresso hover:text-cream transition-all duration-300 ease-in-out cursor-pointer"
      >
        <span>ПОСМОТРЕТЬ УГОЩЕНИЯ</span>
        <ArrowRight :size="18" class="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </button>
    </div>

    <!-- Bouncing Down Arrow -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown :size="24" class="text-cream" />
    </div>
  </section>
</template>

<style scoped>
</style>
