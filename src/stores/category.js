import axios from "~/api/axios";
import { defineStore } from "pinia";

export const useCategory = defineStore("category", {
  state: () => ({
    loading: false,
    error: null,
    categories: [],
  }),
  actions: {
    async fetch() {
      this.loading = true;

      try {
        // sengaja per-page 100 soalnya belum nerapin select pakai axios
        const { data } = await axios.get(`/v1/categories?per_page=100`);
        this.categories.push(...data.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
