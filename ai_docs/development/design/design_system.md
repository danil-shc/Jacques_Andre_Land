# Design System — Quiet Luxury

Источник истины: `src/style.css` (`@theme`) + повторяющиеся паттерны в компонентах.

## Цветовая палитра

| Token (Tailwind) | Hex | Применение |
|------------------|-----|------------|
| `cream` | `#FDFBF7` | Основной фон страницы, hero CTA |
| `espresso` | `#2C1B11` | Promo bar, primary buttons, dark blocks, badges |
| `chocolate` | `#4B2307` | Заголовки, основной текст, logo |
| `caramel` | `#7E4B30` | Акценты, nav links, secondary labels |
| `card` | `#F5F0E8` | Фон product cards |

### Дополнительные hex (inline, не в @theme)

| Hex | Использование |
|-----|---------------|
| `#3D2314` | Hover-состояние nav links, underline expand |
| `#1C1A17` | Manifesto body text (`/75` opacity) |
| `rgba(44,27,17,…)` | Тени карточек (espresso-based) |

### Запрещено

- Default Tailwind grays (`bg-gray-*`, `text-gray-*`) — в CartView частично используется `stone-*` (legacy); новый код → warm tokens
- Холодные синие/нейтральные оттенки

## Типографика

| Роль | Класс | Шрифт | Характер |
|------|-------|-------|----------|
| Hero / section titles | `font-serif` | Cormorant Garamond | Elegant, `tracking-wide` / `tracking-widest` |
| UI, nav, buttons, cards | `font-sans` | Jost | `tracking-wider` / `tracking-widest`, often `uppercase` |
| Weights | — | 300–600 subset | Light body в manifesto, semibold CTA |

Шрифты: `src/assets/fonts/subset-*.woff2`, preload в `index.html`.

## Spacing & Layout

- Section padding: `py-8 md:py-24`, `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 md:px-6`
- Grid gaps: `gap-3 md:gap-8`
- Luxury = generous whitespace, не плотные блоки

## Transitions

Стандарт: `transition-all duration-300 ease-in-out`

Исключения:
- Category image hover: `duration-700 ease-out` + `scale-105`
- 3D flip: `0.6s ease-in-out` (scoped CSS ProductCard)
- Stepper fade: `0.25s` opacity + scale

## Паттерн: Espresso Hover Underline

Аbsolute pseudo-element под текстом ссылок навигации.

### Desktop nav (`HeaderSection.vue`)

```html
<span class="relative inline-block pb-0.5">
  Меню
  <span class="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-in-out"
        :class="active ? 'w-full bg-caramel' : 'w-0 bg-[#3D2314] group-hover:w-full'">
  </span>
</span>
```

**Правила:**
1. Родитель — `group relative inline-block`
2. Underline — `absolute bottom-0 left-0 h-[1.5px]`
3. Default: `w-0`, hover/active: `w-full`
4. Active route: `w-full bg-caramel`; hover inactive: `bg-[#3D2314]`
5. Text hover: `hover:text-[#3D2314]`

### Category filters (`MenuView.vue`)

Тот же паттерн на кнопках категорий:
- Active: `text-caramel`, underline `w-full !bg-caramel`
- Inactive: `text-caramel/50`, underline `w-0 group-hover:w-full`

### Footer / mobile menu

- Footer links: underline `w-0 → group-hover:w-full`
- Mobile overlay: cream underline on dark bg

## Кнопки

| Тип | Стиль |
|-----|-------|
| Primary | `bg-espresso text-cream uppercase tracking-[0.2em] hover:bg-espresso/90` |
| Secondary / outline | `border border-chocolate bg-transparent hover:bg-espresso hover:text-cream` |
| Icon circle (add to cart) | `w-9 h-9 rounded-full bg-espresso text-cream` |

## Карточки продуктов

- Background: `bg-card`
- Radius: `rounded-[20px]`
- Shadow: `shadow-[0_2px_16px_rgba(44,27,17,0.07)] hover:shadow-lg`

## Иконки

`lucide-vue-next`, stroke-width 1–2, цвета из palette (`text-chocolate`, `text-caramel`).

## Custom scale

`scale-115` → CSS variable `--scale-115: 1.15` — pulse корзины при добавлении товара (`HeaderSection`).

## Lazy placeholders

- `placeholder-loading.svg`
- `placeholder-error.svg`

Registered in `main.js` via vue3-lazyload.
