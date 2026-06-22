<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import { RouterView } from 'vue-router'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderSection />
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>