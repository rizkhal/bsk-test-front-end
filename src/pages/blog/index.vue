<script setup>
import { storeToRefs } from "pinia";
import { useBlog } from "~/stores/post";
import { ref, onMounted, onUnmounted } from "vue";

const { fetch, destroy } = useBlog();
const { loading, posts, total, page, error } = storeToRefs(useBlog());

const show = ref(false);

onMounted(async () => {
  await fetch();
});

const remove = async (slug) => {
  if (confirm("Delete it?")) {
    await destroy(slug);
    show.value = true;
  }
};
</script>
<template>
  <v-container title="posts lists">
    <v-alert v-show="show" type="success" message="Success delete post" />

    <router-link
      to="/admin/blogs/create"
      class="
        px-4
        py-2
        rounded-md
        text-white
        bg-red-500
        focus:ring-2 focus:ring-offset-2 focus:ring-red-500
      "
    >
      Create
    </router-link>

    <div class="mt-8 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <th scope="col" class="py-3 px-6">Title</th>
            <th scope="col" class="py-3 px-6">Category</th>
            <th scope="col" class="py-3 px-6">Author</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!loading && !posts.length">
            <tr class="bg-white border-t dark:bg-gray-900 dark:border-gray-700">
              <td class="py-4 px-6 text-center" colspan="4">
                <span>Kosong</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(item, index) in posts"
              :key="index"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                class="
                  py-4
                  px-6
                  font-medium
                  text-gray-900
                  whitespace-nowrap
                  dark:text-white
                "
              >
                {{ item.title }}
              </th>
              <td class="py-4 px-6">{{ item.category.name }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center space-x-2">
                  <v-img
                    :src="item.author.profile_picture"
                    class="w-10 h-10 rounded-md"
                  />
                  <div class="flex flex-col">
                    <span>{{ item.author.name }}</span>
                    <span>Admin</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-row space-x-2">
                  <router-link
                    :to="`/admin/blogs/${item.slug}/edit`"
                    class="
                      font-medium
                      text-blue-600
                      dark:text-blue-500
                      hover:underline
                    "
                    >Edit</router-link
                  >
                  <button
                    @click.prevent="remove(item.slug)"
                    class="
                      font-medium
                      text-red-600
                      dark:text-red-500
                      hover:underline
                    "
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </v-container>
</template>