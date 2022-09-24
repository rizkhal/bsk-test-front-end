import { routes } from "./routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes: routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

const isLoggedIn = () => {
  return localStorage.getItem("token");
};

router.beforeEach((toRoute, fromRoute, next) => {
  let routerTitle =
    toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Beranda";

  window.document.title = import.meta.env.VITE_APP_NAME + " | " + routerTitle;

  if (toRoute.matched.some((record) => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/auth/login",
      });
    } else {
      next();
    }
  } else if (toRoute.matched.some((record) => record.meta.guest)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/admin/blogs",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
