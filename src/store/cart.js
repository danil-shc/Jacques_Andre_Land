import { reactive, computed } from "vue";

const state = reactive({
  items: [],
});

export function useCart() {
  const cartItems = computed(() => state.items);

  const totalItems = computed(() => state.items.length);

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
