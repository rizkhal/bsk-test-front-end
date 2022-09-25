import { defineStore } from "pinia";
import axios from "~/api/axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async login(form) {
      this.loading = true;

      try {
        const { data } = await axios.post(`v1/auth/login`, form);

        const { access_token, user } = data;

        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      await axios.post(`v1/auth/logout`);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
