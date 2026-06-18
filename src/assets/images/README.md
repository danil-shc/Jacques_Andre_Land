# Image Assets

## Required WebP Files

Place the following `.webp` image files in this directory for the site to render correctly:

### Product Images (Menu)
- `achma_kurica.webp` - Ачма с курицей
- `club_sandwich.webp` - Клаб-сэндвич
- `croissant_losos.webp` - Круассан с лососем
- `croissant_pesto.webp` - Круассан с соусом песто
- `limon_tartaletka.webp` - Лимонная тарталетка
- `makaronc.webp` - Макарон
- `sirnik.webp` - Сырник
- `tartaletka.webp` - Тарталетка ассорти
- `tort_ameli.webp` - Торт "Амели"
- `tort_caramel.webp` - Торт "Карамельный"
- `tort_frezie.webp` - Торт "Фрезье"
- `tort_zhak_andre.webp` - Торт "Jacques André"

### Layout/Ambiance Images
- `entry_to_cafe.webp` - Hero banner background image for HeroSection
- `vibe_2.webp` - Interior/ambiance image for ManifestoSection

## Technical Notes

All images are dynamically loaded using Vite's `new URL()` pattern:
```javascript
const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}
```

This ensures proper handling of image paths during both development and production builds.
