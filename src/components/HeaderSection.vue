<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/store/cart'
import { Menu, X, Search, ShoppingBag } from 'lucide-vue-next'

const router = useRouter()
const { totalItems } = useCart()
const mobileMenuOpen = ref(false)

watch(mobileMenuOpen, (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})

const handleSearchClick = () => {
  router.push('/menu')
  setTimeout(() => {
    const searchInput = document.querySelector('input[placeholder*="Поиск"]')
    if (searchInput) searchInput.focus()
  }, 100)
}

const handleCartClick = () => {
  router.push('/menu')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const navigateAndClose = (path) => {
  router.push(path)
  closeMobileMenu()
}
</script>

<template>
  <!-- Top Promo Bar — scrolls away naturally -->
  <div class="bg-espresso text-cream text-center py-3 px-4">
    <p class="text-xs md:text-sm font-sans font-normal tracking-widest uppercase">
      Доставка к вашему дому — бесплатно по Майкопу при заказе от 2500 ₽
    </p>
  </div>

  <!-- Main navbar — pinned on scroll (header uses contents so sticky isn't trapped in a short box) -->
  <header class="contents">
    <div class="sticky top-0 z-50 bg-cream border-b border-espresso/10">
      <div class="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Mobile Hamburger (visible only on mobile) -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-chocolate hover:opacity-70 transition-all duration-300 ease-in-out z-50 cursor-pointer"
          aria-label="Меню"
        >
          <Menu
            v-if="!mobileMenuOpen"
            :size="24"
            class="transition-transform duration-300"
          />
          <X
            v-else
            :size="24"
            class="transition-transform duration-300"
          />
        </button>

        <!-- Desktop Navigation Links (hidden on mobile) -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/menu"
            class="text-caramel font-sans font-normal text-sm tracking-widest uppercase hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            Меню
          </router-link>

          <router-link
            to="/locations"
            class="text-caramel font-sans font-normal text-sm tracking-widest uppercase hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            Наши пекарни
          </router-link>
        </nav>

        <!-- Centered Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <router-link to="/" class="font-serif font-normal text-xl md:text-3xl text-chocolate tracking-wide">
            ЖАК-АНДРЭ
          </router-link>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center space-x-4 md:space-x-6">
          <button
            @click="handleSearchClick"
            class="text-chocolate hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
            aria-label="Поиск"
          >
            <Search :size="20" />
          </button>

          <button
            @click="handleCartClick"
            class="text-chocolate hover:opacity-70 transition-all duration-300 ease-in-out relative cursor-pointer"
            aria-label="Корзина"
          >
            <ShoppingBag :size="20" />
            <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-espresso text-cream text-xs rounded-full h-4 w-4 flex items-center justify-center font-sans font-semibold">{{ totalItems }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Overlay Menu -->
  <transition
      enter-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-espresso/95 backdrop-blur-sm z-40 md:hidden"
        @click="closeMobileMenu"
      >
        <nav
          class="flex flex-col items-center justify-center h-full space-y-12 px-6"
          @click.stop
        >
          <button
            @click="navigateAndClose('/')"
            class="text-cream font-sans font-normal text-3xl tracking-widest uppercase hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Главная
          </button>

          <button
            @click="navigateAndClose('/menu')"
            class="text-cream font-sans font-normal text-3xl tracking-widest uppercase hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Меню
          </button>

          <button
            @click="navigateAndClose('/locations')"
            class="text-cream font-sans font-normal text-3xl tracking-widest uppercase hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Наши пекарни
          </button>

          <div class="absolute bottom-12 text-center">
            <p class="text-cream/60 font-sans font-normal text-xs tracking-widest uppercase">
              Jacques-André
            </p>
          </div>
        </nav>
      </div>
    </transition>
</template>

<style scoped>
</style>