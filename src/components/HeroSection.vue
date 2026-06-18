<script setup>
import { ChevronDown } from 'lucide-vue-next'

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

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
    <div
      class="absolute inset-0 bg-cover bg-[center_top_60%]"
      :style="{ backgroundImage: `url(${getImageUrl('entry_to_cafe')})` }"
    >
      <div class="absolute inset-0 bg-[#2C1B11]/75"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 text-center px-6 py-16 md:py-24 space-y-8">
      <!-- Subtitle -->
      <p class="text-[#FDFBF7] font-sans text-sm md:text-base tracking-widest uppercase">
        Ремесленная пекарня и кафе
      </p>

      <!-- Main Heading -->
      <h2 class="text-[#FDFBF7] font-serif text-4xl md:text-6xl lg:text-7xl tracking-wide leading-tight max-w-4xl mx-auto">
        ТРАДИЦИИ СЕМЬИ<br />И ВКУСА
      </h2>

      <!-- CTA Button -->
      <div class="pt-4">
        <button @click="scrollToSignatures" class="bg-[#FDFBF7] text-[#4B2307] font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#2C1B11] hover:text-[#FDFBF7] transition-all duration-300 ease-in-out cursor-pointer">
          ПОСМОТРЕТЬ УГОЩЕНИЯ →
        </button>
      </div>
    </div>

    <!-- Bouncing Down Arrow -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown :size="24" class="text-[#FDFBF7]" />
    </div>
  </section>
</template>

<style scoped>
</style>
