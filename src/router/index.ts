import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Contacts from "../views/Contacts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contactos/add",
      name: "add",
      component: () => import("../views/ContactForm.vue"),
    },
    {
      path: "/contactos/id/:id",
      name: "id",
      component: () => import("../views/ContactForm.vue"),
    },
    {
      path: "/contactos/:type?",
      name: "list",
      component: () => Contacts,
    },
  ],
});

export default router;
