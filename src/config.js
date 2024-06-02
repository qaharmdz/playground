const CONFIG = {
  name: 'Allama',
  codeName: 'allama',
  version: '1.0.0',
  Database: {
    name: 'dbAllama',
    VERSION: 1,
  },
  settings: {
    theme: 'auto',
    language: 'en',
    splashScreenDelay: 1500, // milliseconds
  },
  dataApi: {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://example.com',
    meta: '/data/meta.json', // contain app name and database version
    posts: '/data/posts/', // format catid-x_posts.json
    categories: '/data/categories.json',
    tags: '/data/tags.json'
  },
};

export default CONFIG;
