<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isExpanded = ref(false)

const products = ref([
  {
    id: 1,
    title: 'Круассан с соусом песто',
    description: 'Слоёное тесто с ароматным соусом песто и лёгкой ноткой адыгейского сыра.',
    price: '320 ₽',
    image: 'croissant_pesto.webp',
    isNew: true
  },
  {
    id: 2,
    title: 'Ореховая тарталетка',
    description: 'Хрустящая тарталетка с нежной ореховой начинкой.',
    price: '340 ₽',
    image: 'tartaletka.webp',
    isNew: false
  },
  {
    id: 3,
    title: 'Сырники Жак-Андрэ',
    description: 'Нежные творожные сырники по нашей семейной рецептуре.',
    price: '280 ₽',
    image: 'sirnik.webp',
    isNew: false
  },
  {
    id: 4,
    title: 'Клаб-сэндвич',
    description: 'Тёплый клаб с хрустящими овощами и домашним соусом — с душой к гостю.',
    price: '480 ₽',
    image: 'club_sandwich.webp',
    isNew: false
  },
  {
    id: 5,
    title: 'Круассан с лососем',
    description: 'Слоёный круассан с копчёным лососем и кремом из адыгейского сыра.',
    price: '360 ₽',
    image: 'croissant_losos.webp',
    isNew: false
  },
  {
    id: 6,
    title: 'Ачма с курицей',
    description: 'Традиционная ачма с сочной куриной начинкой — блюдо родовых традиций.',
    price: '420 ₽',
    image: 'achma_kurica.webp',
    isNew: false
  },
  {
    id: 7,
    title: 'Фирменный торт «Жак Андре»',
    description: 'Авторский торт от шеф-кондитера с деликатными слоями крема и бисквита.',
    price: '450 ₽',
    image: 'tort_zhak_andre.webp',
    isNew: false
  },
  {
    id: 8,
    title: 'Карамельный торт',
    description: 'Насыщенные карамельные слои со сливочным кремом, покрытые нежной крошкой и дополненные хрустящим декором.',
    price: '420 ₽',
    image: 'tort_caramel.webp',
    isNew: false
  }
])

const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

const displayedMenu = computed(() => (isExpanded.value ? products.value : products.value.slice(0, 4)))

const buttonText = computed(() => (isExpanded.value ? 'ПОСМОТРЕТЬ ПОЛНОЕ МЕНЮ' : 'ПОСМОТРЕТЬ МЕНЮ'))

const handleButtonClick = () => {
  if (!isExpanded.value) {
    isExpanded.value = true
  } else {
    router.push('/menu')
  }
}
</script>

<template>
  <section class="bg-[#FDFBF7] py-16 md:py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16 space-y-3">
        <h2 class="text-[#4B2307] font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide">
          НАША ГОРДОСТЬ
        </h2>
        <p class="text-[#7E4B30] font-sans text-xs md:text-sm tracking-widest uppercase">
          Каждый день, с душой — в сердце Адыгеи.
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-16">
        <div
          v-for="product in displayedMenu"
          :key="product.id"
          class="bg-[#F5F0E8] group cursor-pointer"
        >
          <!-- Image Container with NEW Badge -->
          <div class="relative overflow-hidden">
            <!-- NEW Badge -->
            <div
              v-if="product.isNew"
              class="absolute top-3 left-3 bg-[#2C1B11] text-[#FDFBF7] font-sans text-xs tracking-widest uppercase px-3 py-1 z-10"
            >
              НОВИНКА
            </div>

            <!-- Product Image -->
            <div class="aspect-square overflow-hidden">
              <img
                :src="getImageUrl(product.image)"
                :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-6 space-y-3">
            <!-- Title -->
            <h3 class="text-[#4B2307] font-serif text-lg md:text-xl tracking-wide">
              {{ product.title }}
            </h3>

            <!-- Description -->
            <p class="text-[#4B2307]/70 font-sans text-sm tracking-wide leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Price -->
            <p class="text-[#4B2307] font-sans text-base md:text-lg tracking-wider font-semibold">
              {{ product.price }}
            </p>
          </div>
        </div>
      </div>

      <!-- View Full Menu Button -->
      <div class="text-center">
        <button
          @click="handleButtonClick"
          class="bg-transparent text-[#4B2307] font-sans text-sm tracking-widest uppercase px-10 py-4 border border-[#4B2307] hover:bg-[#2C1B11] hover:text-[#FDFBF7] transition-all duration-300 ease-in-out cursor-pointer"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
