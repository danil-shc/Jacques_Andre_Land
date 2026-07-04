<script setup>
import { ref } from 'vue'
import { Bell, Minus, Plus, Info } from 'lucide-vue-next'
import ProductCardImage from '@/components/ProductCardImage.vue'
import { useCart } from '@/store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
})

const {
  addToCart: addToCartGlobal,
  cartItems,
  increaseQuantity,
  decreaseQuantity,
} = useCart()

const selectedVariantId = ref(props.product.variants?.[0]?.id ?? null)
const isFlipped = ref(false)

const getSelectedVariant = () => {
  if (!props.product.variants?.length) return null
  return (
    props.product.variants.find((variant) => variant.id === selectedVariantId.value) ??
    props.product.variants[0]
  )
}

const selectVariant = (variantId) => {
  selectedVariantId.value = variantId
}

const getDisplayPrice = () => {
  return props.product.variants ? getSelectedVariant().price : props.product.price
}

const addCoffeeToCart = () => {
  const variant = getSelectedVariant()
  addToCartGlobal({
    id: variant.id,
    name: props.product.name,
    volume: variant.volume,
    price: variant.price,
    description: props.product.description,
    category: props.product.category,
    image: props.product.image,
  })
}

const getCartLineId = () => {
  if (props.product.variants?.length) {
    return getSelectedVariant().id
  }
  return props.product.id
}

const getCartItem = () => {
  const lineId = getCartLineId()
  return cartItems.value.find((item) => item.id === lineId) ?? null
}

const getCartQuantity = () => getCartItem()?.quantity ?? 0

const addToCart = () => {
  addToCartGlobal(props.product)
}

const incrementProduct = () => {
  const cartItem = getCartItem()
  if (cartItem) {
    increaseQuantity(cartItem)
    return
  }

  if (props.product.variants) {
    addCoffeeToCart()
  } else {
    addToCart()
  }
}

const decrementProduct = () => {
  const cartItem = getCartItem()
  if (cartItem) {
    decreaseQuantity(cartItem)
  }
}

const flipToBack = () => {
  isFlipped.value = true
}

const flipToFront = () => {
  isFlipped.value = false
}
</script>

<template>
  <div
    class="product-card product-card__perspective shadow-[0_2px_16px_rgba(44,27,17,0.07)] hover:shadow-lg transition-shadow duration-300"
  >
    <div
      class="product-card__flip-inner"
      :class="{ 'is-flipped': isFlipped }"
    >
      <div
        class="product-card__face product-card__face--front bg-card rounded-[20px] overflow-hidden flex flex-col"
      >
        <div class="relative">
          <div
            v-if="product.isNew"
            class="absolute top-2 left-2 md:top-3 md:left-3 bg-espresso text-cream font-sans text-[9px] md:text-xs tracking-widest uppercase px-2 py-0.5 md:px-3 md:py-1 z-10 rounded-sm"
          >
            НОВИНКА
          </div>

          <button
            v-if="product.description"
            type="button"
            @click.stop="flipToBack"
            class="product-card__info-trigger absolute top-2 right-2 md:top-3 md:right-3 z-10 flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full border border-chocolate/20 md:border-chocolate/25 bg-cream/55 text-chocolate backdrop-blur-md shadow-[0_1px_8px_rgba(44,27,17,0.12)] hover:bg-cream/80 hover:border-chocolate/35 hover:shadow-[0_2px_12px_rgba(44,27,17,0.18)] transition-all duration-300 ease-in-out cursor-pointer"
            aria-label="Посмотреть состав"
          >
            <Info class="w-3.5 h-3.5 md:w-5 md:h-5 shrink-0" :stroke-width="1.5" />
          </button>

          <ProductCardImage
            v-if="imageUrl"
            :src="imageUrl"
            :alt="product.name"
          />
          <div
            v-else
            class="aspect-square bg-gradient-to-br from-espresso to-caramel flex items-center justify-center"
          >
            <Bell :size="64" class="text-cream" />
          </div>
        </div>

        <div class="p-3 md:p-5 flex-grow flex flex-col">
          <h3 class="font-serif text-sm md:text-xl text-chocolate leading-snug mb-1 md:mb-2">
            {{ product.name }}
          </h3>

          <div v-if="product.variants?.length" class="mb-3 md:mb-5">
            <p class="font-sans text-[10px] tracking-[0.22em] uppercase text-caramel/60 mb-2">Объём</p>
            <div class="flex flex-wrap gap-1.5 md:gap-2">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                type="button"
                @click="selectVariant(variant.id)"
                :class="[
                  'group/volume inline-flex flex-col items-center justify-center min-w-[60px] md:min-w-[72px] px-2 md:px-3 py-1.5 md:py-2 rounded-sm border font-sans transition-all duration-300 ease-in-out cursor-pointer',
                  getSelectedVariant()?.id === variant.id
                    ? 'bg-espresso border-espresso text-cream shadow-sm'
                    : 'bg-cream/80 border-caramel/25 text-chocolate hover:bg-espresso/8 hover:border-caramel hover:text-espresso',
                ]"
              >
                <span class="text-[11px] tracking-[0.18em] uppercase leading-none">{{ variant.volume }}</span>
                <span
                  :class="[
                    'mt-1.5 text-[10px] tracking-wider transition-colors duration-300',
                    getSelectedVariant()?.id === variant.id
                      ? 'text-cream/75'
                      : 'text-caramel/70 group-hover/volume:text-espresso',
                  ]"
                >
                  {{ variant.price }} ₽
                </span>
              </button>
            </div>
          </div>

          <div class="mt-auto flex items-center justify-between gap-2">
            <span class="font-sans text-sm md:text-lg font-semibold text-chocolate tracking-wide leading-none">
              {{ getDisplayPrice() }} ₽
            </span>
            <div class="product-card__stepper-slot shrink-0 h-9 md:h-10 flex items-center justify-end min-w-9 md:min-w-10">
              <Transition name="fade" mode="out-in">
                <button
                  v-if="getCartQuantity() === 0"
                  key="add"
                  type="button"
                  @click="incrementProduct"
                  class="product-card__add-btn w-9 h-9 md:w-10 md:h-10 rounded-full bg-espresso text-cream flex items-center justify-center hover:bg-espresso/90 transition-colors duration-300 cursor-pointer"
                  aria-label="Добавить в корзину"
                >
                  <Plus :size="20" />
                </button>
                <div
                  v-else
                  key="quantity"
                  class="product-card__stepper flex items-center h-9 md:h-10 border border-caramel/30 rounded-full bg-cream/80 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    @click="decrementProduct"
                    class="product-card__stepper-btn w-8 md:w-9 h-9 md:h-10 flex items-center justify-center text-chocolate hover:bg-espresso/8 active:bg-espresso/12 transition-all duration-300 ease-in-out cursor-pointer"
                    aria-label="Уменьшить количество"
                  >
                    <Minus :size="16" :stroke-width="1.75" />
                  </button>
                  <span class="product-card__stepper-count min-w-[1.75rem] px-0.5 text-center font-sans text-sm font-semibold text-chocolate tracking-wider tabular-nums select-none">
                    {{ getCartQuantity() }}
                  </span>
                  <button
                    type="button"
                    @click="incrementProduct"
                    class="product-card__stepper-btn w-8 md:w-9 h-9 md:h-10 flex items-center justify-center text-chocolate hover:bg-espresso/8 active:bg-espresso/12 transition-all duration-300 ease-in-out cursor-pointer"
                    aria-label="Увеличить количество"
                  >
                    <Plus :size="16" :stroke-width="1.75" />
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div
        class="product-card__face product-card__face--back bg-card rounded-[20px] overflow-hidden flex flex-col"
      >
        <div class="shrink-0 px-3 pt-3 md:px-5 md:pt-5">
          <button
            type="button"
            @click.stop="flipToFront"
            class="inline-flex items-center gap-1.5 md:gap-2.5 py-2 md:py-2.5 px-2 md:px-3 -ml-2 md:-ml-3 font-sans text-[9px] md:text-sm tracking-[0.2em] uppercase text-caramel/70 hover:text-caramel transition-colors duration-300 ease-in-out cursor-pointer"
            aria-label="Вернуться к карточке"
          >
            <svg
              class="w-3 h-3 md:w-[18px] md:h-[18px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span class="leading-none">НАЗАД</span>
          </button>
        </div>

        <div class="flex-1 min-h-0 flex items-center justify-center px-4 pb-4 md:px-6 md:pb-6 overflow-y-auto">
          <p class="font-sans text-[11px] md:text-[15px] text-chocolate/75 leading-relaxed md:leading-relaxed text-center tracking-wide">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card__perspective {
  perspective: 1000px;
  -webkit-perspective: 1000px;
  border-radius: 20px;
}

.product-card__flip-inner {
  position: relative;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  border-radius: 20px;
}

.product-card__flip-inner.is-flipped {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
}

.product-card__face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  border-radius: 20px;
  overflow: hidden;
}

.product-card__face--front {
  transform: rotateY(0deg) translateZ(1px);
  -webkit-transform: rotateY(0deg) translateZ(1px);
}

.product-card__face--back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg) translateZ(1px);
  -webkit-transform: rotateY(180deg) translateZ(1px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
