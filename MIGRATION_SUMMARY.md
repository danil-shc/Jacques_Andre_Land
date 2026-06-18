# Image Asset Migration - Summary of Changes

## Date: June 18, 2026

### Changes Overview

Successfully refactored the entire project to use Vite's native dynamic asset mechanism with `.webp` format images.

---

## 1. MenuView.vue (`src/views/MenuView.vue`)

### Changes:
- **Image Template Binding**: Updated line 46 to use dynamic helper function
  - Changed: `:src="product.image"` 
  - To: `:src="getImageUrl(product.image)"`
  
- **Product Data Array**: Refactored lines 138-250 to store only filenames without extensions
  - All `image` properties now store base filenames (e.g., `'croissant_losos'` instead of calling `getImageUrl()` during initialization)
  - The helper function is now called in the template, ensuring proper Vite asset resolution

### Helper Function:
```javascript
const getImageUrl = (name) => {
  const imageName = name ? (name.includes('.') ? name : `${name}.webp`) : null
  return imageName ? new URL(`../assets/images/${imageName}`, import.meta.url).href : null
}
```

---

## 2. SignaturesSection.vue (`src/components/SignaturesSection.vue`)

### Changes:
- **Image Extensions**: Updated all product image references from `.jpg` to `.webp`
  - Lines 12, 20, 28, 36, 44, 52: Changed all extensions from `.jpg` to `.webp`
  - Examples: 
    - `'croissant_pesto.jpg'` → `'croissant_pesto.webp'`
    - `'tartaletka.jpg'` → `'tartaletka.webp'`
    - `'achma_kurica.jpg'` → `'achma_kurica.webp'`

### Already Correct:
- Helper function was already implemented correctly (lines 57-60)
- Template binding was already using `:src="getImageUrl(product.image)"` (line 102)

---

## 3. ManifestoSection.vue (`src/components/ManifestoSection.vue`)

### Changes:
- **Added Helper Function**: Implemented `getImageUrl` helper in script setup (lines 1-5)
  ```javascript
  const getImageUrl = (name) => {
    const imageName = name.includes('.') ? name : `${name}.webp`
    return new URL(`../assets/images/${imageName}`, import.meta.url).href
  }
  ```

- **Replaced Empty URL with Local Asset**: Lines 17-24
  - **Removed**: Empty background-image URL (`style="background-image: url('');"`)
  - **Removed**: External Unsplash network dependency
  - **Added**: Local `vibe_2.webp` asset using proper `<img>` tag with Vue binding
  ```vue
  <img
    :src="getImageUrl('vibe_2')"
    alt="Jacques André Interior"
    class="absolute inset-0 w-full h-full object-cover"
  />
  ```

---

## 4. CategoriesSection.vue (`src/components/CategoriesSection.vue`)

### Status: ✅ Already Correct
- Helper function properly implemented (lines 3-6)
- Template correctly uses dynamic binding (lines 16, 37)
- No changes needed

---

## 5. HeroSection.vue (`src/components/HeroSection.vue`)

### Status: ✅ No Changes Required
- Uses external Unsplash URL for hero banner (intentional design choice)
- Not part of local asset migration

---

## Build Verification

✅ **Build Successful** (398ms)

### Processed Images:
All product images correctly bundled as `.webp`:
- achma_kurica.webp (33.69 kB)
- club_sandwich.webp (31.24 kB)
- croissant_losos.webp (33.77 kB)
- croissant_pesto.webp (30.63 kB)
- limon_tartaletka.webp (10.05 kB)
- makaronc.webp (16.87 kB)
- sirnik.webp (28.53 kB)
- tartaletka.webp (53.19 kB)
- tort_ameli.webp (11.77 kB)
- tort_caramel.webp (19.22 kB)
- tort_frezie.webp (15.76 kB)
- tort_zhak_andre.webp (161.51 kB)
- vibe_2.webp (244.55 kB)

---

## Technical Implementation

### Dynamic Asset Helper Pattern
All components use the standardized Vite pattern:

```javascript
const getImageUrl = (name) => {
  const imageName = name.includes('.') ? name : `${name}.webp`
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}
```

### Benefits:
1. ✅ Works correctly with Vite's build optimization
2. ✅ Proper asset fingerprinting for production
3. ✅ Automatic asset copying to dist folder
4. ✅ No runtime concatenation issues
5. ✅ Clean development experience

---

## Next Steps

1. Start dev server: `npm run dev`
2. Verify all images render correctly on all pages:
   - Home page (SignaturesSection, CategoriesSection, ManifestoSection)
   - Menu page (all product cards)
3. Test responsive layouts on different screen sizes

---

## Files Modified

1. `src/views/MenuView.vue` - Product data refactored, template binding updated
2. `src/components/SignaturesSection.vue` - Image extensions updated to .webp
3. `src/components/ManifestoSection.vue` - Helper added, local asset implemented
4. `src/assets/images/README.md` - Documentation created (NEW FILE)
5. `MIGRATION_SUMMARY.md` - This file (NEW FILE)
