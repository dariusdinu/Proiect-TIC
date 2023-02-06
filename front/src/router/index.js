import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PlantDetail from "../views/plants/PlantDetail.vue";
import PlantEdit from "../views/plants/PlantEdit.vue";
import AllRemindersView from "../views/reminders/AllRemindersView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresLogin: true },
  },
  {
    path: "/plants/:id",
    name: "plant-detail",
    component: PlantDetail,
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: "/plants/:id/edit",
    name: "coach-edit",
    component: PlantEdit,
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresUnLogin: true },
  },
  {
    path: "/add-plant",
    name: "add-plant",
    component: () => import("../views/plants/AddPlantView.vue"),
    meta: { requiresLogin: true },
  },
  {
    path: "/plants/:id/reminders",
    name: "plant-reminders",
    component: () => import("../views/reminders/RemindersView.vue"),
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: "/plants/:id/reminders/:reminderId/edit",
    name: "editReminder",
    component: () => import("../views/reminders/EditReminderView.vue"),
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: "/plants/:id/reminders/add",
    name: "add-reminder",
    component: () => import("../views/reminders/AddReminderView.vue"),
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: "/reminders",
    name: "get-all-reminders",
    component: AllRemindersView,
    props: true,
    meta: { requiresLogin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _from, next) {
  if (to.meta.requiresLogin && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnLogin && store.getters.isAuthenticated) {
    next("/");
  }
  next();
});
export default router;
