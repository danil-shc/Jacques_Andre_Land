<script setup>
import { ref } from 'vue'
import { Instagram, Send } from 'lucide-vue-next'

const email = ref('')

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribing email:', email.value)
    email.value = ''
  }
}
</script>

<template>
  <footer class="bg-[#FDFBF7] border-t border-[#2C1B11]/10">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
        
        <!-- Left Column: JOIN THE CLUB -->
        <div class="space-y-6">
          <h2 class="font-serif text-3xl md:text-4xl text-[#4B2307] tracking-wide">
            СТАНЬТЕ ЧАСТЬЮ НАШЕЙ БОЛЬШОЙ СЕМЬИ
          </h2>
          
          <p class="text-[#4B2307]/70 font-sans text-sm leading-relaxed max-w-md">
            Подпишитесь, чтобы получать семейные привилегии, новости сезонного меню и приглашения на наши дегустации.
          </p>
          
          <!-- Email Subscription Form -->
          <form @submit.prevent="handleSubscribe" class="relative max-w-md pt-4">
            <input
              v-model="email"
              type="email"
              placeholder="Ваш e-mail"
              required
              class="w-full bg-transparent border-0 border-b border-[#4B2307]/30 text-[#4B2307] font-sans text-sm py-3 pr-12 placeholder:text-[#4B2307]/40 focus:outline-none focus:border-[#4B2307] transition-all duration-300 ease-in-out"
            />
            <button
              type="submit"
              class="absolute right-0 top-4 bottom-0 text-[#4B2307] hover:opacity-70 transition-all duration-300 ease-in-out text-lg cursor-pointer"
              aria-label="Подписаться"
            >
              →
            </button>
          </form>
        </div>

        <!-- Right Column: OUR CAFE -->
        <div class="space-y-6">
          <h2 class="font-serif text-3xl md:text-4xl text-[#4B2307] tracking-wide">
            НАШЕ КАФЕ
          </h2>
          
          <p class="text-[#4B2307]/70 font-sans text-sm leading-relaxed">
            Приглашаем в нашу ремесленную пекарню и кофейню в сердце Майкопа.
          </p>
          
          <!-- Address Link -->
          <div class="pt-2">
            <a
              href="#"
              class="inline-block text-[#7E4B30] font-sans text-xs tracking-widest uppercase font-semibold hover:opacity-70 transition-all duration-300 ease-in-out"
            >
              АДРЕС И ЧАСЫ РАБОТЫ
            </a>
          </div>

           <!-- Brand Emblem -->
          <div class="flex items-center space-x-4 pt-6">
            <img :src="getImageUrl('bakery.svg')" alt="Jacques-André" class="w-12 h-12" />
            <p class="text-[#4B2307]/70 font-sans text-xs tracking-wider uppercase leading-relaxed">
              JACQUES-ANDRÉ — ХРАНИТЕЛЬ РОДОВЫХ ТРАДИЦИЙ И МАСТЕРСТВА.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Sub-Footer Bar -->
    <div class="border-t border-[#2C1B11]/10">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          <!-- Left: Navigation Links -->
          <nav class="flex items-center flex-wrap justify-center md:justify-start gap-6">
            <a
              href="#"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              СВЯЖИТЕСЬ С НАМИ
            </a>
            <a
              href="#"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              ДОСТАВКА
            </a>
            <a
              href="#"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              ЧАСТЫЕ ВОПРОСЫ
            </a>
            <a
              href="#"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              ПРАВОВЫЕ УСЛОВИЯ
            </a>
          </nav>

          <!-- Center: Social Media Icons -->
          <div class="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/jacques_andre_/"
              class="text-[#7E4B30]/70 hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
              aria-label="Инстаграм" target="_blank"
            >
              <Instagram :size="20" />
            </a>
            <a
              href="https://t.me/jacques_andre"
              class="text-[#7E4B30]/70 hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
              aria-label="Телеграм" target="_blank"
            >
              <Send :size="20" />
            </a>
          </div>

          <!-- Right: Copyright -->
          <p class="text-[#7E4B30]/70 font-sans text-xs tracking-wider uppercase">
            © JACQUES-ANDRÉ 2026 | СОЗДАНО С ДУШОЙ
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
