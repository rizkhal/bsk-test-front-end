<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useBlog } from "~/stores/post";

const HTTP_CODE_CREATED = 201;

const show = ref(false);

const store = useBlog();
const { loading, error } = storeToRefs(useBlog());

const form = reactive({
  title: null,
  summary: null,
  content: null,
  thumbnail: null,
  category_id: null,
});

const handleThumbnailChange = (file) => {
  form.thumbnail = file;
};

const save = async () => {
  const response = await store.save(form);

  if (response?.status == HTTP_CODE_CREATED) {
    show.value = true;
    error.value = null;
    Object.keys(form).forEach(function (key) {
      form[key] = "";
    });
  } else {
    error.value = response.response.data.errors;
  }
};
</script>
<template>
  <v-container title="create posts">
    <v-alert v-show="show" type="success" message="Success add new post" />

    <v-blog-form
      :errors="error"
      v-model:title="form.title"
      v-model:summary="form.summary"
      v-model:content="form.content"
      v-model:category="form.category_id"
      @onThumbnailChange="(file) => (form.thumbnail = file)"
    />

    <button
      @click.prevent="save"
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
      <span v-else>Save</span>
    </button>
  </v-container>
</template>