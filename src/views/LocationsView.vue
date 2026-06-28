<template>
  <section class="bg-cream pt-16 md:pt-24 pb-12 md:pb-16">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate mb-4">
          НАШИ ПЕКАРНИ
        </h1>
        <p class="font-sans text-xs md:text-sm tracking-widest uppercase text-caramel">
          ЖДЕМ ВАС В ГОСТИ КАЖДЫЙ ДЕНЬ
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <article
          v-for="location in locations"
          :key="location.id"
          class="flex flex-col h-full bg-white/40 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-espresso/5 relative shrink-0">
            <img
              v-if="location.image"
              :src="location.image"
              :alt="location.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-card"
            >
              <span class="font-serif text-6xl text-chocolate/10">JA</span>
            </div>
          </div>

          <div class="flex flex-col flex-1 justify-between p-6">
            <div class="space-y-4">
              <h2 class="font-serif text-xl md:text-2xl text-chocolate leading-tight">
                {{ location.title }}
              </h2>

              <div class="space-y-3 text-chocolate/80 text-sm">
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
                    class="hover:text-chocolate transition-colors duration-300"
                  >
                    {{ location.phone }}
                  </a>
                </div>
              </div>
            </div>

            <a
              :href="location.mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full mt-6 py-3 px-6 text-center border border-chocolate text-chocolate font-sans text-xs tracking-widest uppercase transition-all duration-300 hover:bg-espresso hover:text-cream"
            >
              ПРОЛОЖИТЬ МАРШРУТ
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin, Clock, Phone } from 'lucide-vue-next'
import { bakeryLocations } from '@/data/locations'

const locations = bakeryLocations.map(({ id, title, address, phone, hoursDetailed, image, mapLink }) => ({
  id,
  title,
  address,
  phone,
  hours: hoursDetailed,
  image,
  mapLink,
}))
</script>