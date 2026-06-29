<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { faqItems } from '@/data/faq'

const openIndex = ref(null)

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isOpen = (index) => openIndex.value === index

const onEnter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
  requestAnimationFrame(() => {
    el.style.height = `${el.scrollHeight}px`
    el.style.opacity = '1'
  })
}

const onAfterEnter = (el) => {
  el.style.height = 'auto'
}

const onLeave = (el) => {
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  requestAnimationFrame(() => {
    el.style.height = '0'
    el.style.opacity = '0'
  })
}
</script>

<template>
  <section class="bg-cream py-8 md:py-24">
    <div class="max-w-3xl mx-auto px-5 md:px-6">
      <header class="text-center mb-7 md:mb-16 space-y-2 md:space-y-4">
        <p class="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-caramel">
          Поддержка гостей
        </p>
        <h1 class="font-serif font-normal text-3xl md:text-5xl text-chocolate tracking-wide">
          Частые вопросы
        </h1>
        <p class="font-sans font-light text-sm md:text-base text-chocolate/70 leading-relaxed max-w-xl mx-auto">
          Всё, что нужно знать о заказах, бонусах и нашей кондитерской — в одном месте.
        </p>
      </header>

      <div class="border-t border-espresso/10">
        <div
          v-for="(item, index) in faqItems"
          :key="item.id"
          class="border-b border-espresso/10"
        >
          <button
            type="button"
            :id="`faq-trigger-${item.id}`"
            :aria-expanded="isOpen(index)"
            :aria-controls="`faq-panel-${item.id}`"
            class="group flex w-full items-center justify-between gap-4 py-4 md:py-7 text-left transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            @click="toggleItem(index)"
          >
            <span
              class="font-sans font-medium text-sm md:text-base text-chocolate tracking-wide leading-snug transition-colors duration-300 group-hover:text-espresso"
              :class="{ 'text-espresso': isOpen(index) }"
            >
              {{ item.question }}
            </span>

            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-espresso/10 text-caramel transition-all duration-300 ease-in-out group-hover:border-caramel/30 group-hover:text-espresso"
              :class="{ 'border-caramel/40 bg-espresso/5 rotate-180': isOpen(index) }"
              aria-hidden="true"
            >
              <ChevronDown :size="16" :stroke-width="1.5" />
            </span>
          </button>

          <Transition
            name="faq"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <div
              v-show="isOpen(index)"
              :id="`faq-panel-${item.id}`"
              role="region"
              :aria-labelledby="`faq-trigger-${item.id}`"
              class="overflow-hidden"
            >
              <p class="pb-4 md:pb-7 font-sans font-light text-sm md:text-base text-chocolate/70 leading-relaxed pr-10 md:pr-14">
                {{ item.answer }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition:
    height 0.35s ease-in-out,
    opacity 0.3s ease-in-out;
  overflow: hidden;
}
</style>
