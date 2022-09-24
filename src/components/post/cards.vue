<script setup>
defineProps({
  items: [Array],
});
</script>
<template>
  <v-post-card v-for="(_, index) in items" :key="index" :item="_" />
</template>