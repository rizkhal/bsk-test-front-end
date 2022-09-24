<script setup>
defineProps({
  errors: {
    type: Object,
    required: false,
  },
  title: {
    type: [String, null],
    required: true,
  },
  description: {
    type: [String, null],
    required: true,
  },
});

defineEmits(["update:title", "update:description"]);
</script>
<template>
  <form class="flex flex-col space-y-4">
    <div class="flex flex-col">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        :value="title"
        class="rounded-md"
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
      <label for="description">Description</label>
      <textarea
        id="description"
        class="rounded-md"
        :value="description"
        :class="{
          'border-red-500': errors?.description,
        }"
        @input="$emit('update:description', $event.target.value)"
      />
      <span class="mt-1 text-red-500" v-if="errors?.description">
        {{ errors.description[0] }}
      </span>
    </div>
  </form>
</template>