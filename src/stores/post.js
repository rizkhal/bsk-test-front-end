import axios from "~/api/axios";
import { defineStore } from "pinia";

export const useBlog = defineStore("post", {
  state: () => ({
    page: 1,
    total: 0,
    loading: false,
    error: null,
    posts: [],
    post: null,
  }),
  actions: {
    async fetch(slug) {
      this.loading = true;

      try {
        if (!slug) {
          const { data } = await axios.get(`/v1/posts?page=${this.page}&per_page=12`);
          this.total = data.meta.total;
          this.posts.push(...data.data);
        } else {
          const { data } = await axios.get(`/v1/posts/${slug}`);
          this.post = data.data;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async save(form) {
      this.loading = true;

      try {
        const response = await axios.post(`/v1/posts`, form);

        return response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
