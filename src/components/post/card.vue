<script setup>
defineProps({
  item: Object,
});
</script>
<template>
  <div class="shadow border dark:border-gray-800 rounded-md">
    <router-link :to="`/posts/${item.slug}`">
      <v-img class="rounded-t-lg" :src="item.thumbnail_url" :alt="item.title" />
    </router-link>
    <div class="p-5">
      <div class="flex flex-row justify-between items-center mb-4">
        <div class="flex flex-row space-x-2 items-center">
          <img
            :src="item.author.profile_picture"
            :alt="item.author.name"
            class="w-10 h-10 rounded-md"
          />
          <div class="flex flex-col">
            <span class="font-semibold dark:text-gray-300">
              {{ item.author.name }}
            </span>
            <span class="text-xs dark:text-gray-400">Admin</span>
          </div>
        </div>
        <span class="dark:text-gray-400">
          {{ $h.shortTimestamp(item.created_at) }}
        </span>
      </div>

      <router-link :to="`/posts/${item.slug}`">
        <h5
          class="
            text-gray-900
            dark:text-gray-300
            font-bold
            text-2xl
            tracking-tight
            mb-2
          "
        >
          {{ item.title }}
        </h5>
      </router-link>
      <p class="font-normal text-gray-700 dark:text-gray-400 mb-3">
        <vue-markdown :source="$h.excerpt(item.summary, 140)" />
      </p>
      <router-link
        :to="`/posts/${item.slug}`"
        class="
          text-white
          bg-red-700
          hover:bg-red-800
          focus:ring-4 focus:ring-red-300
          font-medium
          rounded-lg
          text-sm
          px-3
          py-2
          text-center
          inline-flex
          items-center
        "
      >
        Read more
      </router-link>
    </div>
  </div>
</template>