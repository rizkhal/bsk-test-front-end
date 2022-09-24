<script setup>
import menus from "./menus";
import { onMounted, ref } from "vue";
import { useAuth } from "~/stores/auth";
import { currentTheme, switchTheme } from "~/composables/theme.js";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";

const route = useRoute();
const router = useRouter();
const { logout: loggedOut } = useAuth();

const title = ref(null);

onBeforeRouteLeave((tr) => {
  title.value = tr.meta.title;
});

onMounted(() => {
  title.value = route.meta.title;
});

const logout = async () => {
  await loggedOut();
  router.push({
    path: "/auth/login",
  });
};
</script>

<template>
  <div class="dark:bg-gray-900 min-h-screen">
    <div
      class="
        p-4
        w-full
        flex flex-row
        justify-between
        items-center
        bg-gray-200
        dark:bg-gray-700
      "
    >
      <div class="flex items-center">
        <ul class="w-full">
          <li class="flex space-x-10">
            <router-link
              v-for="(item, index) in menus"
              :key="index"
              :to="item.path"
              exact
              class="
                pt-2
                pb-1
                w-full
                text-center
                flex
                items-center
                focus:text-indigo-500
                hover:text-indigo-500
                dark:text-gray-100
              "
              :class="{
                'text-indigo-500 dark:text-indigo-500':
                  $route.fullPath.includes(item.to),
              }"
            >
              <component :is="item.icon" class="mr-1.5 w-4 h-4" />
              <span class="block text-xs" v-text="item.text"></span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="flex space-x-4">
        <button @click.prevent="logout" class="dark:text-indigo-100 text-sm">
          Logout
        </button>

        <button class="overflow-hidden p-1.5" @click="switchTheme()">
          <transition
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-200 ease-in"
            :enter-from-class="
              currentTheme === 'dark'
                ? 'transform -translate-y-full scale-50 opacity-0'
                : 'transform translate-y-full scale-50 opacity-0'
            "
            enter-to-class="transform translate-y-0"
            leave-from-class="transform translate-y-0"
            :leave-to-class="
              currentTheme === 'dark'
                ? 'transform translate-y-full scale-50 opacity-0'
                : 'transform -translate-y-full scale-50 opacity-0'
            "
            mode="out-in"
          >
            <MoonIcon
              class="w-7 h-7 text-gray-200"
              v-if="currentTheme === 'dark'"
            />

            <SunIcon class="w-7 h-7" v-else />
          </transition>
        </button>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="duration-500 ease-out"
        enter-from-class="transform translate-y-10 opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform translate-y-10 opacity-0"
      >
        <div>
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>