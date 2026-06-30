# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing + ordering site for **Jacques André**, an artisan bakery/café in Maykop. Vue 3 (Composition API, `<script setup>`) + Vite + Tailwind CSS v4. All UI copy is in Russian. A core design principle (stated in the README) is that the site is **100% self-contained**: no external fonts, CDNs, or remote assets — everything is bundled locally.

## Commands

```bash
npm run dev       # Vite dev server (bound to 127.0.0.1)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

There is **no test runner and no linter configured** — `dev`, `build`, `preview` are the only scripts. Validate changes by building and by manual inspection in the dev server.

Deployment is Vercel (`vercel.json` rewrites all routes to `/index.html` for SPA history-mode routing).

## Conventions

- **Commits must follow [Conventional Commits](https://www.conventionalcommits.org/)** — `type(scope): subject` (e.g. `feat(cart): add delivery fee`, `fix(menu): correct category filter`). Common types: `feat`, `fix`, `refactor`, `style`, `perf`, `chore`, `docs`.
- Import alias `@` → `src/` (configured in `vite.config.js`). Prefer it over deep relative paths.

## Architecture

### State management — no Pinia/Vuex
Cart state lives in a single reactive-singleton module: [src/store/cart.js](src/store/cart.js). It exports a `useCart()` composable over a module-level `reactive()` state, auto-persisted to `localStorage` (key `jacques_andre_cart`) via a deep `watch`. Any component calling `useCart()` shares the same instance.

### No backend — orders go out via WhatsApp
Checkout has no server. [src/views/CartView.vue](src/views/CartView.vue) formats the cart into a text message and opens a `https://wa.me/<phone>?text=...` deep link (`buildWhatsAppUrl`). Pricing, delivery fee, and discount logic all live client-side in this view.

### Image resolution — three coexisting patterns (read carefully before touching images)
Product data stores images as **bare names without path or extension** (e.g. `image: 'tort_ameli'`); the path/extension is resolved at the component. There are three distinct mechanisms in use:

1. **`new URL('../assets/images/${name}', import.meta.url).href`** — wrapped in a local `getImageUrl(name)` that appends `.webp` if no extension. Used in `ManifestoSection`, `CategoriesSection`, `SignaturesSection`, `FooterSection`, and inline in `src/data/locations.js`.
2. **`import.meta.glob('../assets/images/**/*.webp', { eager: true, query: '?url' })`** — used in `MenuView` and `CartView`. Note these views special-case coffee: filenames containing `_coffee.` resolve from the `assets/images/coffee/` subfolder.
3. **`v-lazy` (vue3-lazyload)** — lazy loading is handled by the `vue3-lazyload` plugin registered in [src/main.js](src/main.js), with brand-styled SVG `loading`/`error` placeholders (`assets/images/placeholder-loading.svg`, `placeholder-error.svg`). Use `v-lazy="url"` on `<img>` and `v-lazy:background-image="url"` on background divs — do **not** add native `loading="lazy"` (it was the thing being replaced). Exception: the LCP hero image in `HeroSection.vue` stays eager (`loading="eager"` + `fetchpriority="high"`).

### Menu data & category filtering
[src/data/products.js](src/data/products.js) exports `menuProducts` (food, single `price`) and `coffeeMenu` (drinks with a `variants: [{ volume, price }]` array), combined into `allMenuProducts`. Categories use Russian display names (`'Выпечка'`, `'Десерты'`, `'ГОРЯЧИЕ НАПИТКИ'`). The home page category cards (`CategoriesSection.vue`) navigate to `/menu?category=<key>` using English keys (`cakes`, `baking`, …); `MenuView` maps those keys back to Russian category names via its `categoryMapping` on mount.

### Routing
[src/router.js](src/router.js) — `createWebHistory`, all routes lazy-loaded except `HomeView`. `scrollBehavior` resets to top on every navigation.

### Styling — Tailwind v4, config-in-CSS
There is **no `tailwind.config.js`**. Tailwind v4 is wired through `@tailwindcss/vite`, and the design system is defined in the `@theme` block of [src/style.css](src/style.css): brand color tokens (`cream`, `espresso`, `chocolate`, `caramel`, `card` → usable as `bg-cream`, `text-chocolate`, etc.) and fonts (`font-serif` = Cormorant Garamond, `font-sans` = Jost). Both fonts are self-hosted subset `.woff2`/`.woff` files in `assets/fonts` (`@font-face` in `style.css`); critical ones are `<link rel="preload">`-ed in `index.html`.
