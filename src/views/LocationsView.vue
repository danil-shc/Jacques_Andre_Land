<template>
  <section class="bg-[#FDFBF7] py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4B2307] mb-4">
          НАШИ ПЕКАРНИ
        </h1>
        <p class="font-sans text-xs md:text-sm tracking-widest uppercase text-[#7E4B30]">
          ЖДЕМ ВАС В ГОСТИ КАЖДЫЙ ДЕНЬ
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <article
          v-for="location in locations"
          :key="location.id"
          class="bg-white/40 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-[#2C1B11]/5 relative">
            <img
              v-if="location.image"
              :src="location.image"
              :alt="location.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F5EFE6]"
            >
              <span class="font-serif text-6xl text-[#4B2307]/10">JA</span>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <h2 class="font-serif text-xl md:text-2xl text-[#4B2307] leading-tight">
              {{ location.title }}
            </h2>

            <div class="space-y-3 text-[#4B2307]/80 text-sm">
              <div class="flex items-start gap-3">
                <MapPin :size="20" class="mt-0.5 flex-shrink-0" />
                <span>{{ location.address }}</span>
              </div>

              <div class="flex items-center gap-3">
                <Clock :size="20" class="flex-shrink-0" />
                <span>{{ location.hours }}</span>
              </div>

              <div class="flex items-center gap-3">
                <Phone :size="20" class="flex-shrink-0" />
                <a
                  :href="`tel:${location.phone.replace(/[\s()-]/g, '')}`"
                  class="hover:text-[#4B2307] transition-colors duration-300"
                >
                  {{ location.phone }}
                </a>
              </div>
            </div>

            <a
              :href="location.mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full mt-6 py-3 px-6 text-center border border-[#4B2307] text-[#4B2307] font-sans text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#2C1B11] hover:text-[#FDFBF7]"
            >
              ПРОЛОЖИТЬ МАРШРУТ
            </a>
          </div>
        </article>
      </div>

      <div class="text-center py-12 border-t border-[#2C1B11]/10">
        <p class="font-sans text-xs md:text-sm tracking-widest uppercase text-[#7E4B30]">
          ТРАДИЦИИ КАВКАЗСКОГО ГОСТЕПРИИМСТВА В КАЖДОЙ ДЕТАЛИ ИНТЕРЬЕРА
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { MapPin, Clock, Phone } from 'lucide-vue-next'

const locations = reactive([
  {
    id: 1,
    title: 'Пекарня & Кофейня Жак-Андрэ',
    address: 'Пролетарская ул., 449, Майкоп',
    phone: '+7 (953) 093-88-34',
    hours: 'Ежедневно с 08:00 до 20:00',
    image: new URL('@/assets/images/proletarskaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Пролетарская+449+Жак-Андрэ'
  },
  {
    id: 2,
    title: 'Кондитерский Магазин Жак-Андрэ',
    address: 'Первомайская ул., 193, Майкоп',
    phone: '+7 (900) 246-20-50',
    hours: 'Ежедневно с 08:00 до 20:00',
    image: new URL('@/assets/images/pervomaiskaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Первомайская+193+Жак-Андрэ'
  },
  {
    id: 3,
    title: 'Пекарня & Кофейня Жак-Андрэ',
    address: 'Шоссейная ул., 1В, Майкоп (1 этаж)',
    phone: '+7 (953) 078-45-98',
    hours: 'Ежедневно с 08:00 до 20:00',
    image: new URL('@/assets/images/schoseinaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Шоссейная+1В+Жак-Андрэ'
  }
])
</script>

<style scoped>
</style>