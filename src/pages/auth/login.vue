<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuth } from "~/stores/auth";

const router = useRouter();

const { login } = useAuth();
const { loading, error } = storeToRefs(useAuth());

const form = reactive({
  email: "test@mail.com",
  password: "secret123",
});

const submit = async () => {
  await login(form);
  router.push({
    path: "/admin/blogs",
  });
};
</script>
<template>
  <div class="flex justify-center items-center flex-col">
    <!-- <div class="p-16 rounded-full bg-red-500 mb-4"></div> -->
    <span class="text-gray-700 font-semibold text-md">
      LOGIN TO YOUR ACCOUNT
    </span>
  </div>

  <form class="mt-4" @submit.prevent="submit">
    <label class="block">
      <span class="text-gray-700 text-sm">Email</span>
      <input
        type="email"
        v-model="form.email"
        class="form-input mt-1 block w-full rounded-md focus:border-red-600"
      />
    </label>

    <label class="block mt-3">
      <span class="text-gray-700 text-sm">Password</span>
      <input
        type="password"
        v-model="form.password"
        class="form-input mt-1 block w-full rounded-md focus:border-red-600"
      />
    </label>

    <div class="flex justify-between items-center mt-4">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox text-red-600" />
          <span class="mx-2 text-gray-600 text-sm">Ingat saya?</span>
        </label>
      </div>
    </div>

    <div class="mt-6">
      <button
        type="submit"
        class="
          py-3
          px-4
          w-full
          rounded-md
          text-center
          bg-red-600
          text-white text-sm
          hover:bg-red-500
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        "
      >
        <span>Masuk</span>
      </button>
    </div>
  </form>
</template>