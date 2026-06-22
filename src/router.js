import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import LocationsView from "@/views/LocationsView.vue";
import CartView from "@/views/CartView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/menu", name: "Menu", component: MenuView },
  { path: "/locations", name: "Locations", component: LocationsView },
  { path: "/cart", name: "Cart", component: CartView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
