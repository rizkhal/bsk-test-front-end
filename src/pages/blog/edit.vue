<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBlog } from "~/stores/post";
import { useRoute } from "vue-router";

const HTTP_OK = 200;

const show = ref(false);

const { fetch, update: updatePost } = useBlog();
const { slug } = useRoute().params;
const { loading, post, error } = storeToRefs(useBlog());

const form = reactive({
  title: null,
  summary: null,
  content: null,
  thumbnail: null,
  category_id: null,
});

onMounted(async () => {
  await fetch(slug);

  form.title = post.value.title;
  form.summary = post.value.summary;
  form.content = post.value.content;
  form.category_id = post.value.category.id;
});

const update = async () => {
  const response = await updatePost(form, slug);

  if (response?.status == HTTP_OK) {
    show.value = true;
    error.value = null;
  } else {
    error.value = response.response.data.errors;
  }
};
</script>
<template>
  <v-container title="create posts">
    <v-alert v-show="show" type="success" message="Success update post" />

    <v-blog-form
      :errors="error"
      v-model:title="form.title"
      v-model:summary="form.summary"
      v-model:content="form.content"
      v-model:category="form.category_id"
      @onThumbnailChange="(file) => (form.thumbnail = file)"
    />

    <button
      @click.prevent="update"
      class="
        mt-4
        py-2
        px-4
        rounded-md
        text-white
        bg-red-500
        focus:ring-2 focus:ring-offset-2 focus:ring-red-500
      "
      :disabled="loading"
      :class="{
        'disabled disabled:bg-opacity-75': loading,
      }"
    >
      <span v-if="loading">Loading..</span>
      <span v-else>Update</span>
    </button>
  </v-container>
</template>