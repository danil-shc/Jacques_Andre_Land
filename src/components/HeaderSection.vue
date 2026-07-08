<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCart } from '@/store/cart'
import { Menu, X, Search, ShoppingBag } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const FOCUS_MENU_SEARCH_EVENT = 'jacques:focus-menu-search'
const cartStore = useCart()
const { totalItems } = cartStore
const mobileMenuOpen = ref(false)
const isPulsing = ref(false)

watch(cartStore.totalPrice, (newPrice, oldPrice) => {
  if (newPrice > oldPrice) {
    isPulsing.value = true
    setTimeout(() => {
      isPulsing.value = false
    }, 300)
  }
})

watch(mobileMenuOpen, (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})

const requestMenuSearchFocus = () => {
  window.dispatchEvent(new CustomEvent(FOCUS_MENU_SEARCH_EVENT))
}

const handleSearchClick = async () => {
  if (route.path !== '/menu') {
    await router.push('/menu')
    await nextTick()
  }

  requestMenuSearchFocus()
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
      Доставка к вашему дому — бесплатно по Майкопу при заказе от 1500 ₽
    </p>
  </div>

  <!-- Main navbar — pinned on scroll (header uses contents so sticky isn't trapped in a short box) -->
  <header class="contents">
    <div class="sticky top-0 z-50 bg-cream border-b border-espresso/10">
      <div class="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Mobile Hamburger (visible only on mobile) -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-chocolate hover:text-espresso active:text-espresso transition-colors duration-300 ease-in-out z-50 cursor-pointer"
          aria-label="Меню"
        >
          <Menu
            v-if="!mobileMenuOpen"
            :size="24"
            class="transition-colors duration-300 ease-in-out"
          />
          <X
            v-else
            :size="24"
            class="transition-colors duration-300 ease-in-out"
          />
        </button>

        <!-- Desktop Navigation Links (hidden on mobile) -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/menu"
            class="group relative inline-block text-chocolate font-sans font-normal text-sm tracking-widest uppercase transition-colors duration-300 ease-in-out hover:text-espresso active:text-espresso"
            :class="{ '!text-espresso': $route.path === '/menu' }"
          >
            <span class="relative inline-block pb-0.5">
              Меню
              <span
                class="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-in-out"
                :class="[
                  $route.path === '/menu'
                    ? 'w-full bg-espresso'
                    : 'w-0 bg-espresso group-hover:w-full'
                ]"
              ></span>
            </span>
          </router-link>

          <router-link
            to="/locations"
            class="group relative inline-block text-chocolate font-sans font-normal text-sm tracking-widest uppercase transition-colors duration-300 ease-in-out hover:text-espresso active:text-espresso"
            :class="{ '!text-espresso': $route.path === '/locations' }"
          >
            <span class="relative inline-block pb-0.5">
              Наши пекарни
              <span
                class="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-in-out"
                :class="[
                  $route.path === '/locations'
                    ? 'w-full bg-espresso'
                    : 'w-0 bg-espresso group-hover:w-full'
                ]"
              ></span>
            </span>
          </router-link>
        </nav>

        <!-- Centered Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <router-link
            to="/"
            class="font-serif font-normal text-xl md:text-3xl text-chocolate hover:text-espresso active:text-espresso tracking-wide transition-colors duration-300 ease-in-out"
          >
            ЖАК~АНДРЭ
          </router-link>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center space-x-4 md:space-x-6">
          <button
            @click="handleSearchClick"
            class="text-chocolate hover:text-espresso active:text-espresso transition-colors duration-300 ease-in-out cursor-pointer"
            aria-label="Поиск"
          >
            <Search :size="20" />
          </button>

          <router-link
            to="/cart"
            class="relative cursor-pointer inline-flex text-chocolate hover:text-espresso active:text-espresso transition-colors duration-300 ease-in-out"
            aria-label="Корзина"
            :class="[
              'transition-transform ease-out duration-300',
              isPulsing ? 'scale-115 text-espresso' : 'scale-100'
            ]"
          >
            <ShoppingBag :size="20" />
            <span
              v-if="totalItems > 0"
              class="absolute -top-2 -right-2 bg-espresso text-cream text-xs rounded-full h-4 w-4 flex items-center justify-center font-sans font-semibold"
            >
              {{ totalItems }}
            </span>
          </router-link>
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
          class="flex flex-col items-center justify-center h-full gap-6 px-6"
          @click.stop
        >
          <button
            @click="navigateAndClose('/')"
            class="group relative text-cream font-sans font-normal text-[1.375rem] tracking-widest uppercase transition-colors duration-300 ease-in-out cursor-pointer hover:text-cream/80"
          >
            Главная
            <span class="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cream transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </button>

          <button
            @click="navigateAndClose('/menu')"
            class="group relative text-cream font-sans font-normal text-[1.375rem] tracking-widest uppercase transition-colors duration-300 ease-in-out cursor-pointer hover:text-cream/80"
          >
            Меню
            <span class="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cream transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </button>

          <button
            @click="navigateAndClose('/locations')"
            class="group relative text-cream font-sans font-normal text-[1.375rem] tracking-widest uppercase transition-colors duration-300 ease-in-out cursor-pointer hover:text-cream/80"
          >
            Наши пекарни
            <span class="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cream transition-all duration-300 ease-in-out group-hover:w-full"></span>
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
