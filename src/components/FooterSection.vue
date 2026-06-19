<script setup>
import { Instagram, Send } from 'lucide-vue-next'

const telegramUrl = 'https://t.me/jacques_andre'

const cafeLocations = [
  {
    address: 'Пролетарская ул., 449, Майкоп',
    hours: 'Пн-Вс: 08:00 — 20:00',
  },
  {
    address: 'Первомайская ул., 193, Майкоп',
    hours: 'Пн-Вс: 08:00 — 20:00',
  },
  {
    address: 'Шоссейная ул., 1В, Майкоп (1 этаж)',
    hours: 'Пн-Вс: 08:00 — 20:00',
  },
]

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}
</script>

<template>
  <footer class="bg-[#FDFBF7] border-t border-[#2C1B11]/10">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

        <!-- Left Column: Loyalty Program -->
        <div class="space-y-6">
          <h2 class="font-serif text-3xl md:text-4xl text-[#4B2307] tracking-wide">
            СТАНЬТЕ ЧАСТЬЮ НАШЕЙ БОЛЬШОЙ СЕМЬИ
          </h2>

          <p class="text-[#4B2307]/70 font-sans text-sm leading-relaxed max-w-md">
            Присоединяйтесь к нашей программе лояльности в приложении SWiP! Копите баллы, получайте динамические грейды и обменивайте бонусы на любимую французскую выпечку.
          </p>

          <div class="pt-2">
            <a
              href="https://www.swip.one"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-8 py-3 border border-[#4B2307] text-[#4B2307] font-sans text-xs tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-[#2C1B11] hover:text-[#FDFBF7]"
            >
              Скачать приложение SWiP
            </a>
          </div>
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
          <div class="pt-2 space-y-4">
            <router-link
              to="/locations"
              class="inline-block text-[#7E4B30] font-sans text-xs tracking-widest uppercase font-semibold hover:opacity-70 transition-all duration-300 ease-in-out"
            >
              АДРЕС И ЧАСЫ РАБОТЫ
            </router-link>

            <ul class="space-y-2">
              <li
                v-for="(location, index) in cafeLocations"
                :key="index"
                class="text-[#4B2307]/60 font-sans text-xs leading-relaxed"
              >
                {{ location.address }}
                <span class="text-[#4B2307]/45">({{ location.hours }})</span>
              </li>
            </ul>
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
              :href="telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              СВЯЖИТЕСЬ С НАМИ
            </a>
            <a
              href="#"
              class="text-[#7E4B30]/70 font-sans text-xs tracking-widest uppercase hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
            >
              ЧАСТЫЕ ВОПРОСЫ
            </a>
          </nav>

          <!-- Center: Social Media Icons -->
          <div class="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/jacques_andre_/"
              class="text-[#7E4B30]/70 hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
              aria-label="Инстаграм"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram :size="20" />
            </a>
            <a
              :href="telegramUrl"
              class="text-[#7E4B30]/70 hover:text-[#7E4B30] transition-all duration-300 ease-in-out"
              aria-label="Телеграм"
              target="_blank"
              rel="noopener noreferrer"
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
