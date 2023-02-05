import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PlantDetail from "../views/plants/PlantDetail.vue";
import PlantEdit from "../views/plants/PlantEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/plants/:id",
    name: "plant-detail",
    component: PlantDetail,
    props: true,
  },
  {
    path: "/plants/:id/edit",
    name: "coach-edit",
    component: PlantEdit,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/add-plant",
    name: "add-plant",
    component: () => import("../views/plants/AddPlantView.vue"),
  },
  {
    path: "/plants/:id/reminders",
    name: "plant-reminders",
    component: () => import("../views/reminders/RemindersView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
