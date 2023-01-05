import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";
import useAuthUser from "@/composables/useAuthUser";

const routes = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/views/EmailConfirmationPage.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: () => import("@/views/ForgotPasswordPage.vue"),
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
        component: () => import("@/views/HomePage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "library",
        component: () => import("@/views/LibraryPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "goals",
        component: () => import("@/views/GoalsPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        component: () => import("@/views/ProfilePage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "search",
        component: () => import("@/views/SearchPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "add-goals",
        component: () => import("@/views/AddGoalsPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "audiolist-player/:title",
        component: () => import("@/views/AudioListPlayerPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "item-details/:title",
        component: () => import("@/views/ItemDetailsPage.vue"),
      },
      {
        path: "audio-player/:title",
        component: () => import("@/views/AudioPlayerPage.vue"),
      },
      {
        path: "breathe",
        component: () => import("@/views/BreathePage.vue"),
      },
      {
        path: "timer-player",
        component: () => import("@/views/TimerPlayer.vue"),
      },
      {
        path: "breathe-player",
        component: () => import("@/views/BreathePlayerPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
  const { isLoggedIn } = useAuthUser();
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: "Login" };
  }
});

export default router;
