<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MapPin } from 'lucide-vue-next'

const props = defineProps({
  addresses: {
    type: Array,
    required: true,
  },
})

const selectedAddress = defineModel({ type: String, required: true })

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectAddress = (address) => {
  selectedAddress.value = address
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative min-w-0">
    <button
      type="button"
      @click.stop="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      aria-label="Выберите адрес пекарни"
      class="group flex w-full min-w-0 items-center gap-2 border-b border-caramel/30 py-1.5 pr-1 text-left transition-all duration-300 ease-in-out focus:border-caramel focus:outline-none"
    >
      <MapPin :size="20" class="shrink-0 text-caramel" aria-hidden="true" />

      <span class="min-w-0 flex-1 truncate font-sans text-sm tracking-wide text-caramel md:text-base">
        {{ selectedAddress }}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        :class="[
          'h-4 w-4 shrink-0 text-caramel/60 transition-transform duration-300 ease-in-out',
          isOpen ? 'rotate-180' : 'rotate-0',
        ]"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <Transition
      enter-from-class="opacity-0 translate-y-[-8px] scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      enter-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-[-8px] scale-[0.98]"
      leave-active-class="transition ease-in duration-150"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        aria-label="Адреса пекарни"
        class="absolute left-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-sm border border-caramel/15 bg-card shadow-xl"
      >
        <li
          v-for="address in addresses"
          :key="address"
          role="option"
          :aria-selected="selectedAddress === address"
        >
          <button
            type="button"
            @click="selectAddress(address)"
            :class="[
              'w-full px-4 py-3 text-left font-sans text-sm tracking-wide transition-colors duration-200 md:text-base',
              selectedAddress === address
                ? 'bg-caramel/10 text-caramel'
                : 'text-chocolate/80 hover:bg-caramel/8 hover:text-caramel',
            ]"
          >
            {{ address }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
