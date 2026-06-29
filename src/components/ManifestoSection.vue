<script setup>
import { Truck, Cake, Store } from 'lucide-vue-next'

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

const serviceFeatures = [
  {
    icon: Truck,
    title: 'ДОСТАВКА',
    description:
      'Свежая выпечка с почтением доставляется по всему Майкопу. Бесплатная доставка при заказе от 1500 ₽.',
  },
  {
    icon: Cake,
    title: 'ПРЕДЗАКАЗ',
    description:
      'Забронируйте премиальные торты и коллекции кондитерских изделий заранее — требуется уведомление за 24 часа.',
  },
  {
    icon: Store,
    title: 'ЗАБРАТЬ САМОМУ',
    description:
      'Закажите онлайн и заберите прямо из нашей пекарни на Пролетарской, Первомайской или Шоссейной улице — с заботой и быстро.',
  },
]
</script>

<template>
  <section class="w-full bg-cream py-8 md:py-24">
    <div class="max-w-[1920px] mx-auto px-4 md:px-8 space-y-8 md:space-y-16">
      <!-- Section Header -->
      <div class="text-center">
        <h2 class="font-serif font-normal text-2xl md:text-4xl lg:text-5xl text-chocolate tracking-widest uppercase">
          НАШИ ОБЫЧАИ
        </h2>
      </div>

      <!-- Split Content Block: Image + Dark Box -->
      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-0">
        <!-- Left: Premium Image with Gradient Overlay on Mobile -->
        <div class="relative h-[200px] md:h-[450px] lg:h-[500px] overflow-hidden">
          <img
            :src="getImageUrl('vibe_2')"
            alt="Jacques André Interior"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-espresso/20 lg:hidden"></div>
        </div>

        <!-- Right: Dark Chocolate Box -->
        <div class="bg-espresso lg:h-[500px] flex flex-col justify-center px-5 py-8 md:px-12 md:py-20 lg:px-16 lg:py-16">
          <div class="space-y-4 md:space-y-8 max-w-xl">
            <h3 class="font-serif font-normal text-xl md:text-3xl lg:text-4xl text-cream tracking-wide leading-tight">
              В СЕРДЦЕ АДЫГЕИ
            </h3>

            <p class="font-sans font-light text-sm md:text-base text-cream/90 leading-relaxed">
              В «Жак Андре» мы верим в бескомпромиссное стремление к вкусу. Наша пекарня — дань французскому кулинарному наследию, укорененному в богатых почвах нашего региона. Каждый круассан слоится с точностью, каждый кусочек наполнен смыслом.
            </p>

            <p class="font-sans font-light text-sm md:text-base text-cream/90 leading-relaxed hidden md:block">
              Мы тщательно отбираем ингредиенты: местные адыгейские молочные продукты легко сочетаются с шоколадом и экологичной мукой. Это повседневная роскошь, созданная вручную.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Features: 3-Column Manifesto Grid -->
    <div class="w-full border-t border-espresso/10 mt-8 md:mt-24 pt-8 md:pt-20 lg:pt-24">
      <div class="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10 lg:gap-16">
          <article
            v-for="feature in serviceFeatures"
            :key="feature.title"
            class="flex flex-col items-center text-center px-2 md:px-4 lg:px-6"
          >
            <div class="mb-3 md:mb-6 flex items-center justify-center">
              <component
                :is="feature.icon"
                :stroke-width="1"
                class="w-8 h-8 md:w-10 md:h-10 text-caramel"
                aria-hidden="true"
              />
            </div>

            <h4 class="font-sans font-semibold text-[11px] md:text-xs tracking-[0.25em] uppercase text-caramel mb-2 md:mb-5">
              {{ feature.title }}
            </h4>

            <p class="font-sans font-light text-sm md:text-[15px] text-[#1C1A17]/75 leading-relaxed md:leading-[1.75] max-w-[320px]">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
