# Wireframe — главная страница (`/`)

Источник: `App.vue` + `HomeView.vue` + глобальные `HeaderSection` / `FooterSection`.

## Полная структура страницы (ASCII)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMO BAR (HeaderSection)                                               │
│ bg-espresso | "Доставка... бесплатно по Майкопу от 1500 ₽"              │
├─────────────────────────────────────────────────────────────────────────┤
│ STICKY NAVBAR (HeaderSection)                                           │
│ [☰ mobile]  Меню | Наши пекарни  [ЖАК~АНДРЭ logo]  [🔍] [🛒 badge]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ HERO (HeroSection)                                              │   │
│  │ min-h 45vh / 60vh | bg image + espresso/75 overlay              │   │
│  │   "Ремесленная пекарня и кафе"                                  │   │
│  │   H1: "ТРАДИЦИИ СЕМЬИ И ВКУСА"                                  │   │
│  │   [ПОСМОТРЕТЬ УГОЩЕНИЯ →] ──scroll──► #signatures               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ SIGNATURES (#signatures) — SignaturesSection                    │   │
│  │ H2: "НАША ГОРДОСТЬ"                                             │   │
│  │ grid 2×2 (mobile) / 4 col (lg)                                  │   │
│  │   [ProductCard ×4] — showcase mode (БЕЗ stepper)                │   │
│  │ [ПОСМОТРЕТЬ МЕНЮ] → expand to 8 cards                          │   │
│  │ [ПОСМОТРЕТЬ ПОЛНОЕ МЕНЮ] → /menu                                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────┬──────────────────────────────────────┐ │
│  │ CATEGORIES (CategoriesSection)                                   │ │
│  │ grid 1 col (mobile) / 2 col (md)                                │ │
│  │ ┌─────────────────┐  ┌─────────────────┐                         │ │
│  │ │ Десерты         │  │ Выпечка         │                         │ │
│  │ │ lazy bg image   │  │ lazy bg image   │                         │ │
│  │ │ hover scale-105 │  │ hover scale-105 │                         │ │
│  │ │ → /menu?cakes   │  │ → /menu?baking  │                         │ │
│  │ └─────────────────┘  └─────────────────┘                         │ │
│  └──────────────────────────┴──────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ MANIFESTO (ManifestoSection)                                    │   │
│  │ H2: "НАШИ ОБЫЧАИ"                                               │   │
│  │ ┌──────────────┬──────────────────────────────────────────────┐ │   │
│  │ │ Image vibe_2 │ Dark box bg-espresso "В СЕРДЦЕ АДЫГЕИ"     │ │   │
│  │ └──────────────┴──────────────────────────────────────────────┘ │   │
│  │ 3-col grid: ДОСТАВКА | ПРЕДЗАКАЗ | ЗАБРАТЬ САМОМУ             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER (FooterSection)                                                  │
│ Loyalty SWiP | Адреса ×3 | App Store / Google Play                     │
│ Sub-footer: Telegram | FAQ | Instagram | © 2026                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Другие экраны (кратко)

### `/menu` (MenuView)

```
[Search input — full width border-b]
[Category tabs: ВСЕ | Выпечка | Десерты | ГОРЯЧИЕ НАПИТКИ]
[Product grid 2 col → 4 col lg]
  └── ProductCard WITH stepper + flip
```

### `/cart` (CartView)

```
[H1 Корзина]
[AddressDropdown] (if items > 0)
[Empty state | Items list + Summary sticky sidebar]
[Promo code | Checkout → WhatsApp modal]
```

### `/locations` (LocationsView)

```
[H1 НАШИ ПЕКАРНИ]
[Grid 1→2→3 location cards: image, address, hours, phone, map link]
```

## Навигационные связи с лендинга

| UI-элемент | Destination |
|------------|-------------|
| Hero CTA | scroll `#signatures` |
| Signatures expand | in-place 4→8 cards |
| Signatures full menu | `/menu` |
| Category «Десерты» | `/menu?category=cakes` → filter «Десерты» |
| Category «Выпечка» | `/menu?category=baking` → filter «Выпечка» |
| Header «Меню» | `/menu` |
| Header search icon | `/menu` + focus search input |

## Mapping query → category (MenuView)

```js
{ cakes: 'Десерты', baking: 'Выпечка', hearty: 'Выпечка', breakfast: 'Выпечка' }
```
