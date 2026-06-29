<script setup>
import { provide } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import SignaturesSection from '@/components/SignaturesSection.vue'
import CategoriesSection from '@/components/CategoriesSection.vue'
import ManifestoSection from '@/components/ManifestoSection.vue'

provide('productCardShowcase', true)
</script>

<template>
  <HeroSection />
  <SignaturesSection id="signatures" />
  <CategoriesSection />
  <ManifestoSection />
</template>

<style scoped>
</style>