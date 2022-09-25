import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (user && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Authentication"] = `Id ${user.id}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    const { status } = error.response;

    if (status == 401) {
      // harusnya bikin request ke refresh token disini
      // cuman gak cukup waktunya, takutnya saya terlambat kumpul
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    if (status != 422) {
      return Promise.reject(error);
    }

    return error;
  }
);

export default instance;

export { instance, BASE_API_URL };
