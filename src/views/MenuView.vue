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

            <div v-if="product.variants?.length" class="mb-5">
              <p class="font-sans text-[10px] tracking-[0.22em] uppercase text-[#7E4B30] text-opacity-60 mb-3">Объём</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  type="button"
                  @click="selectVariant(product.id, variant.id)"
                  :class="[
                    'group/volume inline-flex flex-col items-center justify-center min-w-[72px] px-3 py-2 rounded-sm border font-sans transition-all duration-300 ease-in-out cursor-pointer',
                    getSelectedVariant(product)?.id === variant.id
                      ? 'bg-[#2C1B11] border-[#2C1B11] text-[#FDFBF7] shadow-sm'
                      : 'bg-[#FDFBF7]/80 border-[#7E4B30]/25 text-[#4B2307] hover:bg-[#2C1B11]/8 hover:border-[#7E4B30] hover:text-[#2C1B11]'
                  ]"
                >
                  <span class="text-[11px] tracking-[0.18em] uppercase leading-none">{{ variant.volume }}</span>
                  <span
                    :class="[
                      'mt-1.5 text-[10px] tracking-wider transition-colors duration-300',
                      getSelectedVariant(product)?.id === variant.id
                        ? 'text-[#FDFBF7]/75'
                        : 'text-[#7E4B30]/70 group-hover/volume:text-[#2C1B11]'
                    ]"
                  >
                    {{ variant.price }} ₽
                  </span>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between mt-auto">
              <span class="font-sans text-lg font-semibold text-[#4B2307] tracking-wide">{{ getDisplayPrice(product) }} ₽</span>
              <button
                @click="product.variants ? addCoffeeToCart(product) : addToCart(product)"
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
        <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h2 class="text-center font-serif text-lg md:text-xl uppercase tracking-[0.2em] text-[#FDFBF7]/90 mb-6 md:mb-8 lg:mb-10">
            Ваш заказ
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 xl:gap-16 items-center">
            <div class="cart-items-container min-w-0 space-y-0 max-h-48 md:max-h-64 lg:max-h-72 overflow-y-auto pr-2">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex flex-col lg:grid lg:grid-cols-[2fr_120px_100px] lg:items-center gap-3 lg:gap-6 py-4 border-b border-white/10 last:border-b-0 w-full"
              >
                <div class="w-full flex justify-between items-start">
                  <span class="font-serif text-[#FDFBF7] text-base md:text-lg lg:text-sm font-medium tracking-wide text-left leading-snug">
                    {{ formatProductLabel(item) }}
                  </span>
                </div>

                <div class="w-full lg:w-auto flex items-center justify-between lg:contents mt-1 lg:mt-0">
                  <div class="flex items-center space-x-3">
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#4A2C11] border border-[#4A2C11]/10 flex items-center justify-center font-bold text-base leading-none select-none pb-[2px] transition-all duration-300 ease-out hover:bg-[#EFE9DC] hover:text-[#2A1605] hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>

                    <span class="text-center min-w-[24px] font-sans font-medium text-[#FDFBF7] text-sm tracking-wide">{{ item.quantity }}</span>

                    <button
                      @click="increaseQuantity(item)"
                      class="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#4A2C11] border border-[#4A2C11]/10 flex items-center justify-center font-bold text-base leading-none select-none pb-[2px] transition-all duration-300 ease-out hover:bg-[#EFE9DC] hover:text-[#2A1605] hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>

                  <span class="font-serif font-medium text-[#FDFBF7] text-base md:text-lg lg:text-sm text-right lg:w-[100px] whitespace-nowrap">
                    {{ item.price * item.quantity }} ₽
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-12 xl:pl-16 py-2 lg:py-4 w-full">
              <div class="text-center w-full max-w-sm mx-auto">
                <span class="block font-sans text-xs uppercase tracking-[0.15em] text-[#FDFBF7]/50 mb-2">Итого</span>
                <span class="block font-serif text-3xl md:text-4xl text-[#FDFBF7] tracking-wide mb-6 whitespace-nowrap">{{ totalPrice }} ₽</span>

                <button
                  @click="checkout"
                  class="w-full bg-white text-[#4A2C11] font-sans font-medium text-xs uppercase tracking-[0.2em] py-4 px-8 hover:bg-[#FAF7F2] active:scale-[0.98] transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Оформить заказ
                </button>
              </div>
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

const menuImages = import.meta.glob(
  '../assets/images/**/*.{webp,jpg,jpeg,png}',
  { eager: true, query: '?url', import: 'default' }
)

const getImageUrl = (imageName) => {
  if (!imageName) return null
  const fileName = imageName.includes('.') ? imageName : `${imageName}.webp`
  const path = fileName.includes('_coffee.')
    ? `../assets/images/coffee/${fileName}`
    : `../assets/images/${fileName}`
  const resolvedUrl = menuImages[path] ?? null
  // #region agent log
  fetch('http://127.0.0.1:7822/ingest/52da591b-afc9-4e43-bd46-cf89e29c0e1c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cbf3ed'},body:JSON.stringify({sessionId:'cbf3ed',location:'MenuView.vue:getImageUrl',message:'menu image resolved',data:{imageName,fileName,path,resolvedUrl,mapHit:!!menuImages[path],routePath:route.path,baseUrl:import.meta.env.BASE_URL,hasAssetsImagesSegment:resolvedUrl?.includes('/assets/images/')},timestamp:Date.now(),hypothesisId:'A-B-C',runId:'post-fix'})}).catch(()=>{});
  // #endregion
  return resolvedUrl
}

const formatProductLabel = (product) => {
  return product.volume ? `${product.name} ${product.volume}` : product.name
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
  }
]

const coffeeMenu = [
  {
    id: 'coffee-americano',
    name: 'Американо',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Классический крепкий кофе на основе эспрессо',
    image: 'americano_coffee.webp',
    variants: [
      { id: 'c1', volume: '250мл', price: 175 },
      { id: 'c2', volume: '350мл', price: 209 },
      { id: 'c3', volume: '400мл', price: 225 }
    ]
  },
  {
    id: 'coffee-cappuccino',
    name: 'Капучино',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Классический кофейный напиток с балансом эспрессо и нежной молочной пены',
    image: 'capuchino_coffee.webp',
    variants: [
      { id: 'c4', volume: '250мл', price: 209 },
      { id: 'c5', volume: '350мл', price: 245 },
      { id: 'c6', volume: '400мл', price: 275 }
    ]
  },
  {
    id: 'coffee-latte',
    name: 'Латте',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Мягкий кофейный напиток с преобладанием горячего молока и легкой пенкой',
    image: 'latte_coffee.webp',
    variants: [
      { id: 'c7', volume: '250мл', price: 209 },
      { id: 'c8', volume: '350мл', price: 245 },
      { id: 'c9', volume: '400мл', price: 275 }
    ]
  },
  {
    id: 'coffee-flat-white',
    name: 'Флэт-уайт',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Насыщенный кофейный вкус с двойной порцией эспрессо и тонким слоем бархатистой пены',
    image: 'flat_white_coffee.webp',
    variants: [
      { id: 'c10', volume: '250мл', price: 239 },
      { id: 'c11', volume: '350мл', price: 259 }
    ]
  },
  {
    id: 'coffee-raf',
    name: 'Раф',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Нежнейший кофейный десерт на основе эспрессо, сливок и ванильного сахара',
    image: 'raf_coffee.webp',
    variants: [
      { id: 'c12', volume: '250мл', price: 279 }
    ]
  },
  {
    id: 'coffee-kids-cappuccino',
    name: 'Детский капучино',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Нежное взбитое молочко с воздушной пеной без добавления кофе — специально для маленьких гостей',
    image: 'babychino_coffee.webp',
    variants: [
      { id: 'c13', volume: '250мл', price: 99 }
    ]
  }
]

const allProducts = [...products, ...coffeeMenu]

const selectedVariants = ref(
  Object.fromEntries(coffeeMenu.map(item => [item.id, item.variants[0].id]))
)

const getSelectedVariant = (product) => {
  if (!product.variants?.length) return null
  const variantId = selectedVariants.value[product.id] ?? product.variants[0].id
  return product.variants.find(variant => variant.id === variantId) ?? product.variants[0]
}

const selectVariant = (productId, variantId) => {
  selectedVariants.value[productId] = variantId
}

const getDisplayPrice = (product) => {
  return product.variants ? getSelectedVariant(product).price : product.price
}

const addCoffeeToCart = (product) => {
  const variant = getSelectedVariant(product)
  addToCartGlobal({
    id: variant.id,
    name: product.name,
    volume: variant.volume,
    price: variant.price,
    description: product.description,
    category: product.category,
    image: product.image
  })
}

const filteredProducts = computed(() => {
  let filtered = allProducts

  if (selectedCategory.value !== 'ВСЕ') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => {
      const matchesBase =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)

      if (matchesBase) return true

      return p.variants?.some(variant =>
        variant.volume.toLowerCase().includes(query) ||
        String(variant.price).includes(query)
      )
    })
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
    .map(item => `- ${formatProductLabel(item)} (${item.quantity} шт) — ${item.price * item.quantity} ₽`)
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

.cart-items-container {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: rgba(218, 192, 163, 0.3) transparent;
}

.cart-items-container::-webkit-scrollbar {
  width: 6px;
}

.cart-items-container::-webkit-scrollbar-track {
  background: transparent;
}

.cart-items-container::-webkit-scrollbar-thumb {
  background-color: rgba(218, 192, 163, 0.3);
  border-radius: 9999px;
}

.cart-items-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(218, 192, 163, 0.5);
}
</style>