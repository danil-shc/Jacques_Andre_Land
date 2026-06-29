import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"; // landing

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/menu", name: "Menu", component: () => import("@/views/MenuView.vue") },
  { path: "/locations", name: "Locations", component: () => import("@/views/LocationsView.vue") },
  { path: "/cart", name: "Cart", component: () => import("@/views/CartView.vue") },
  { path: "/faq", name: "Faq", component: () => import("@/views/FaqView.vue") },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
