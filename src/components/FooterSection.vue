<script setup>
import { Instagram, Send } from 'lucide-vue-next'

const telegramUrl = 'https://t.me/jacques_andre'
const appStoreUrl = 'https://apps.apple.com/ru/app/swip/id1261276105'
const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.it.swip'

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
  <footer class="bg-cream border-t border-espresso/10">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

        <!-- Left Column: Loyalty Program -->
        <div class="space-y-6">
          <h2 class="font-serif font-normal text-3xl md:text-4xl text-chocolate tracking-wide">
            СТАНЬТЕ ЧАСТЬЮ НАШЕЙ БОЛЬШОЙ СЕМЬИ
          </h2>

          <p class="text-chocolate/70 font-sans font-normal text-sm leading-relaxed max-w-md">
            Присоединяйтесь к нашей программе лояльности в приложении SWiP! Копите баллы и с выгодой обменивайте бонусы на любимую французскую выпечку!
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              :href="appStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center sm:justify-start gap-3 px-6 py-3 border border-caramel text-caramel font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-espresso hover:text-cream"
            >
              <svg
                class="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Скачать в App Store
            </a>

            <a
              :href="googlePlayUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center sm:justify-start gap-3 px-6 py-3 border border-caramel text-caramel font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-espresso hover:text-cream"
            >
              <svg
                class="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              Скачать в Google Play
            </a>
          </div>
        </div>

        <!-- Right Column: OUR CAFE -->
        <div class="space-y-6">
          <h2 class="font-serif font-normal text-3xl md:text-4xl text-chocolate tracking-wide">
            ДОРОГИЕ ГОСТИ
          </h2>

          <p class="text-chocolate/70 font-sans font-normal text-sm leading-relaxed">
            Приглашаем в наши ремесленные пекарни в сердце Адыгеи.
          </p>

          <!-- Address Label -->
          <div class="pt-2 space-y-4">
            <p class="inline-block text-caramel font-sans font-semibold text-xs tracking-widest uppercase">
              АДРЕСА И ЧАСЫ РАБОТЫ
            </p>

            <ul class="space-y-2">
              <li
                v-for="(location, index) in cafeLocations"
                :key="index"
                class="text-chocolate/60 font-sans font-normal text-xs leading-relaxed"
              >
                {{ location.address }}
                <span class="text-chocolate/45">({{ location.hours }})</span>
              </li>
            </ul>
          </div>

          <!-- Brand Emblem -->
          <div class="flex items-center space-x-4 pt-6">
            <img :src="getImageUrl('bakery.svg')" alt="Jacques-André" class="w-12 h-12" />
            <p class="text-chocolate/70 font-sans font-normal text-xs tracking-wider uppercase leading-relaxed">
              JACQUES-ANDRÉ — ХРАНИТЕЛЬ РОДОВЫХ ТРАДИЦИЙ И МАСТЕРСТВА.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Sub-Footer Bar -->
    <div class="border-t border-espresso/10">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          <!-- Left: Navigation Links -->
          <nav class="flex items-center flex-wrap justify-center md:justify-start gap-6">
            <a
              :href="telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-caramel/70 font-sans font-normal text-[10px] tracking-widest uppercase hover:text-caramel transition-all duration-300 ease-in-out"
            >
              СВЯЖИТЕСЬ С НАМИ
            </a>
            <a
              href="#"
              class="text-caramel/70 font-sans font-normal text-[10px] tracking-widest uppercase hover:text-caramel transition-all duration-300 ease-in-out"
            >
              ЧАСТЫЕ ВОПРОСЫ
            </a>
          </nav>

          <!-- Center: Social Media Icons -->
          <div class="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/jacques_andre_/"
              class="text-caramel/70 hover:text-caramel transition-all duration-300 ease-in-out"
              aria-label="Инстаграм"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram :size="20" />
            </a>
            <a
              :href="telegramUrl"
              class="text-caramel/70 hover:text-caramel transition-all duration-300 ease-in-out"
              aria-label="Телеграм"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send :size="20" />
            </a>
          </div>

          <!-- Right: Copyright -->
          <p class="text-caramel/70 font-sans font-normal text-[10px] tracking-wider uppercase">
            © JACQUES-ANDRÉ 2026 | СОЗДАНО С ДУШОЙ
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
