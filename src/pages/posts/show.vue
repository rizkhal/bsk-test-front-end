<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue-demi";
import { useBlog } from "~/stores/post";
import { useRouter, useRoute } from "vue-router";

const { slug } = useRoute().params;
const { fetch } = useBlog();
const { loading, post, error } = storeToRefs(useBlog());

onMounted(async () => {
  await fetch(slug);
});
</script>
<template>
  <div class="container mx-auto">
    <span v-if="loading">Loading</span>
    <div v-if="!loading && post">
      <div class="relative flex flex-col justify-center">
        <v-img class="rounded-lg" :src="post.thumbnail_url" :alt="post.title" />

        <h1 class="mt-4 font-bold text-3xl dark:text-gray-300">
          {{ post.title }}
        </h1>
      </div>

      <article
        class="
          mt-4
          lg:prose-lg
          dark:prose-dark
          prose prose-slate
          prose-headings:underline
          prose-a:text-indigo-500
        "
      >
        <vue-markdown :source="post.content" />
      </article>
    </div>
  </div>
</template>