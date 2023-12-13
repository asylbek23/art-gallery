import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layout/default.vue";
import Home from "@/views/Home.vue";
import PhotoPage from "@/views/PhotoPage.vue";
import FavoritesPage from "@/views/FavoritesPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/photo/:id",
        name: "photo",
        component: PhotoPage,
      },
      {
        path: "/favorites",
        name: "favorites",
        component: FavoritesPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
