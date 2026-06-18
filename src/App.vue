<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import { RouterView } from 'vue-router'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <HeaderSection />
  <main class="flex-grow">
    <RouterView />
  </main>
  <FooterSection />
</template>