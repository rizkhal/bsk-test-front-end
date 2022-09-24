import Alert from "~/components/alert.vue";
import Loading from "~/components/loading.vue";
import Container from "~/components/container.vue";

import BlogForm from "~/components/blog/form.vue";

export default {
  install(app, config) {
    // common
    app.component("v-alert", Alert);
    app.component("v-loading", Loading);
    app.component("v-container", Container);

    // book
    app.component("v-blog-form", BlogForm);
  },
};
