import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/homePage.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/libraryPage.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/goalsPage.vue"),
      },
      {
        path: "tab4",
        component: () => import("@/views/profilePage.vue"),
      },
      {
        path: "/tabs/tab2/search",
        component: () => import("@/views/searchPage.vue"),
      },
      {
        path: "/tabs/tab3/add-goals",
        component: () => import("@/views/addGoalsPage.vue"),
      },
      {
        path: "/tabs/tab2/music-player",
        component: () => import("@/views/musicPlayerPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
