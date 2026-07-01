# Безопасность и надёжность

SPA без бэкенда. Защиты — клиентские, ограниченные.

## Input validation

### Promo code (`CartView.applyPromoCode`)

```js
const code = promoCode.value.trim().toUpperCase()
if (code === 'JACQUES') { discountPercent = 10 }
else { discountPercent = 0; promoError = 'Промокод не найден' }
```

- Trim + uppercase normalization
- **Единственный** валидный код: `JACQUES` (−10%)
- Нет rate limiting, нет server verification

### Search filter (`MenuView`)

- Client-side `toLowerCase()` match on name, description, variant volume/price
- No XSS vector: Vue text interpolation escapes HTML

### WhatsApp message (`buildWhatsAppUrl`)

- `encodeURIComponent(message)` — safe URL encoding
- Phone hardcoded: `79002620036`
- User-controlled: cart contents, selected address string

## State protection

### localStorage cart (`cart.js`)

```js
function loadCartFromStorage() {
  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []  // corrupt data → empty cart
  }
}
```

```js
watch(..., {
  try { localStorage.setItem(...) }
  catch { /* ignore quota / private mode */ }
})
```

| Scenario | Behavior |
|----------|----------|
| Invalid JSON | Empty cart |
| Non-array JSON | Empty cart |
| Quota exceeded | Silent fail on save |
| Private browsing | May fail silently |

**Нет:**
- Schema validation of cart item shape on load
- Max items / max quantity limits
- Tamper detection
- Encryption

### Cart quantity edge cases

- `decreaseQuantity` at qty=1 → removes item (not zero-qty ghost)
- Duplicate add merges by `item.id` (increment quantity)
- Coffee variants isolated by `variant.id`

## UI reliability

### Accessibility (partial)

| Feature | Status |
|---------|--------|
| `aria-label` on icon buttons | ✅ ProductCard, Header, Cart |
| Checkout modal `role="dialog"` | ✅ |
| Address dropdown `aria-expanded` | ✅ |
| Focus trap in modal | ❌ |
| Skip links | ❌ |

### Body scroll lock

`HeaderSection`: `document.body.classList.toggle('overflow-hidden', mobileMenuOpen)`  
Cleanup on `onUnmounted`.

### Click outside

`AddressDropdown`: document click listener, removed on unmount.

### External links

Footer/social: `rel="noopener noreferrer"` + `target="_blank"`

## Deployment

- Vercel SPA rewrite — no server-side auth
- No `.env` secrets in repo (phone numbers public in source)
- No CSP headers defined in repo

## Privacy

- Cart stored locally only — no analytics SDK in dependencies
- WhatsApp shares order details with bakery manually
- No cookies, no GDPR banner implemented

## Threat model (кратко)

| Risk | Severity | Mitigation today |
|------|----------|------------------|
| Promo code bypass | Low (no payment) | N/A — cosmetic discount |
| localStorage tampering | Low | User can edit own cart only |
| XSS via product data | Low | Static data, Vue escaping |
| Open redirect | None | No redirect params |
| CSRF | N/A | No server mutations |

## Definition of Done (security baseline)

- [x] Safe JSON parse for cart restore
- [x] URL encoding for WhatsApp deep link
- [x] noopener on external anchors
- [x] Error swallow for storage quota

## Явно НЕ сделано

- [ ] Server-side order validation
- [ ] Input sanitization layer
- [ ] HTTPS enforcement (hosting-level only)
- [ ] Content Security Policy
- [ ] Rate limiting / bot protection
- [ ] Cart item schema validation on hydrate
- [ ] Secure promo / pricing API
- [ ] PII handling policy in UI
