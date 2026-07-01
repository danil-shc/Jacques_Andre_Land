# Структура данных

Проект **не использует БД**. Все модели — статические JS-модули + reactive client state.

## Product (Food) — `menuProducts[]`

**Файл:** `src/data/products.js`

```ts
{
  id: number,              // unique, used as cart line id
  name: string,
  description: string,
  price: number,           // RUB, integer
  category: 'Выпечка' | 'Десерты',
  image: string,           // bare name, no path/ext → 'croissant_losos'
  isNew?: boolean          // injected only in getFeaturedProducts()
}
```

## Product (Coffee) — `coffeeMenu[]`

```ts
{
  id: string,              // e.g. 'coffee-americano' (NOT cart line id)
  name: string,
  category: 'ГОРЯЧИЕ НАПИТКИ',
  description: string,
  image: string,           // includes .webp, may contain '_coffee.'
  variants: Variant[]
}
```

## Variant (Coffee volume)

```ts
{
  id: string,              // e.g. 'c1' — THIS is cart line id
  volume: string,          // '250мл', '350мл'
  price: number
}
```

## Aggregates

| Export | Состав |
|--------|--------|
| `allMenuProducts` | `[...menuProducts, ...coffeeMenu]` |
| `getFeaturedProducts()` | 8 items from `featuredProductConfig` + `isNew` flag |

## Cart Item — `state.items[]`

**Файл:** `src/store/cart.js`  
**Persistence:** `localStorage['jacques_andre_cart']`

### Food item shape

```ts
{
  id: number,              // product.id
  name: string,
  description: string,
  price: number,
  category: string,
  image: string,
  quantity: number         // added by addToCart, default 1
}
```

### Coffee item shape (after addCoffeeToCart)

```ts
{
  id: string,              // variant.id
  name: string,            // parent name
  volume: string,
  price: number,
  description: string,
  category: string,
  image: string,
  quantity: number
}
```

## ER-диаграмма (логическая)

```
┌─────────────────┐       ┌─────────────────┐
│  menuProducts   │       │   coffeeMenu    │
│  id: number     │       │  id: string     │
│  price: fixed   │       │  variants[]     │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:1                     │ 1:N
         ▼                         ▼
┌─────────────────────────────────────────────┐
│              Cart Item (runtime)             │
│  id = product.id | variant.id               │
│  quantity >= 1                               │
│  persisted JSON in localStorage              │
└─────────────────────────────────────────────┘
```

## Location — `bakeryLocations[]`

**Файл:** `src/data/locations.js`

```ts
{
  id: number,
  title: string,
  address: string,
  dropdownLabel: string,   // used in cart address picker
  phone: string,
  hoursDetailed: string,
  hoursFooter: string,
  image: string,           // resolved URL at module load
  mapLink: string          // Yandex Maps
}
```

**Derived:** `cartAddressOptions = locations.map(l => l.dropdownLabel)`

## FAQ — `faqItems[]`

**Файл:** `src/data/faq.js` — `{ question, answer }[]`

## Category mapping (URL ↔ filter)

| Query key (`?category=`) | Menu filter value |
|--------------------------|-------------------|
| `cakes` | `Десерты` |
| `baking` | `Выпечка` |
| `hearty` | `Выпечка` |
| `breakfast` | `Выпечка` |

Menu categories enum: `['ВСЕ', 'Выпечка', 'Десерты', 'ГОРЯЧИЕ НАПИТКИ']`

## Pricing rules (CartView computed)

| Rule | Logic |
|------|-------|
| Subtotal | Σ(price × quantity) |
| Delivery | 0 if subtotal ≥ 1500, else 150 ₽ |
| Promo `JACQUES` | −10% (client-side only) |
| Total | subtotal − discount + delivery |

## Image resolution by field

| Pattern | `image` value example | Resolved path |
|---------|----------------------|---------------|
| Food | `tort_ameli` | `assets/images/tort_ameli.webp` |
| Coffee | `latte_coffee.webp` | `assets/images/coffee/latte_coffee.webp` |

## Что отсутствует

- User / session models
- Order history
- Inventory / stock
- Server-side product schema
- Migrations / ORM
