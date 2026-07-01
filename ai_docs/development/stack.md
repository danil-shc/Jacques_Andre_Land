# Технический стек

## Runtime-зависимости

| Пакет | Версия (package.json) | Назначение |
|-------|----------------------|------------|
| `vue` | ^3.5.34 | UI framework, Composition API, `<script setup>` |
| `vue-router` | ^4.6.4 | SPA routing, lazy-loaded views |
| `tailwindcss` | ^4.3.1 | Utility-first styling |
| `@tailwindcss/vite` | ^4.3.1 | Tailwind v4 через Vite plugin (без `tailwind.config.js`) |
| `lucide-vue-next` | ^1.0.0 | Локальные SVG-иконки |
| `vue3-lazyload` | ^0.4.2 | Lazy load изображений (`v-lazy`, `v-lazy:background-image`) |

## Dev-зависимости

| Пакет | Назначение |
|-------|------------|
| `vite` | ^8.0.12 — сборка, dev server |
| `@vitejs/plugin-vue` | SFC compiler |

## Конфигурация Vite (`vite.config.js`)

```js
plugins: [vue(), tailwindcss()]
server: { host: "127.0.0.1" }
resolve.alias: { "@": "./src" }
base: "/"
```

## Vue-архитектура

### Composition API only

Все компоненты используют `<script setup>`. Options API не применяется.

### Роутинг (`src/router.js`)

| Path | Component | Lazy |
|------|-----------|------|
| `/` | `HomeView` | нет (eager) |
| `/menu` | `MenuView` | да |
| `/locations` | `LocationsView` | да |
| `/cart` | `CartView` | да |
| `/faq` | `FaqView` | да |

- `createWebHistory` — history mode
- `scrollBehavior` → `{ top: 0 }` на каждой навигации
- Деплой: `vercel.json` rewrites → `/index.html`

### State management

**Pinia/Vuex отсутствуют.**

Единственный store: `src/store/cart.js`

```js
const state = reactive({ items: loadCartFromStorage() })
export function useCart() { /* singleton composable */ }
```

- Deep `watch` → `localStorage` ключ `jacques_andre_cart`
- Любой вызов `useCart()` в любом компоненте — **один и тот же** reactive state

### Provide/Inject

`HomeView` → `provide('productCardShowcase', true)`  
`ProductCard` → `inject('productCardShowcase', false)`

При `showcase === true` stepper **скрыт** (режим витрины на лендинге).

## Tailwind v4

Токены в `src/style.css` блок `@theme`:

```css
--color-cream: #FDFBF7;
--color-espresso: #2C1B11;
--color-chocolate: #4B2307;
--color-caramel: #7E4B30;
--color-card: #F5F0E8;
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-sans: "Jost", sans-serif;
--scale-115: 1.15;
```

Шрифты self-hosted: `src/assets/fonts/*.woff2`

## Три паттерна загрузки изображений

| # | Механизм | Где используется |
|---|----------|------------------|
| 1 | `new URL('../assets/images/${name}', import.meta.url).href` + `.webp` | HeroSection (eager import), ManifestoSection, CategoriesSection, SignaturesSection, FooterSection, locations.js |
| 2 | `import.meta.glob('../assets/images/**/*.webp', { eager: true, query: '?url' })` | MenuView, CartView |
| 3 | `v-lazy` / `v-lazy:background-image` | ProductCardImage, CategoriesSection bg, CartView, LocationsView |

**Правило для кофе:** в glob-паттерне файлы с `_coffee.` резолвятся из `assets/images/coffee/`.

**LCP:** Hero image — `loading="eager"` + `fetchpriority="high"`, без lazyload.

## Checkout flow

```
CartView.checkout()
  → window.open(buildWhatsAppUrl())
  → showCheckoutModal = true
confirmCheckout()
  → clearCart()
  → router.push('/menu')
```

Телефон WhatsApp: `79002620036` (hardcoded в CartView).

## Что отсутствует

- Backend API / ORM / БД
- SSR / Nuxt
- TypeScript
- Unit/E2E tests
- ESLint / Prettier config
