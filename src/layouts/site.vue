<script setup>
import { ref, onMounted } from "vue";
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";
import { currentTheme, switchTheme } from "~/composables/theme.js";

const navbar = ref(null);

onMounted(() => {
  window.onscroll = function () {
    if (window.pageYOffset > navbar.value?.offsetTop) {
      navbar.value?.classList.add("navbar-fixed");
    } else {
      navbar.value?.classList.remove("navbar-fixed");
    }
  };
});
</script>
<template>
  <header
    ref="navbar"
    class="
      bg-transparent
      absolute
      top-0
      left-0
      w-full
      flex
      items-center
      z-10
      bg-white
      dark:bg-gray-900 dark:bg-transparent
    "
  >
    <div class="container mx-auto p-4">
      <div class="flex items-center justify-between px-4">
        <ul class="flex space-x-20 text-gray-900 dark:text-white">
          <li><router-link to="/auth/login">Login</router-link></li>
        </ul>
        <button
          @click.prevent="switchTheme()"
          class="
            p-1
            bg-gray-200
            dark:bg-gray-700
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-200
            dark:focus:ring-gray-700
          "
        >
          <SunIcon
            v-if="currentTheme == 'light'"
            class="w-5 h-5 text-gray-600"
          />
          <MoonIcon
            v-if="currentTheme == 'dark'"
            class="w-5 h-5 text-gray-200"
          />
        </button>
      </div>
    </div>
  </header>

  <div class="p-6 pt-[110px] pb-[60px] min-h-screen dark:bg-gray-900">
    <router-view />
  </div>
</template>
