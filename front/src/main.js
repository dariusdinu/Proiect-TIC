import { createApp } from "vue";
import App from "./App.vue";
import TheHeader from "./components/TheHeader.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.component("the-header", TheHeader);

app.use(store);
app.use(router);
app.mount("#app");
