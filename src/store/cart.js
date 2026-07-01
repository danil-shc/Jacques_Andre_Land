import { reactive, computed, watch } from "vue";

const CART_STORAGE_KEY = "jacques_andre_cart";

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const state = reactive({
  items: loadCartFromStorage(),
});

watch(
  () => state.items,
  (items) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors or unavailable storage
    }
  },
  { deep: true },
);

export function useCart() {
  const cartItems = computed(() => state.items);

  const totalItems = computed(() =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const totalPrice = computed(() => {
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  });

  function addToCart(product) {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({
        ...product,
        quantity: 1,
      });
    }
  }

  function increaseQuantity(item) {
    item.quantity++;
  }

  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      state.items = state.items.filter((i) => i.id !== item.id);
    }
  }

  function removeFromCart(item) {
    state.items = state.items.filter((i) => i.id !== item.id);
  }

  function clearCart() {
    state.items = [];
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
}
