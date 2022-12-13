import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        component: () => import("@/views/homePage.vue"),
      },
      {
        path: "library",
        component: () => import("@/views/libraryPage.vue"),
      },
      {
        path: "goals",
        component: () => import("@/views/goalsPage.vue"),
      },
      {
        path: "profile",
        component: () => import("@/views/profilePage.vue"),
      },
      {
        path: "search",
        component: () => import("@/views/searchPage.vue"),
      },
      {
        path: "add-goals",
        component: () => import("@/views/addGoalsPage.vue"),
      },
      {
        path: "audios-player",
        component: () => import("@/views/musicPlayerPage.vue"),
      },
      {
        path: "item-details/:title",
        component: () => import("@/views/itemDetailsPage.vue"),
      },
      {
        path: "audio-player/:title",
        component: () => import("@/views/simplifiedAudioPlayerPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
