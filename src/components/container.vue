<script setup>
defineProps({
  title: String,
});
</script>
<template>
  <div class="p-4 items-center min-h-screen mt-4">
    <h1
      class="
        text-center
        uppercase
        font-bold
        text-xl
        underline
        my-8
        dark:text-indigo-100
      "
    >
      {{ title }}
    </h1>

    <slot />
  </div>
</template>