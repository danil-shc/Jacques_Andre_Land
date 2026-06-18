<template>
  <div class="min-h-screen bg-[#FDFBF7]">
    <div class="max-w-7xl mx-auto px-6 py-8 md:py-12">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-2">
          <MapPin :size="20" class="text-[#7E4B30]" />
          <span class="text-sm md:text-base text-[#7E4B30] font-sans tracking-wide">Майкоп, ул. Пролетарская 449</span>
        </div>
      </div>

      <div class="mb-10">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск выпечки и десертов..."
          class="w-full bg-transparent border-b border-[#4B2307] text-[#4B2307] placeholder-[#4B2307] placeholder-opacity-40 py-3 px-1 text-base md:text-lg font-sans tracking-wider focus:outline-none focus:border-opacity-100 transition-all duration-300"
        />
      </div>

      <div class="flex flex-wrap gap-4 md:gap-6 mb-12 border-b border-[#7E4B30] border-opacity-20 pb-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'font-sans text-xs md:text-sm tracking-widest uppercase pb-2 border-b-2 transition-all duration-300 ease-in-out cursor-pointer',
            selectedCategory === category
              ? 'text-[#7E4B30] border-[#7E4B30] font-semibold'
              : 'text-[#7E4B30] text-opacity-50 border-transparent hover:text-opacity-80'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-white bg-opacity-40 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
        >
          <div v-if="product.image" class="aspect-square overflow-hidden bg-[#FDFBF7]">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div v-else class="aspect-square bg-gradient-to-br from-[#2C1B11] to-[#5D4037] flex items-center justify-center">
            <Bell :size="64" class="text-[#FDFBF7]" />
          </div>
          
          <div class="p-5 flex-grow flex flex-col">
            <h3 class="font-serif text-lg md:text-xl text-[#4B2307] mb-2">{{ product.name }}</h3>
            <p class="text-sm text-[#4B2307] text-opacity-70 mb-4 flex-grow leading-relaxed">{{ product.description }}</p>
            
            <div class="flex items-center justify-between mt-auto">
              <span class="font-sans text-lg font-semibold text-[#4B2307] tracking-wide">{{ product.price }} ₽</span>
              <button
                @click="addToCart(product)"
                class="w-10 h-10 rounded-full bg-[#2C1B11] text-[#FDFBF7] flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Plus :size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <div
        v-if="cartItems.length > 0"
        class="fixed bottom-0 left-0 right-0 bg-[#2C1B11] text-[#FDFBF7] shadow-2xl z-50"
      >
        <div class="max-w-7xl mx-auto px-6 py-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div class="flex-grow">
              <h3 class="font-sans text-xs tracking-widest uppercase mb-3 text-[#FDFBF7] text-opacity-70">Ваш заказ</h3>
              <div class="space-y-2 max-h-32 overflow-y-auto">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="font-serif">{{ item.name }}</span>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-6 h-6 rounded-full bg-[#FDFBF7] bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                      <span class="text-lg leading-none">−</span>
                    </button>
                    <span class="font-sans tracking-wide">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item)"
                      class="w-6 h-6 rounded-full bg-[#FDFBF7] bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                      <span class="text-lg leading-none">+</span>
                    </button>
                    <span class="font-sans tracking-wide ml-2">{{ item.price * item.quantity }} ₽</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-6 md:ml-12">
              <div class="text-right">
                <div class="font-sans text-xs tracking-widest uppercase text-[#FDFBF7] text-opacity-70 mb-1">Итого</div>
                <div class="font-serif text-2xl md:text-3xl">{{ totalPrice }} ₽</div>
              </div>
              <button
                @click="checkout"
                class="bg-[#FDFBF7] text-[#4B2307] px-6 md:px-8 py-3 md:py-4 font-sans text-xs md:text-sm tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/store/cart'
import { MapPin, Bell, Plus } from 'lucide-vue-next'

const route = useRoute()
const { cartItems, totalItems, totalPrice, addToCart: addToCartGlobal, increaseQuantity, decreaseQuantity, clearCart } = useCart()

const addToCart = (product) => {
  addToCartGlobal(product)
}

const getImageUrl = (name) => {
  const imageName = name ? (name.includes('.') ? name : `${name}.webp`) : null
  return imageName ? new URL(`../assets/images/${imageName}`, import.meta.url).href : null
}

const categories = [
  'ВСЕ',
  'КРУАССАНЫ',
  'ТОРТЫ И ПИРОЖНЫЕ',
  'СЫТНАЯ ВЫПЕЧКА & ЗАВТРАКИ',
  'ГОРЯЧИЕ НАПИТКИ'
]

const selectedCategory = ref('ВСЕ')
const searchQuery = ref('')

const products = [
  {
    id: 1,
    name: 'Круассан с лососем',
    description: 'Премиальный слоёный круассан с норвежским лососем, сливочным сыром и свежей зеленью',
    price: 420,
    category: 'КРУАССАНЫ',
    image: 'croissant_losos'
  },
  {
    id: 2,
    name: 'Круассан с соусом песто',
    description: 'Воздушный круассан с домашним соусом песто, вялеными томатами и моцареллой',
    price: 350,
    category: 'КРУАССАНЫ',
    image: 'croissant_pesto'
  },
  {
    id: 3,
    name: 'Торт "Амели"',
    description: 'Изысканный авторский торт с нежным кремом, свежими ягодами и миндальным бисквитом',
    price: 2800,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'tort_ameli'
  },
  {
    id: 4,
    name: 'Торт "Карамельный"',
    description: 'Многослойный торт с солёной карамелью, шоколадным муссом и хрустящим пралине',
    price: 3200,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'tort_caramel'
  },
  {
    id: 5,
    name: 'Торт "Фрезье"',
    description: 'Классический французский торт с фисташковым кремом, свежей клубникой и лёгким бисквитом',
    price: 3500,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'tort_frezie'
  },
  {
    id: 6,
    name: 'Торт "Jacques André"',
    description: 'Наш фирменный торт — воплощение элегантности и вкуса с премиальными ингредиентами',
    price: 4200,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'tort_zhak_andre'
  },
  {
    id: 7,
    name: 'Лимонная тарталетка',
    description: 'Хрустящая песочная корзинка с шелковистым лимонным кремом и меренгой',
    price: 280,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'limon_tartaletka'
  },
  {
    id: 8,
    name: 'Тарталетка ассорти',
    description: 'Миниатюрные французские тарталетки с различными начинками — набор из 4 штук',
    price: 950,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'tartaletka'
  },
  {
    id: 9,
    name: 'Макарон',
    description: 'Классические французские миндальные пирожные с нежными кремовыми начинками — набор из 6 штук',
    price: 720,
    category: 'ТОРТЫ И ПИРОЖНЫЕ',
    image: 'makaronc'
  },
  {
    id: 10,
    name: 'Ачма с курицей',
    description: 'Сытная грузинская выпечка со слоями теста, сочной курицей и сыром',
    price: 480,
    category: 'СЫТНАЯ ВЫПЕЧКА & ЗАВТРАКИ',
    image: 'achma_kurica'
  },
  {
    id: 11,
    name: 'Клаб-сэндвич',
    description: 'Трёхслойный сэндвич с курицей гриль, беконом, свежими овощами и фирменным соусом',
    price: 520,
    category: 'СЫТНАЯ ВЫПЕЧКА & ЗАВТРАКИ',
    image: 'club_sandwich'
  },
  {
    id: 12,
    name: 'Сырник',
    description: 'Воздушные сырники из фермерского творога с ванилью, подаются со сметаной и ягодным соусом',
    price: 380,
    category: 'СЫТНАЯ ВЫПЕЧКА & ЗАВТРАКИ',
    image: 'sirnik'
  },
  {
    id: 13,
    name: 'Эспрессо',
    description: 'Классический итальянский эспрессо из премиальной арабики с насыщенным вкусом',
    price: 180,
    category: 'ГОРЯЧИЕ НАПИТКИ',
    image: null
  },
  {
    id: 14,
    name: 'Капучино',
    description: 'Бархатистый капучино с нежной молочной пенкой и авторским латте-артом',
    price: 240,
    category: 'ГОРЯЧИЕ НАПИТКИ',
    image: null
  },
  {
    id: 15,
    name: 'Флэт Уайт',
    description: 'Сбалансированный кофейный напиток с шелковистой микропенкой на двойном эспрессо',
    price: 280,
    category: 'ГОРЯЧИЕ НАПИТКИ',
    image: null
  },
  {
    id: 16,
    name: 'Матча Латте',
    description: 'Церемониальная японская матча с молоком — энергия и польза в каждом глотке',
    price: 320,
    category: 'ГОРЯЧИЕ НАПИТКИ',
    image: null
  },
  {
    id: 17,
    name: 'Раф кофе',
    description: 'Нежный сливочный кофе с ванилью — идеальный выбор для ценителей мягкого вкуса',
    price: 290,
    category: 'ГОРЯЧИЕ НАПИТКИ',
    image: null
  }
]

const filteredProducts = computed(() => {
  let filtered = products

  if (selectedCategory.value !== 'ВСЕ') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const categoryMapping = {
  'cakes': 'ТОРТЫ И ПИРОЖНЫЕ',
  'breakfast': 'СЫТНАЯ ВЫПЕЧКА & ЗАВТРАКИ'
}

onMounted(() => {
  const categoryQuery = route.query.category
  if (categoryQuery && categoryMapping[categoryQuery]) {
    selectedCategory.value = categoryMapping[categoryQuery]
  }
})

function checkout() {
  const orderText = cartItems.value
    .map(item => `- ${item.name} (${item.quantity} шт) — ${item.price * item.quantity} ₽`)
    .join('\n')

  const message = `Салам алейкум! Хочу сделать заказ:\n\n${orderText}\n\nИтого: ${totalPrice.value} ₽\n\nЗаберу с ул. Пролетарская 449, Майкоп.`
  
  const phoneNumber = ''
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  
  window.open(whatsappUrl, '_blank')
  clearCart()
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>