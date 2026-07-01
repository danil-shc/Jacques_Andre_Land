# Разработка — индекс

Техническая документация для AI-агентов.

## Документы

| Документ | Путь | Содержание |
|----------|------|------------|
| Стек | [stack.md](stack.md) | Vue, Vite, Tailwind, state, роутинг, сборка |
| Wireframe лендинга | [screens/landing_wireframe.md](screens/landing_wireframe.md) | ASCII-карта главной страницы |
| Дизайн-система | [design/design_system.md](design/design_system.md) | Цвета, типографика, hover-паттерны |
| 3D-карточки | [features/3d_product_cards.md](features/3d_product_cards.md) | Flip front/back, 3D CSS |
| Stepper корзины | [features/cart_stepper.md](features/cart_stepper.md) | Монолитный stepper на карточке |
| Модели данных | [database_structure.md](database_structure.md) | Products, Cart, Locations |
| Безопасность | [security_and_reliability.md](security_and_reliability.md) | Валидации, localStorage, ограничения |

## Дерево `src/`

```
src/
├── App.vue                 # Layout shell
├── main.js                 # Vue app + vue3-lazyload
├── router.js
├── style.css               # @theme tokens
├── components/
│   ├── HeaderSection.vue   # Promo bar + sticky nav + mobile overlay
│   ├── FooterSection.vue
│   ├── HeroSection.vue
│   ├── SignaturesSection.vue
│   ├── CategoriesSection.vue
│   ├── ManifestoSection.vue
│   ├── ProductCard.vue     # ★ flip + stepper
│   ├── ProductCardImage.vue
│   ├── AddressDropdown.vue
│   └── FaqSection.vue
├── views/
│   ├── HomeView.vue
│   ├── MenuView.vue
│   ├── CartView.vue
│   ├── LocationsView.vue
│   └── FaqView.vue
├── store/
│   └── cart.js             # ★ единственный store
└── data/
    ├── products.js
    ├── locations.js
    └── faq.js
```

## Команды

```bash
npm run dev      # 127.0.0.1, HMR
npm run build    # dist/
npm run preview  # preview production
```

Тестов и линтера **нет** — проверка через `build` + ручной осмотр.
