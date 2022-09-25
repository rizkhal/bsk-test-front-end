<script setup>
import { storeToRefs } from "pinia";
import { useBlog } from "~/stores/post";
import { onMounted, onUnmounted } from "vue";

const { fetch } = useBlog();
const { loading, posts, total, page, error } = storeToRefs(useBlog());

const loadMore = () => {
  if (window.innerHeight + window.scrollY + 300 >= document.body.scrollHeight) {
    if (posts.value.length < total.value) {
      page.value++;
      fetch();
    }
  }
};

onMounted(() => {
  fetch();
  window.addEventListener("scroll", loadMore);
});

onUnmounted(() => window.removeEventListener("scroll", loadMore));
</script>
<template>
  <div class="mb-8">
    <p class="text-2xl dark:text-gray-300">
      <span class="font-bold">Latest</span> <span>Update</span>
    </p>
    <p class="dark:text-gray-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum animi
      mollitia eveniet nulla ad provident facere assumenda!
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <v-post-cards :items="posts" />
  </div>
</template>