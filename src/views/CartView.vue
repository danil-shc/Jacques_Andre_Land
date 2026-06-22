<template>
  <div class="bg-cream py-8 sm:py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mb-12 lg:mb-20">
      <!-- Page Header -->
      <div class="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 class="font-serif text-3xl md:text-5xl text-chocolate mb-4 tracking-wide">
          Корзина
        </h1>
        <div class="h-px w-24 bg-caramel/30 mx-auto"></div>
      </div>

      <!-- Address Selector (Only show when cart has items) -->
      <div v-if="cartItems.length > 0" class="mb-8 sm:mb-10 flex justify-center">
        <AddressDropdown
          v-model="selectedAddress"
          :addresses="bakeryAddresses"
          class="min-w-0 max-w-full sm:max-w-md"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="cartItems.length === 0"
        class="flex flex-col items-center justify-center py-16 md:py-24"
      >
        <div class="mb-8">
          <ShoppingBag :size="80" class="text-caramel/30" stroke-width="1" />
        </div>
        
        <h2 class="font-serif text-2xl md:text-3xl text-chocolate mb-4 tracking-wide">
          Ваша корзина пуста
        </h2>
        
        <p class="font-sans text-sm md:text-base text-chocolate/60 tracking-wide text-center max-w-md mb-10 leading-relaxed">
          Загляните в наше меню, чтобы выбрать свежие круассаны и изысканные десерты
        </p>
        
        <router-link
          to="/menu"
          class="inline-block bg-espresso text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] py-4 px-10 hover:bg-espresso/90 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Вернуться в меню
        </router-link>
      </div>

      <!-- Cart Content -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
      >
        <!-- Left Column: Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white/40 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-start gap-4 py-4 px-4 border-b border-chocolate/10 last:border-b-0 w-full"
            >
              <!-- Product Image -->
              <div
                v-if="item.image"
                class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm overflow-hidden bg-stone-50"
              >
                <img
                  :src="getImageUrl(item.image)"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm bg-gradient-to-br from-espresso to-caramel flex items-center justify-center"
              >
                <ShoppingBag :size="28" class="text-cream" />
              </div>

              <!-- Right Content Block -->
              <div class="flex-1 flex flex-col justify-between min-h-[80px] sm:min-h-[96px]">
                <!-- Top Row: Title/Price & Delete Button -->
                <div class="flex justify-between items-start gap-2 w-full">
                  <!-- Product Title & Price per piece -->
                  <div class="flex flex-col min-w-0 flex-1">
                    <h3 class="text-sm sm:text-base md:text-lg font-medium text-chocolate leading-tight line-clamp-2 mb-0.5 sm:mb-1">
                      {{ formatProductLabel(item) }}
                    </h3>
                    <p class="text-xs sm:text-sm text-stone-400 font-light">
                      {{ item.price }} ₽ за шт.
                    </p>
                  </div>

                  <!-- Delete Action (X Icon) -->
                  <button
                    @click="removeFromCart(item)"
                    class="text-stone-400 hover:text-chocolate transition-colors duration-200 p-1 -mt-1 shrink-0"
                    aria-label="Удалить товар"
                  >
                    <X :size="18" :stroke-width="2" />
                  </button>
                </div>

                <!-- Bottom Row: Counter Controls & Total Price -->
                <div class="flex justify-between items-center w-full mt-auto pt-2">
                  <!-- Quantity Controls -->
                  <div class="flex items-center gap-2 sm:gap-3">
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-300 text-chocolate flex items-center justify-center hover:bg-stone-100 hover:border-chocolate transition-all duration-200 cursor-pointer"
                      aria-label="Уменьшить количество"
                    >
                      <Minus :size="14" :stroke-width="2" />
                    </button>

                    <span class="w-8 text-center text-sm sm:text-base font-medium text-chocolate">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="increaseQuantity(item)"
                      class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-300 text-chocolate flex items-center justify-center hover:bg-stone-100 hover:border-chocolate transition-all duration-200 cursor-pointer"
                      aria-label="Увеличить количество"
                    >
                      <Plus :size="14" :stroke-width="2" />
                    </button>
                  </div>

                  <!-- Total Price -->
                  <span class="text-base sm:text-lg font-semibold text-chocolate whitespace-nowrap">
                    {{ item.price * item.quantity }} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary (Sticky) -->
        <div class="lg:col-span-1">
          <div class="bg-white/60 rounded-sm border border-caramel/20 p-6 sm:p-8 lg:sticky lg:top-24">
            <h2 class="font-serif text-xl sm:text-2xl text-chocolate mb-6 sm:mb-8 tracking-wide">
              Итого
            </h2>

            <!-- Pricing Breakdown -->
            <div class="space-y-3 sm:space-y-4 mb-6 pb-6 border-b border-caramel/20">
              <div class="flex justify-between items-center">
                <span class="font-sans text-xs sm:text-sm text-chocolate/70 tracking-wider uppercase">
                  Товары
                </span>
                <span class="font-sans text-sm sm:text-base text-chocolate tracking-wide">
                  {{ subtotal }} ₽
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="font-sans text-xs sm:text-sm text-chocolate/70 tracking-wider uppercase">
                  Доставка
                </span>
                <span class="font-sans text-sm sm:text-base text-chocolate tracking-wide">
                  {{ deliveryFee }} ₽
                </span>
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center mb-6 sm:mb-8">
              <span class="font-serif text-base sm:text-lg text-chocolate tracking-wide">
                Всего
              </span>
              <span class="font-sans font-semibold text-xl sm:text-2xl text-chocolate tracking-wide">
                {{ totalWithDelivery }} ₽
              </span>
            </div>

            <!-- Promo Code -->
            <div class="mb-6 sm:mb-8">
              <input
                v-model="promoCode"
                type="text"
                placeholder="Промокод"
                class="w-full bg-cream/50 border border-caramel/20 text-chocolate placeholder:text-chocolate/40 py-2.5 sm:py-3 px-3 sm:px-4 text-sm font-sans tracking-wider focus:outline-none focus:border-caramel transition-all duration-300 rounded-sm"
              />
            </div>

            <!-- Checkout Button -->
            <button
              @click="checkout"
              class="w-full bg-espresso text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] py-3.5 sm:py-4 px-6 sm:px-8 hover:bg-espresso/90 active:scale-[0.98] transition-all duration-300 shadow-lg cursor-pointer"
            >
              Оформить заказ
            </button>

            <p class="text-center font-sans text-[10px] sm:text-xs text-chocolate/50 tracking-wide mt-4 sm:mt-6 leading-relaxed">
              Бесплатная доставка по Майкопу при заказе от 1500 ₽
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/store/cart'
import { ShoppingBag, X, Minus, Plus } from 'lucide-vue-next'
import AddressDropdown from '@/components/AddressDropdown.vue'

const router = useRouter()
const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart()

const promoCode = ref('')

const bakeryAddresses = [
  'Майкоп, ул. Пролетарская, 449',
  'Майкоп, ул. Первомайская, 193',
  'Майкоп, Шоссейная ул., 18 (1 этаж)'
]

const selectedAddress = ref(bakeryAddresses[0])

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
  return menuImages[path] ?? null
}

const formatProductLabel = (product) => {
  return product.volume ? `${product.name} ${product.volume}` : product.name
}

const subtotal = computed(() => totalPrice.value)

const deliveryFee = computed(() => {
  return subtotal.value >= 1500 ? 0 : 150
})

const totalWithDelivery = computed(() => {
  return subtotal.value + deliveryFee.value
})

function checkout() {
  const orderText = cartItems.value
    .map(item => `- ${formatProductLabel(item)} (${item.quantity} шт) — ${item.price * item.quantity} ₽`)
    .join('\n')

  const deliveryText = deliveryFee.value > 0 
    ? `Доставка: ${deliveryFee.value} ₽\n` 
    : 'Доставка: бесплатно\n'

  const message = `Салам алейкум! Хочу сделать заказ:\n\n${orderText}\n\n${deliveryText}Итого: ${totalWithDelivery.value} ₽\n\nАдрес: ${selectedAddress.value}.`

  const phoneNumber = '79002620036'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
  clearCart()
  
  router.push('/menu')
}
</script>

<style scoped>
</style>
