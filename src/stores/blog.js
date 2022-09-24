import axios from "~/api/axios";
import { defineStore } from "pinia";

export const useBlog = defineStore("blog", {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async save(form) {
      this.loading = true;

      try {
        const response = await axios.post(`/v1/suggestions`, form);

        return response;
      } catch (error) {
        console.log('error: ', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
