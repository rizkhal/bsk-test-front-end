<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  src: String,
});

const state = reactive({
  loaded: false,
});

onMounted(() => {
  setTimeout(() => {
    state.loaded = true;
  }, 20);
});
</script>
<template>
  <span
    class="lazy-load-image-background blur"
    :class="{ 'lazy-load-image-loaded': state.loaded }"
  >
    <img :src="src" :class="$attrs.class" />
  </span>
</template>