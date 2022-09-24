<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue-demi";
import { useCategory } from "~/stores/category";

const store = useCategory();
const { loading, categories, error } = storeToRefs(useCategory());

onMounted(() => {
  store.fetch();
});

defineProps({
  errors: {
    type: Object,
    required: false,
  },
  title: {
    type: [String, null],
    required: true,
  },
  category: {
    type: [String, null],
    required: true,
  },
  content: {
    type: [String, null],
    required: true,
  },
});

defineEmits(["update:title", "update:category", "update:content"]);
</script>
<template>
  <form class="flex flex-col space-y-4">
    <div class="flex flex-col">
      <label class="dark:text-gray-300" for="title">Title</label>
      <input
        type="text"
        id="title"
        :value="title"
        class="rounded-md dark:bg-gray-800 dark:text-gray-300"
        :class="{
          'border-red-500': errors?.title,
        }"
        @input="$emit('update:title', $event.target.value)"
      />
      <span class="mt-1 text-red-500" v-if="errors?.title">
        {{ errors.title[0] }}
      </span>
    </div>
    <div class="flex flex-col">
      <label class="dark:text-gray-300" for="category">Category</label>
      <select
        id="category"
        class="rounded-md dark:bg-gray-800 dark:text-gray-300"
        :class="{
          'border-red-500': errors?.category_id,
        }"
        @change="$emit('update:category', $event.target.value)"
      >
        <option selected>Pilih</option>
        <option
          v-for="(item, index) in categories"
          :key="index"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <span class="mt-1 text-red-500" v-if="errors?.category_id">
        {{ errors.category_id[0] }}
      </span>
    </div>
    <div class="flex flex-col">
      <label class="dark:text-gray-300" for="content">Content</label>
      <textarea
        id="content"
        class="rounded-md dark:bg-gray-800 dark:text-gray-300"
        :value="content"
        :class="{
          'border-red-500': errors?.content,
        }"
        @input="$emit('update:content', $event.target.value)"
      />
      <span class="mt-1 text-red-500" v-if="errors?.content">
        {{ errors.content[0] }}
      </span>
    </div>
  </form>
</template>