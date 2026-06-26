import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import LocationsView from "@/views/LocationsView.vue";
import CartView from "@/views/CartView.vue";
import FaqView from "@/views/FaqView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/menu", name: "Menu", component: MenuView },
  { path: "/locations", name: "Locations", component: LocationsView },
  { path: "/cart", name: "Cart", component: CartView },
  { path: "/faq", name: "Faq", component: FaqView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
