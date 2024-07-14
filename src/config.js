export default {
  name: "Allama",
  codeName: "allama",
  tagline: "Khairukum man ta'allamal Quraana wa'allamahu (HR. Bukhari)",
  version: "1.0.0",
  settings: {
    theme: "auto", // dark, light, auto
    splashScreenDelay: 1000, // milliseconds
    limitPerPage: 10,
    fontSize: '14px',
  },
  dataApi: {
    baseUrl: process.env.NODE_ENV === "development" ? "https://localhost:5173" : "https://example.com",
    categories: "/data/categories.json",
    posts: "/data/posts/", // auto fetch based categories.json slug
    tags: "/data/tags.json",
  },
};
