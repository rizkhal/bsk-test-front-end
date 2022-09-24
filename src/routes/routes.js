const routes = [
  {
    path: "/",
    redirect: "/auth/login",
  },
  {
    path: "/posts",
    component: () => import("~/layouts/guest.vue"),
    children: [
      {
        path: "",
        component: () => import("~/pages/posts/index.vue"),
        meta: { title: "Blog" },
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("~/layouts/guest.vue"),
    children: [
      {
        path: "login",
        component: () => import("~/pages/auth/login.vue"),
        meta: { title: "Login", guest: true },
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("~/layouts/auth.vue"),
    meta: { auth: true },
    children: [
      {
        path: "blogs",
        component: () => import("~/pages/blog/index.vue"),
        meta: { title: "Beranda", auth: true },
      },
      {
        path: "blogs/create",
        component: () => import("~/pages/blog/create.vue"),
        meta: { title: "Beranda", auth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("~/pages/error/not-found.vue"),
  },
];

export { routes };
