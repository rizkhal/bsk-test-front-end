import ImgBlur from "~/components/img.vue";
import Alert from "~/components/alert.vue";
import Loading from "~/components/loading.vue";
import Container from "~/components/container.vue";

import BlogForm from "~/components/blog/form.vue";
import PostCard from "~/components/post/card.vue";
import PostCards from "~/components/post/cards.vue";

import VueMarkdown from "vue-markdown-render";

export default {
  install(app, config) {
    // common
    app.component("v-img", ImgBlur);
    app.component("v-alert", Alert);
    app.component("v-loading", Loading);
    app.component("v-container", Container);

    app.component("vue-markdown", VueMarkdown);

    // book
    app.component("v-blog-form", BlogForm);
    app.component("v-post-card", PostCard);
    app.component("v-post-cards", PostCards);
  },
};
