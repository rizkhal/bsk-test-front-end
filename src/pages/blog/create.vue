<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useBlog } from "~/stores/blog";

const HTTP_CODE_CREATED = 201;

const show = ref(false);

const suggestion = useBlog();
const { loading, error } = storeToRefs(useBlog());

const form = reactive({
  title: null,
  description: null,
});

const save = async () => {
  const response = await suggestion.save(form);

  if (response.status == HTTP_CODE_CREATED) {
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
    <v-alert v-show="show" type="success" message="Berhasil menambah saran" />

    <v-blog-form
      :errors="error"
      v-model:title="form.title"
      v-model:description="form.description"
    />

    <button
      @click.prevent="save"
      class="
        mt-4
        py-2
        px-4
        rounded-md
        text-white
        bg-indigo-500
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
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