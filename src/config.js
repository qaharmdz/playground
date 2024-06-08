const CONFIG = {
  name: "Allama",
  codeName: "allama",
  tagline: "Tagline: Khairukum man ta'allamal Quraana wa'allamahu (HR. Bukhari)",
  version: "1.0.0",
  database: {
    name: "dbAllama",
    schemaVersion: 1,
  },
  settings: {
    theme: "auto", // dark, light, auto
    language: "en",
    splashScreenDelay: 1000, // milliseconds
    limitPerPage: 10,
  },
  dataApi: {
    baseUrl: process.env.NODE_ENV === "development" ? "https://localhost:5173" : "https://example.com",
    meta: "/data/meta.json", // contain data version
    posts: "/data/posts/", // format cat_codename_posts.json
    categories: "/data/categories.json",
    tags: "/data/tags.json"
  },
};

export default CONFIG;
