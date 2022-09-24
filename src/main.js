import { createApp } from "vue";
import router from "~/routes";
import "~/assets/styles/fonts.css";
import "~/assets/styles/main.css";
import "~/assets/styles/tailwind.css";
import { createPinia } from "pinia";

import App from "~/app.vue";
import RegisterGlobalComponent from "~/components/index";

import utils from "./utils";

const app = createApp(App);
app.use(createPinia());
app.use(RegisterGlobalComponent);
app.use(router);
app.use(utils);
app.mount("#app");
