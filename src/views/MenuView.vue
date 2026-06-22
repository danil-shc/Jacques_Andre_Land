<template>
  <div class="min-h-screen bg-cream">
    <div class="max-w-7xl mx-auto px-6 py-8 md:py-12">
      <div class="mb-10">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск выпечки, десертов и напитков"
          class="w-full bg-transparent border-b border-chocolate text-chocolate placeholder:text-chocolate/40 py-3 px-1 text-base md:text-lg font-sans tracking-wider focus:outline-none focus:border-chocolate transition-all duration-300"
        />
      </div>

      <div class="flex flex-wrap gap-4 md:gap-6 mb-12 border-b border-caramel/20 pb-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'font-sans font-normal text-xs md:text-sm tracking-widest uppercase pb-2 border-b-2 transition-colors duration-300 ease-in-out cursor-pointer',
            selectedCategory === category
              ? 'text-caramel border-caramel'
              : 'text-caramel/50 border-transparent hover:text-caramel/80'
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
          <div v-if="product.image" class="aspect-square overflow-hidden bg-cream">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div v-else class="aspect-square bg-gradient-to-br from-espresso to-caramel flex items-center justify-center">
            <Bell :size="64" class="text-cream" />
          </div>
          
          <div class="p-5 flex-grow flex flex-col">
            <h3 class="font-serif text-lg md:text-xl text-chocolate mb-2">{{ product.name }}</h3>
            <p class="text-sm text-chocolate/70 mb-4 flex-grow leading-relaxed">{{ product.description }}</p>

            <div v-if="product.variants?.length" class="mb-5">
              <p class="font-sans text-[10px] tracking-[0.22em] uppercase text-caramel/60 mb-3">Объём</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  type="button"
                  @click="selectVariant(product.id, variant.id)"
                  :class="[
                    'group/volume inline-flex flex-col items-center justify-center min-w-[72px] px-3 py-2 rounded-sm border font-sans transition-all duration-300 ease-in-out cursor-pointer',
                    getSelectedVariant(product)?.id === variant.id
                      ? 'bg-espresso border-espresso text-cream shadow-sm'
                      : 'bg-cream/80 border-caramel/25 text-chocolate hover:bg-espresso/8 hover:border-caramel hover:text-espresso'
                  ]"
                >
                  <span class="text-[11px] tracking-[0.18em] uppercase leading-none">{{ variant.volume }}</span>
                  <span
                    :class="[
                      'mt-1.5 text-[10px] tracking-wider transition-colors duration-300',
                      getSelectedVariant(product)?.id === variant.id
                        ? 'text-cream/75'
                        : 'text-caramel/70 group-hover/volume:text-espresso'
                    ]"
                  >
                    {{ variant.price }} ₽
                  </span>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between mt-auto">
              <span class="font-sans text-lg font-semibold text-chocolate tracking-wide">{{ getDisplayPrice(product) }} ₽</span>
              <button
                @click="product.variants ? addCoffeeToCart(product) : addToCart(product)"
                class="w-10 h-10 rounded-full bg-espresso text-cream flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Plus :size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/store/cart'
import { coffeeMenu, allMenuProducts } from '@/data/products'
import { Bell, Plus } from 'lucide-vue-next'

const route = useRoute()
const { addToCart: addToCartGlobal } = useCart()

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
  return menuImages[path] ?? null
}

const categories = [
  'ВСЕ',
  'Выпечка',
  'Десерты',
  'ГОРЯЧИЕ НАПИТКИ'
]

const categoryOrder = {
  'Выпечка': 1,
  'Десерты': 2,
  'ГОРЯЧИЕ НАПИТКИ': 3,
}

const selectedCategory = ref('ВСЕ')
const searchQuery = ref('')

const allProducts = allMenuProducts

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

  if (selectedCategory.value === 'ВСЕ') {
    filtered = [...filtered].sort((a, b) => {
      const orderA = categoryOrder[a.category] ?? 99
      const orderB = categoryOrder[b.category] ?? 99

      if (orderA !== orderB) return orderA - orderB

      return allProducts.indexOf(a) - allProducts.indexOf(b)
    })
  }

  return filtered
})

const categoryMapping = {
  'cakes': 'Десерты',
  'baking': 'Выпечка',
  'hearty': 'Выпечка',
  'breakfast': 'Выпечка',
}

onMounted(() => {
  const categoryQuery = route.query.category
  if (categoryQuery && categoryMapping[categoryQuery]) {
    selectedCategory.value = categoryMapping[categoryQuery]
  }
})
</script>

<style scoped>
</style>
