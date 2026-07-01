# Feature: Cart Stepper (Monolithic)

**Компонент:** `src/components/ProductCard.vue` (inline stepper)  
**Override стилей:** `src/views/MenuView.vue` (`:deep()` mobile rules)  
**Store:** `src/store/cart.js`

## User Story (AI-adapted)

> Как гость в каталоге, я хочу добавить товар одним тапом и изменить количество в том же месте карточки, без сдвига соседних элементов сетки (CLS = 0).

## Режимы UI (v-if / v-else)

```
product-card__stepper-slot (FIXED bounding box)
└── <Transition name="fade" mode="out-in">
      ├── v-if quantity === 0  →  [+] add button (key="add")
      └── v-else               →  [- count +] stepper (key="quantity")
```

### Логика количества

```js
getCartLineId()  // product.id OR selected coffee variant.id
getCartItem()    // find in cartItems by lineId
getCartQuantity() // item?.quantity ?? 0
```

- **Первый клик [+]:** `incrementProduct()` → `addToCart` / `addCoffeeToCart`
- **Кофе:** в корзину попадает **variant** (id, volume, price), не parent product
- **Decrement до 0:** `decreaseQuantity` удаляет line item из массива

## Monolithic stepper — фиксированный слот

Цель: слот **не меняет размер** при переключении add ↔ stepper.

### Desktop / default (ProductCard.vue)

| Element | Classes | Approx width |
|---------|---------|--------------|
| Slot container | `product-card__stepper-slot shrink-0 h-9 md:h-10 min-w-9 md:min-w-10` | 36px / 40px min |
| Add button | `w-9 h-9 md:w-10 md:h-10` | 36px / 40px |
| Stepper shell | `h-9 md:h-10 rounded-full border` | ~88–96px computed |
| Stepper btn | `w-8 md:w-9` × `h-9 md:h-10` | 32px / 36px each |
| Count | `min-w-[1.75rem] tabular-nums` | 28px min |

**Вычисленная ширина stepper (md):**  
`36 + 28 + 36 ≈ 100px` — попадает в диапазон **~90–105px**, но задаётся через **компонентные классы**, не через `w-[90px]`/`w-[105px]`.

### Mobile override (MenuView scoped, max-width 767px)

`:deep()` уменьшает все элементы:

| Element | Override |
|---------|----------|
| stepper-slot | `height/min-width: 1.75rem` (28px) |
| add-btn | `1.75rem × 1.75rem`, svg `0.875rem` |
| stepper | `height: 1.75rem` |
| stepper-btn | `width: 1.375rem`, svg `0.75rem` |
| stepper-count | `min-width: 1rem`, `font-size: 0.75rem` |

## Transition между состояниями

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
```

`mode="out-in"` — сначала исчезает add, затем появляется stepper (без overlap).

## Showcase mode (лендинг)

`HomeView` → `provide('productCardShowcase', true)`  
→ блок stepper **не рендерится** (`v-if="!showcase"`).

## Cart page stepper (отдельная реализация)

`CartView.vue` использует **другой UI** — circular bordered buttons, не monolithic pill.  
Не путать с ProductCard stepper.

## Definition of Done

- [x] Toggle add ↔ quantity без изменения layout slot
- [x] `shrink-0` + fixed `min-w` / `h-*` на slot
- [x] Coffee variants → отдельные line items по variant.id
- [x] Mobile deep overrides в MenuView
- [x] Fade transition между состояниями
- [x] Sync с global cart + localStorage
- [x] Header badge pulse on price increase

## Явно НЕ сделано

- [ ] Explicit `w-[90px]` / `w-[105px]` utility classes (используется compositional sizing)
- [ ] `transform-gpu` на stepper
- [ ] Max quantity cap
- [ ] Debounce on rapid clicks
- [ ] Haptic feedback
- [ ] Unified stepper component shared with CartView
- [ ] Stepper на SignaturesSection (намеренно отключён showcase mode)
- [ ] ARIA live region для изменения quantity

## Связанные API (`useCart`)

```js
addToCart(product)
increaseQuantity(item)
decreaseQuantity(item)  // removes if qty → 0
```

## Файлы для изменения

| Задача | Файл |
|--------|------|
| Stepper dimensions | `ProductCard.vue` template + `MenuView.vue` scoped |
| Cart persistence | `src/store/cart.js` |
| Hide on landing | `HomeView.vue` provide |
