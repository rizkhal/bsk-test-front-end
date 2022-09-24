<script setup>
import { onMounted } from "vue";
import { initTheme } from "~/composables/theme.js";

onMounted(() => {
  initTheme();
});
</script>
<template>
  <router-view />
</template>
