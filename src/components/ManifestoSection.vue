<script setup>
const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}
</script>

<template>
  <section class="w-full bg-cream py-16 md:py-24">
    <div class="max-w-[1920px] mx-auto px-4 md:px-8 space-y-16">
      <!-- Section Header -->
      <div class="text-center">
        <h2 class="font-serif font-normal text-3xl md:text-4xl lg:text-5xl text-chocolate tracking-widest uppercase">
          НАШИ ОБЫЧАИ
        </h2>
      </div>

      <!-- Split Content Block: Image + Dark Box -->
      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-0">
        <!-- Left: Premium Image with Gradient Overlay on Mobile -->
        <div class="relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
          <img
            :src="getImageUrl('vibe_2')"
            alt="Jacques André Interior"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <!-- Gradient overlay for better text readability if needed on mobile -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-espresso/20 lg:hidden"></div>
        </div>

        <!-- Right: Dark Chocolate Box with Enhanced Tablet and Mobile Spacing -->
        <div class="bg-espresso min-h-[450px] md:min-h-[500px] lg:h-[500px] flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-12 space-y-6 md:space-y-8">
          <!-- Title -->
          <h3 class="font-serif font-normal text-2xl md:text-3xl lg:text-4xl text-cream tracking-wide leading-tight">
            В СЕРДЦЕ АДЫГЕИ
          </h3>

          <!-- Paragraph 1 -->
          <p class="font-sans font-light text-sm md:text-base lg:text-base text-cream/90 leading-relaxed">
            В «Жак Андре» мы верим в бескомпромиссное стремление к вкусу. Наша пекарня — дань французскому кулинарному наследию, укорененному в богатых почвах нашего региона. Каждый круассан слоится с точностью, каждый кусочек наполнен смыслом.
          </p>

          <!-- Paragraph 2 -->
          <p class="font-sans font-light text-sm md:text-base lg:text-base text-cream/90 leading-relaxed">
            Мы тщательно отбираем ингредиенты: местные адыгейские молочные продукты легко сочетаются с шоколадом и экологичной мукой. Это повседневная роскошь, созданная вручную.
          </p>

          <!-- CTA Button -->
          <div class="pt-4">
            <button 
              class="border border-cream text-cream font-sans font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:bg-cream hover:text-chocolate transition-all duration-300 ease-in-out cursor-pointer"
            >
              УЗНАТЬ ИСТОРИЮ
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Service Features: Full-Width Top Border with Centered Content -->
    <div class="w-full border-t border-espresso/10 mt-16 md:mt-24 pt-16">
      <div class="max-w-[1600px] mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <!-- Column 1: ДОСТАВКА -->
          <div class="text-center space-y-3 px-4">
            <h4 class="font-sans font-semibold text-xs tracking-widest uppercase text-caramel">
              ДОСТАВКА
            </h4>
            <p class="font-sans font-normal text-sm text-chocolate/80 leading-relaxed">
              Свежая выпечка с почтением доставляется по всему Майкопу. Бесплатная доставка при заказе от 2500 ₽.
            </p>
          </div>

          <!-- Column 2: ПРЕДЗАКАЗ -->
          <div class="text-center space-y-3 px-4">
            <h4 class="font-sans font-semibold text-xs tracking-widest uppercase text-caramel">
              ПРЕДЗАКАЗ
            </h4>
            <p class="font-sans font-normal text-sm text-chocolate/80 leading-relaxed">
              Забронируйте премиальные торты и коллекции кондитерских изделий заранее — требуется уведомление за 24 часа.
            </p>
          </div>

          <!-- Column 3: ЗАБРАТЬ САМОМУ -->
          <div class="text-center space-y-3 px-4">
            <h4 class="font-sans font-semibold text-xs tracking-widest uppercase text-caramel">
              ЗАБРАТЬ САМОМУ
            </h4>
            <p class="font-sans font-normal text-sm text-chocolate/80 leading-relaxed">
              Закажите онлайн и заберите прямо из нашей пекарни на Пролетарской улице — с заботой и быстро.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
