<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  aspectClass: {
    type: String,
    default: 'aspect-square',
  },
  hoverScale: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div :class="['overflow-hidden bg-cream', aspectClass]">
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :class="[
        'w-full h-full object-cover object-[center_35%]',
        hoverScale && 'transition-transform duration-300 ease-in-out group-hover:scale-105',
      ]"
    />
  </div>
</template>
