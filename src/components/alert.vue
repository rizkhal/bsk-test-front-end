<script setup>
import { reactive } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const classes = reactive({
  "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800":
    props.type == "info",
  "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800":
    props.type == "danger",
  "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800":
    props.type == "success",
  "text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800":
    props.type == "warning",
});
</script>
<template>
  <div
    v-show="show"
    class="p-4 mb-4 text-sm rounded-lg"
    role="alert"
    :class="classes"
  >
    <p>{{ message }}</p>
  </div>
</template>