import { ref } from "vue";

/**
 * "Fly to cart" animation engine.
 *
 * A tiny reactive-singleton (same pattern as `useCart`) that coordinates the
 * flourish shown when a product is added to the basket:
 *
 *   1. A `position: fixed` clone of the product image flies from the "+" button
 *      to the cart icon along a quadratic Bézier arc (rAF + easeOut), shrinking,
 *      rotating and dissolving on the way.
 *   2. On landing the header badge "ticks up" (its count lags behind the real
 *      cart via `pendingCount` so the number only appears when the clone
 *      arrives), the cart icon does a squash-&-stretch bounce and a small
 *      firework of brand-coloured particles bursts out.
 *
 * `prefers-reduced-motion` short-circuits everything: the caller has already
 * mutated the cart, so we simply do nothing and the count updates instantly.
 */

// The cart-icon element in the header, registered on mount so flights know
// where to land. Shared across every component via the singleton.
const cartIconEl = ref(null);

// Items currently mid-flight. The header subtracts this from the real cart
// total so the badge only increments at the moment a clone lands.
const pendingCount = ref(0);

// Warm, on-brand palette for the firework particles.
const PARTICLE_COLORS = ["#7E4B30", "#4B2307", "#C8A27C", "#A9713F", "#E4C9A8"];

const FLIGHT_DURATION = 820;
const BURST_DURATION = 620;
const PARTICLE_COUNT = 16;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth ease-in-out — the clone glides out of the button and settles into the
// cart instead of launching abruptly.
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Peak opacity while airborne — kept low so the clone reads as a light,
// translucent ghost rather than a solid card.
const FLIGHT_OPACITY = 0.6;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Minimal requestAnimationFrame driver. `onFrame(t)` receives linear progress
 * in [0, 1]; `onDone` fires once when the timeline completes.
 */
function runTimeline(duration, onFrame, onDone) {
  let startTs = null;
  const step = (ts) => {
    if (startTs === null) startTs = ts;
    const t = Math.min(1, (ts - startTs) / duration);
    onFrame(t);
    if (t < 1) {
      requestAnimationFrame(step);
    } else if (onDone) {
      onDone();
    }
  };
  requestAnimationFrame(step);
}

function buildClone(imageUrl, size) {
  const clone = document.createElement("div");
  clone.setAttribute("aria-hidden", "true");
  Object.assign(clone.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "9999",
    willChange: "transform, opacity",
    boxShadow: "0 6px 16px rgba(44, 27, 17, 0.16)",
  });

  if (imageUrl) {
    clone.style.backgroundImage = `url("${imageUrl}")`;
    clone.style.backgroundSize = "cover";
    clone.style.backgroundPosition = "center";
  } else {
    // Products without a photo fall back to the card's espresso→caramel gradient.
    clone.style.background = "linear-gradient(135deg, #4B2307, #C8A27C)";
  }

  return clone;
}

/** Restart a CSS animation from the start, even during rapid repeat clicks. */
function retriggerAnimation(el, className) {
  el.classList.remove(className);
  // Force reflow so the browser registers the removal before we re-add.
  void el.offsetWidth;
  el.classList.add(className);
}

function bounceCart() {
  if (cartIconEl.value) retriggerAnimation(cartIconEl.value, "cart-bounce");
}

/** ~16 particles fan out from the cart centre with gravity + fade. */
function spawnFireworks() {
  const anchor = cartIconEl.value;
  if (!anchor) return;

  const rect = anchor.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const fragment = document.createDocumentFragment();
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement("div");
    const dotSize = 6 + Math.random() * 4;
    Object.assign(el.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      marginLeft: `${-dotSize / 2}px`,
      marginTop: `${-dotSize / 2}px`,
      borderRadius: "9999px",
      background: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      pointerEvents: "none",
      zIndex: "9998",
      willChange: "transform, opacity",
    });
    fragment.appendChild(el);

    // Even spread around the circle, with a little jitter for organic motion.
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.4;
    const reach = 42 + Math.random() * 46;
    particles.push({
      el,
      vx: Math.cos(angle) * reach,
      vy: Math.sin(angle) * reach,
    });
  }

  document.body.appendChild(fragment);

  const gravity = 64; // downward drift accumulated over the burst
  runTimeline(
    BURST_DURATION,
    (t) => {
      const spread = 1 - Math.pow(1 - t, 2); // ease-out travel outward
      const scale = Math.max(0, 1 - t);
      const opacity = Math.max(0, 1 - t);
      for (const p of particles) {
        const x = p.vx * spread;
        const y = p.vy * spread + gravity * t * t;
        p.el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        p.el.style.opacity = String(opacity);
      }
    },
    () => {
      for (const p of particles) p.el.remove();
    },
  );
}

/**
 * Launch the flight. Coordinates are read live via getBoundingClientRect() so
 * it works at any scroll position, breakpoint or layout.
 *
 * @param {HTMLElement} originEl - the clicked "+" button
 * @param {string|null} imageUrl - resolved product image URL for the clone
 */
function flyToCart({ originEl, imageUrl } = {}) {
  const cartEl = cartIconEl.value;

  // No motion wanted, or nothing to anchor to → the cart was already updated by
  // the caller, so there is simply nothing to animate.
  if (prefersReducedMotion() || !originEl || !cartEl) return;

  const startRect = originEl.getBoundingClientRect();
  const endRect = cartEl.getBoundingClientRect();

  const p0 = {
    x: startRect.left + startRect.width / 2,
    y: startRect.top + startRect.height / 2,
  };
  const p2 = {
    x: endRect.left + endRect.width / 2,
    y: endRect.top + endRect.height / 2,
  };

  // Control point for a gentle arc: a modest rise above the straight line plus
  // a slight drift toward the cart. The cart sits at the very top of the sticky
  // header, so the rise is deliberately small and the point is clamped inside
  // the viewport — because a quadratic Bézier stays within the convex hull of
  // its three points, keeping the control point on-screen keeps the whole flight
  // on-screen (no more clipping off the top).
  const midX = (p0.x + p2.x) / 2;
  const midY = (p0.y + p2.y) / 2;
  const dist = Math.hypot(p2.x - p0.x, p2.y - p0.y);
  const rise = Math.min(dist * 0.26, 96);
  const margin = 28;
  const p1 = {
    x: clamp(midX + (p2.x - p0.x) * 0.16, margin, window.innerWidth - margin),
    y: clamp(midY - rise, margin, window.innerHeight - margin),
  };

  const size = Math.round(Math.min(72, Math.max(46, startRect.width * 1.6)));
  const spin = 40 + Math.random() * 70; // gentle tilt, well under a full turn
  const spinDir = Math.random() < 0.5 ? -1 : 1;

  const clone = buildClone(imageUrl, size);
  document.body.appendChild(clone);

  // Reserve a "pending" slot so the header badge waits for the landing.
  pendingCount.value++;
  let landed = false;
  const land = () => {
    if (landed) return;
    landed = true;
    pendingCount.value = Math.max(0, pendingCount.value - 1);
    bounceCart();
    spawnFireworks();
  };

  runTimeline(
    FLIGHT_DURATION,
    (raw) => {
      const t = easeInOut(raw);
      const mt = 1 - t;
      // Quadratic Bézier: (1-t)²·p0 + 2(1-t)t·p1 + t²·p2
      const x = mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x;
      const y = mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y;
      const scale = 1 - 0.55 * t; // 1 → ~0.45
      const rotate = spinDir * spin * t;
      // Soft fade-in, a translucent cruise, then dissolve into the cart.
      let opacity = FLIGHT_OPACITY;
      if (raw < 0.12) opacity = FLIGHT_OPACITY * (raw / 0.12);
      else if (raw > 0.72)
        opacity = FLIGHT_OPACITY * Math.max(0, 1 - (raw - 0.72) / 0.28);
      clone.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) scale(${scale}) rotate(${rotate}deg)`;
      clone.style.opacity = String(opacity);
    },
    () => {
      clone.remove();
      land();
    },
  );
}

function registerCartIcon(el) {
  cartIconEl.value = el ?? null;
}

export function useFlyToCart() {
  return {
    pendingCount,
    registerCartIcon,
    flyToCart,
  };
}
