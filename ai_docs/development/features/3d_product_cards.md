# Feature: 3D Product Cards (Flip)

**Компонент:** `src/components/ProductCard.vue`  
**Зависимости:** `ProductCardImage.vue`, `useCart()`, optional `provide('productCardShowcase')`

## User Story (AI-adapted)

> Как гость, я хочу нажать иконку «i» на карточке товара, чтобы увидеть состав на обратной стороне карточки с плавным 3D-переворотом, не теряя контекст каталога.

## Триггеры flip

| Действие | Метод | Состояние |
|----------|-------|-----------|
| Клик Info (front) | `flipToBack()` | `isFlipped = true` |
| Клик «НАЗАД» (back) | `flipToFront()` | `isFlipped = false` |

Кнопка Info рендерится только если `product.description` truthy.

## DOM-структура

```
.product-card.product-card__perspective
└── .product-card__flip-inner [:class is-flipped]
    ├── .product-card__face--front   (visible at 0°)
    │   ├── badge НОВИНКА (optional)
    │   ├── info button
    │   ├── ProductCardImage
    │   ├── title, variants, price, stepper
    └── .product-card__face--back    (absolute inset-0, pre-rotated 180°)
        ├── back button
        └── description text
```

## CSS 3D-механика

```css
.product-card__perspective {
  perspective: 1000px;
}

.product-card__flip-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.product-card__flip-inner.is-flipped {
  transform: rotateY(180deg);
}

.product-card__face {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.product-card__face--front {
  transform: rotateY(0deg) translateZ(1px);
}

.product-card__face--back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg) translateZ(1px);
}
```

### Предотвращение артеfactов рендеринга

| Техника | Назначение |
|---------|------------|
| `backface-visibility: hidden` | Скрывает обратную грань при flip |
| `translateZ(1px)` на обеих faces | Устраняет z-fighting / sub-pixel «мерцание» на стыке |
| `-webkit-` prefixes | Safari compatibility |
| `overflow: hidden` + `border-radius: 20px` | Clip контента внутри rounded card |

### transform-gpu

**В текущем коде класс `transform-gpu` НЕ используется.**

GPU-ускорение достигается через:
- CSS 3D transforms (`rotateY`, `preserve-3d`)
- `-webkit-transform-style: preserve-3d`

При доработках можно добавить `will-change: transform` или `transform-gpu` на `.product-card__flip-inner`, но это **не реализовано**.

## Front face — дополнительная логика

- **Кофе с variants:** кнопки объёма, цена зависит от `selectedVariantId`
- **Showcase mode** (`inject productCardShowcase`): stepper скрыт, только цена
- **isNew badge:** из `getFeaturedProducts()` config

## Back face

- Центрированный `product.description`
- Scrollable overflow (`overflow-y-auto`) при длинном тексте

## Definition of Done

- [x] Flip 180° по Y с transition 0.6s
- [x] Front/back faces не видны одновременно
- [x] Кнопка Info с `aria-label="Посмотреть состав"`
- [x] Кнопка «НАЗАД» возвращает на front
- [x] `@click.stop` на info/back — не всплывает к родителям
- [x] Работает в grid MenuView и SignaturesSection

## Явно НЕ сделано

- [ ] Swipe-to-flip на touch
- [ ] Keyboard navigation (Enter/Escape) для flip
- [ ] `transform-gpu` / explicit compositor layer hints
- [ ] Flip анимация при hover (только click)
- [ ] Persist flip state между route changes
- [ ] Reduced-motion media query override

## Файлы для изменения

| Задача | Файл |
|--------|------|
| Flip timing/axis | `ProductCard.vue` `<style scoped>` |
| Скрыть stepper на лендинге | `HomeView.vue` provide |
| Контент back | `src/data/products.js` descriptions |
